import React from 'react';
import $ from 'jquery';
import './user.css';
import { user } from '../../store/store';
import firebase from '../../firebase';

let name;
let img;
user.subscribe(() => {
  name = user.getState().name;
  img = user.getState().imageURL;
});

class User extends React.Component {
  constructor() {
    super();
    this.state = {
      active: '',
      height: '',
      isEmpty: true,
      projects: []
    };
    this.changedProjects = '';
    this.localObj = {};
    this.mounted = false;
    this.user = '';
  }

  componentWillMount() {
    this.user = localStorage.getItem('userID');
    if (!localStorage.getItem('auth')) {
      this.setState({ isEmpty: true });
    }
  }

  componentDidMount() {
    this.setState({ height: window.innerHeight });
    this.mounted = true;
    if (localStorage.getItem(`${this.user}`)) {
      const obj = JSON.parse(localStorage.getItem(`${this.user}`));
      const sorted = Object.entries(obj).sort((a, b) => b[1].time - a[1].time);
      this.setState({ isEmpty: false, projects: sorted });
    } else {
      firebase
        .database()
        .ref(`/users/${this.user}`)
        .once('value')
        .then(snapshot => {
          this.localObj = snapshot.val();
          if (this.localObj) {
            const projects = JSON.stringify(this.localObj);
            localStorage.setItem(`${this.user}`, projects);
            const sorted = Object.entries(this.localObj).sort((a, b) => b[1].time - a[1].time);
            this.setState({ isEmpty: false, projects: sorted });
          }
        });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  deletePiskel(item) {
    if (!localStorage.getItem('auth')) {
      this.setState({ isEmpty: true });
      $('#signOuted').click();
      return;
    }
    for (let i = 0; i < this.state.projects.length; i += 1) {
      if (this.state.projects[i][0] === item) {
        firebase
          .database()
          .ref(`users/${this.user}/${this.state.projects[i][0]}`)
          .set(null);
        this.state.projects.splice(i, 1);
      }
    }

    this.changedProjects = this.state.projects;
    window[`${this.user}`] = {};
    for (let k = 0; k < this.changedProjects.length; k += 1) {
      window[`${this.user}`][this.changedProjects[k][0]] = this.changedProjects[k][1];
    }
    this.setState({ projects: this.changedProjects });
    const projectsJson = JSON.stringify(window[`${this.user}`]);
    localStorage.setItem(`${this.user}`, projectsJson);
  }

  hoverIn(e) {
    if (this.mounted) {
      this.setState({ active: e.currentTarget.id });
    }
  }

  hoverOut() {
    if (this.mounted) {
      this.setState({ active: false });
    }
  }

  render() {
    return (
      <div className="user-page" style={{ height: this.state.height - 110 }}>
        <div
          className="user-image"
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'contain'
          }}
        />
        <h2 className="user-name">{name}</h2>
        <ul className="piskel-list">
          <li>all</li>
          <li>public</li>
          <li>private</li>
          <li>deleted</li>
        </ul>
        <div id="user-piskel-preview-area" className="user-piskel-preview-area">
          <span className={`${this.state.isEmpty ? '' : 'hidden'}`}>
            No piskel available in &#39;all&#39; category.
          </span>

          <div className={`user-preview-piskel-block ${this.state.isEmpty ? 'hidden' : 'flexed'}`}>
            {this.state.projects.map((item, i) => (
              <div
                key={item}
                className="preview-wrapper"
                id={item[0]}
                onMouseEnter={e => this.hoverIn(e)}
                onMouseLeave={() => this.hoverOut()}
              >
                <img key={item[1].gif} className="preview-gif" src={item[1].gif} alt="preview" />
                <span key={item[1].title} className="preview-gif-title">
                  {item[1].title}
                </span>
                <span key={item[1].time} className="preview-gif-date">
                  {item[1].date}
                </span>
                <button
                  type="button"
                  className={`piskel-preview-button ${
                    this.state.active === item[0] ? '' : 'hidden'
                  }`}
                  onClick={() => this.deletePiskel(item[0])}
                >
                  <i className="fas fa-trash-alt" />
                </button>
                <div key={item[1].frames} className="hidden">
                  {item[1].frames.map(frame => (
                    <img key={frame} src={frame} alt="img" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden">
          <button id="userAddPiskel" type="button" onClick={undefined} />
        </div>
      </div>
    );
  }
}

export default User;
