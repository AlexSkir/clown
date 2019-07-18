/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import $ from 'jquery';
import './save.css';
import { options, settings, preview, user } from '../../../store/store';
import { uploadToUrl } from '../export/fromCanvasToFile';
import { getDate, saveLocally, saveToGalery } from './saveLocally';

window.localProjects = {};
window.authLocalProjects = {};

let optionsBlock;
options.subscribe(() => {
  optionsBlock = options.getState().optionsBlock;
});
let name;
let userID;
user.subscribe(() => {
  name = user.getState().name;
  userID = user.getState().userID;
});
let projectID;
preview.subscribe(() => {
  projectID = preview.getState().piskelID;
});

class SaveOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'New Piskel',
      isLogin: false,
      isFull: false,
      isSaved: false
    };
    this.mounted = false;
  }

  componentDidMount() {
    this.mounted = true;
    settings.dispatch({ type: 'title', value: $('#title-input').val() });
    if (name) {
      this.setState({ isLogin: true });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  saveLocallyHandler() {
    const newValue = $('#title-input').val();
    this.setState({ value: newValue });
    settings.dispatch({ type: 'title', value: newValue });
    const arrayFramesSrc = [];
    for (let i = 0; i < $('.preview').children().length; i += 1) {
      arrayFramesSrc.push($('.preview').children()[i].src);
    }
    const dataUrl = uploadToUrl();
    const storageObj =
      localStorage.getItem('localProjects') !== 'undefined'
        ? JSON.parse(localStorage.getItem('localProjects'))
        : undefined;
    // restrict saving piskels locally more than 20
    if (storageObj) {
      if (Object.keys(storageObj).length < 20) {
        this.setState({ isSaved: true });
        setTimeout(() => {
          this.setState({ isSaved: false });
        }, 5000);
      } else if (
        Object.entries(storageObj).some(item => item[0] === localStorage.getItem('project'))
      ) {
        this.setState({ isSaved: true });
        setTimeout(() => {
          this.setState({ isSaved: false });
        }, 5000);
      } else {
        this.setState({ isFull: 'local' });
        setTimeout(() => {
          this.setState({ isFull: false });
        }, 5000);
        return;
      }
    }
    const date = getDate().split('  ');

    const objToSave = JSON.stringify(
      saveLocally(
        window.localProjects,
        storageObj,
        projectID,
        dataUrl,
        arrayFramesSrc,
        newValue,
        date[0],
        date[1]
      )
    );
    localStorage.setItem('localProjects', objToSave);
    preview.dispatch({ type: 'projects', value: objToSave });
    $('#addLocalPiskel').click();
  }

  saveToGaleryHandler() {
    if (!localStorage.getItem('auth')) {
      this.setState({ isLogin: false });
      $('#signOuted').click();
      return;
    }
    const newValue = $('#title-input').val();
    this.setState({ value: newValue });
    settings.dispatch({ type: 'title', value: newValue });
    const arrayFramesSrc = [];
    for (let i = 0; i < $('.preview').children().length; i += 1) {
      arrayFramesSrc.push($('.preview').children()[i].src);
    }
    const dataUrl = uploadToUrl();
    const storageObj =
      localStorage.getItem('authLocalProjects') !== 'undefined'
        ? JSON.parse(localStorage.getItem('authLocalProjects'))
        : undefined;
    const getUser = localStorage.getItem('userID');
    // restrict saving piskels to Database more than 30
    const checkStorage =
      localStorage.getItem(`${getUser}`) !== 'undefined'
        ? JSON.parse(localStorage.getItem(`${getUser}`))
        : undefined;
    if (checkStorage) {
      if (Object.keys(checkStorage).length < 30) {
        this.setState({ isSaved: true });
        setTimeout(() => {
          this.setState({ isSaved: false });
        }, 5000);
      } else if (
        Object.entries(checkStorage).some(item => item[0] === localStorage.getItem('project'))
      ) {
        this.setState({ isSaved: true });
        setTimeout(() => {
          this.setState({ isSaved: false });
        }, 5000);
      } else {
        this.setState({ isFull: 'personal' });
        setTimeout(() => {
          this.setState({ isFull: false });
        }, 5000);
        return;
      }
    }
    const date = getDate().split('  ');

    const objToSave = JSON.stringify(
      saveToGalery(
        window.authLocalProjects,
        storageObj,
        projectID,
        dataUrl,
        arrayFramesSrc,
        newValue,
        date[0],
        date[1],
        userID
      )
    );
    localStorage.setItem('authLocalProjects', objToSave);
  }

  updateState() {
    if (name) {
      this.setState({ isLogin: true });
    }
  }

  render() {
    return (
      <div
        className={`save-settings-block ${
          this.mounted && optionsBlock === 'save-settings' ? 'flexed' : 'hidden'
        }`}
      >
        <div className="sprite-info-block">
          <span className="sprite-info bold">Sprite information</span>
          <span className="label-title">Title:</span>
          <input
            className="title-input"
            id="title-input"
            defaultValue={this.mounted ? this.state.value : 'New Piskel'}
          />
          <span className="label-description">Description:</span>
          <textarea rows="1" cols="6" className="description-input" id="description-input" />
        </div>
        <div className="save-online-block">
          <span className="save-online bold">Save online</span>
          <button
            id="save-locally"
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
            id="save-online"
            className={`save-online-button ${this.mounted && this.state.isLogin ? '' : 'hidden'}`}
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
            className={`save-online-button ${this.mounted && this.state.isLogin ? 'hidden' : ''}`}
          >
            Sign in to save to your gallery
          </button>
          <p className="save-online-info">Your piskel will be stored online in your gallery</p>
          <button
            type="button"
            className="hidden"
            id="updateSaveButtonLoggedIn"
            onClick={() => this.updateState()}
          />
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

export default SaveOptions;
