import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { getDBdata, deleteFromDB } from 'components/functions/requestToDB';
import { fromDataToCanvas } from 'components/functions/menuFunctions/fromImageToCanvas';
import { pageNavigator } from 'components/functions/navigation';
import ProjectCard from 'components/projectCards/projectCard';
import 'containers/pages/user/user.css';
import store from 'store/store';
import { makeRandomId } from 'components/functions/random';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: '',
      projects: {}
    };
    this.mounted = false;
  }

  componentWillMount() {
    if (!this.props.allProjects !== {} && !this.props.allProjects[this.props.userData.info.id]) {
      getDBdata(this.props.userData.info.id);
    }
  }

  componentDidMount() {
    this.setState({
      height: window.innerHeight,
      projects: this.props.allProjects[this.props.userData.info.id]
    });
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onClickHandler(projectId, projectFrames, preview) {
    if (projectFrames) {
      if (projectId) {
        // edit piskel with projectID
        pageNavigator(null, 'user', 'create', this.props.userData.isAuthed, projectId);
      } else {
        // copy piskel
        pageNavigator(null, 'user', 'create', this.props.userData.isAuthed)
      }
      if (projectFrames.some(item => (item instanceof Object && !item.id) || !(item instanceof Object))) {
        const newProjectFrames = [];
        projectFrames.forEach((item, i) => {
          newProjectFrames.push({
            id: makeRandomId(),
            frameSRC: item,
          })
        });
        projectFrames = newProjectFrames;
      }
      store.dispatch({ type: 'project', value: preview });
      store.dispatch({ type: 'framesArray', value: projectFrames });
      setTimeout(() => {
        fromDataToCanvas(projectFrames);
      }, 200);
    } else if (preview) {
      // preview & details of piskel
      store.dispatch({ type: 'project', value: preview[1] });
      store.dispatch({ type: 'projectID', value: preview[0] });
      pageNavigator(
        null,
        'user',
        `projects/user${this.props.userData.info.id}/${preview[0]}`,
        this.props.userData.isAuthed
      );
    }
  }

  deletePiskel(item) {
    if (!this.props.userData.isAuthed) {
      this.setState({ isEmpty: true });
      pageNavigator(null, this.props.page, 'about', false);
      $('#signOuted').click();
      return;
    }
    const projects = Object.entries(this.props.allProjects[this.props.userData.info.id]);
    for (let i = 0; i < projects.length; i += 1) {
      if (projects[i][0] === item) {
        deleteFromDB(`users/${this.props.userData.info.id}/${projects[i][0]}`);
        store.dispatch({ type: 'allProjects', value: ['delete', this.props.userData.info.id, item] });
        this.setState({ projects: this.props.allProjects[this.props.userData.info.id] })
      }
    }
  }

  render() {
    return (
      <div className="user-page" style={{ height: this.state.height - 110 }}>
        <div
          className="user-image"
          style={{
            backgroundImage: `url(${this.props.userData.info.image})`,
            backgroundSize: 'contain'
          }}
        />
        <h2 className="user-name">{this.props.userData.info.name}</h2>
        <ul className="piskel-list">
          <li>all</li>
          <li>public</li>
          <li>private</li>
          <li>deleted</li>
        </ul>
        <div id="user-piskel-preview-area" className="user-piskel-preview-area">
          <div className="user-preview-piskel-block flexed">
            {
              !this.props.allProjects[this.props.userData.info.id]
                || ((this.props.allProjects instanceof Object)
                  ? Object.entries(this.props.allProjects[this.props.userData.info.id]).length === 0
                  : false)
                ? <span>No piskel available in &#39;all&#39; category.</span>
                : Object.entries(this.props.allProjects[this.props.userData.info.id])
                  .sort((a, b) => b[1].time - a[1].time)
                  .map(item => (
                    <ProjectCard
                      key={item[0]}
                      infoObj={item}
                      onClickHandler={(...args) => this.onClickHandler(...args)}
                      deletePiskelOnClick={(...args) => this.deletePiskel(...args)}
                      isAuthed={this.props.userData.isAuthed}
                    />
                  ))}
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = {
  userData: PropTypes.object.isRequired,
  page: PropTypes.string.isRequired,
  allProjects: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  userData: state.userData,
  page: state.page,
  allProjects: state.allProjects
});

export default connect(mapStateToProps)(User);