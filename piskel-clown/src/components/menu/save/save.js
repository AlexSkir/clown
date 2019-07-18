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

let storedTitle;
let storedDescription;
settings.subscribe(() => {
  storedTitle = settings.getState().title;
  storedDescription = settings.getState().description;
});

class SaveOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      isFull: false,
      isSaved: false,
      title: '',
      description: ''
    };
    this.mounted = false;
  }

  componentWillMount() {
    if (storedTitle) {
      this.setState({ title: storedTitle });
    } else {
      this.setState({ title: 'New Piskel' });
    }
    if (storedDescription) {
      this.setState({ description: storedDescription });
    }
  }

  componentDidMount() {
    this.mounted = true;
    if (name) {
      this.setState({ isLogin: true });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    this.state = {
      isFull: false,
      isSaved: false,
      title: 'New Piskel',
      description: ''
    };
  }

  saveLocallyHandler() {
    const newValue = $('#title-input').val();
    this.setState({ title: newValue });
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
          if (this.mounted) {
            this.setState({ isSaved: false });
          }
        }, 5000);
      } else if (
        Object.entries(storageObj).some(item => item[0] === localStorage.getItem('project'))
      ) {
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
    const date = getDate().split('  ');
    const description = $('#description-input').val();
    const fps = $('#fps-bar').val();

    const objToSave = JSON.stringify(
      saveLocally(
        window.localProjects,
        storageObj,
        projectID,
        dataUrl,
        arrayFramesSrc,
        newValue,
        date[0],
        date[1],
        description,
        fps
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
    this.setState({ title: newValue });
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
          if (this.mounted) {
            this.setState({ isSaved: false });
          }
        }, 5000);
      } else if (
        Object.entries(checkStorage).some(item => item[0] === localStorage.getItem('project'))
      ) {
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
    const date = getDate().split('  ');
    const description = $('#description-input').val();
    const fps = $('#fps-bar').val();

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
        userID,
        description,
        fps
      )
    );
    localStorage.setItem('authLocalProjects', objToSave);
  }

  updateState() {
    if (name) {
      this.setState({ isLogin: true });
    }
    if (storedTitle) {
      this.setState({ title: storedTitle });
    } else {
      this.setState({ title: 'New Piskel' });
    }
    if (storedDescription) {
      this.setState({ description: storedDescription });
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
            value={this.state.title}
            onChange={() => this.setState({ title: $('#title-input').val() })}
          />
          <span className="label-description">Description:</span>
          <textarea
            rows="1"
            cols="6"
            className="description-input"
            id="description-input"
            value={this.state.description}
            onChange={() => this.setState({ description: $('#description-input').val() })}
          />
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
