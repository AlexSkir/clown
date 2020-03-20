import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'components/menuComponents/save/save.css';
import store from 'store/store';
import { saveLocally, saveToGalery } from 'components/functions/menuFunctions/saveProject';

export default class SaveOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      isFull: false,
      isSaved: false,
      newTitle: false,
      newDescription: false
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
    this.setState(null);
  }

  saveLocallyHandler() {
    const storage = this.props.state.localProjects;
    const localSaves = saveLocally(
      storage,
      this.props.state.projectID,
      this.state.newTitle || this.props.state.project.title,
      this.state.newDescription || this.props.state.project.description,
      this.props.state.project.fps,
      this.props.state.framesArray
    );
    store.dispatch({ type: 'localProjects', value: localSaves[1] });
    if (localSaves[0]) {
      this.setState({ isSaved: true });
      setTimeout(() => {
        if (this.mounted) {
          this.setState({ isSaved: false });
        }
      }, 5000);
    } else {
      this.setState({ isFull: 'local' });
      setTimeout(() => {
        if (this.mounted) {
          this.setState({ isFull: false });
        }
      }, 5000);
      return;
    }
  }

  saveToGaleryHandler() {
    if (!this.props.state.userData.isAuthed) {
      $('#signOuted').click();
      return;
    }
    const storage = this.props.state.allProjects[this.props.state.userData.info.id];
    const allProjects = this.props.state.allProjects;
    const updatedAllProjects = saveToGalery(
      storage,
      this.props.state.projectID,
      this.state.newTitle || this.props.state.project.title,
      this.state.newDescription || this.props.state.project.description,
      this.props.state.project.fps,
      this.props.state.framesArray,
      this.props.state.userData.info.id,
      allProjects
    )
    store.dispatch({ type: 'allProjects', value: updatedAllProjects[1] });
    if (updatedAllProjects[0]) {
      this.setState({ isSaved: true });
      setTimeout(() => {
        if (this.mounted) {
          this.setState({ isSaved: false });
        }
      }, 5000);
    } else {
      this.setState({ isFull: 'personal' });
      setTimeout(() => {
        if (this.mounted) {
          this.setState({ isFull: false });
        }
      }, 5000);
      return;
    }
  }

  render() {
    return (
      <div
        className={`save-settings-block ${
          this.props.active === 'save-settings' ? 'flexed' : 'hidden'
          }`}
      >
        <div className="sprite-info-block">
          <span className="sprite-info bold">Sprite information</span>
          <span className="label-title">Title:</span>
          <input
            className="title-input"
            id="title-input"
            defaultValue={this.props.state.project.title}
            onChange={e => this.setState({ newTitle: $(e.target).val() })}
          />
          <span className="label-description">Description:</span>
          <textarea
            rows="1"
            cols="6"
            className="description-input"
            id="description-input"
            defaultValue={this.props.state.project.description}
            onChange={e => this.setState({ newDescription: $(e.target).val() })}
          />
        </div>
        <div className="save-online-block">
          <span className="save-online bold">Save online</span>
          <button
            id="save-locally-button"
            className="save-online-button"
            type="button"
            onClick={() => this.saveLocallyHandler()}
          >
            Save locally
          </button>
          <p className="save-online-info">
            Your piskel will be saved and available only from this browser
          </p>
          <button
            id="save-gallery-button"
            className={`save-online-button ${this.mounted && this.props.state.userData.isAuthed ? '' : 'hidden'}`}
            type="button"
            onClick={() => this.saveToGaleryHandler()}
          >
            Save to your gallery
          </button>
          <button
            type="button"
            onClick={() => {
              $('.abcRioButton.abcRioButtonLightBlue').click();
            }}
            className={`save-online-button ${this.mounted && this.props.state.userData.isAuthed ? 'hidden' : ''}`}
          >
            Sign in to save to your gallery
          </button>
          <p className="save-online-info">Your piskel will be stored online in your gallery</p>
          <p
            id="error"
            className={`${this.mounted && this.state.isFull ? 'storage-warning error' : 'hidden'}`}
          >
            {`Your ${this.state.isFull} storage is full, please delete old piskels`}
          </p>
          <p
            id="success"
            className={`${
              this.mounted && this.state.isSaved ? 'storage-warning success' : 'hidden'
              }`}
          >
            Your animation successfully saved!
          </p>
        </div>
      </div>
    );
  }
}

SaveOptions.propTypes = {
  active: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
};
