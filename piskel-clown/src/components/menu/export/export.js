import React from 'react';
import $ from 'jquery';
import './export.css';
import { options, user } from '../../../store/store';
import {
  saveAsGif,
  uploadToUrl,
  downloadPng,
  debugBase64,
  debugBase64WithText,
  uploadToGoogle
} from './fromCanvasToFile';

let optionsBlock;
options.subscribe(() => {
  optionsBlock = options.getState().optionsBlock;
});

let url;
let gifUrl;
let name;
user.subscribe(() => {
  url = user.getState().googleUrl;
  gifUrl = user.getState().urlToGif;
  name = user.getState().name;
  // console.log(url);
});
class ExportOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'show-gif-block',
      dataUrl: '',
      googleUrl: '',
      isLogin: false
    };
  }

  componentWillMount() {
    this.mounted = true;
    if (name) {
      this.setState({ isLogin: true });
    }
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  showExportOptions(e) {
    const clicked = e.target.getAttribute('id');
    this.setState({ active: clicked });
  }

  updateState() {
    if (name) {
      this.setState({ isLogin: true });
    }
  }

  render() {
    return (
      <div
        className={`export-settings-block ${
          optionsBlock === 'export-settings' ? 'flexed' : 'hidden'
        }`}
      >
        <span className="export-info bold">Export</span>
        <div className="file-format-buttons">
          <button
            id="show-gif-block"
            className={`show-gif-block ${
              this.state.active === 'show-gif-block'
                ? 'active-show-button'
                : 'not-active-show-button'
            }`}
            type="button"
            onClick={e => this.showExportOptions(e)}
          >
            GIF
          </button>
          <button
            id="show-png-block"
            className={`show-png-block ${
              this.state.active === 'show-png-block'
                ? 'active-show-button'
                : 'not-active-show-button'
            }`}
            type="button"
            onClick={e => this.showExportOptions(e)}
          >
            PNG
          </button>
        </div>
        <div
          className={`gif-block ${this.state.active === 'show-gif-block' ? 'flexed' : 'hidden'}`}
        >
          <span className="gif-title">Convert your sprite to an animated GIF</span>
          <div className="download-block">
            <button
              id="download-gif"
              className="gif-button"
              type="button"
              onClick={() => saveAsGif()}
            >
              Download
            </button>
            <span className="download-gif-title">Download as an animated GIF</span>
          </div>
          <div className="download-block">
            <button
              id="upload-gif"
              className="gif-button"
              type="button"
              onClick={() => {
                const dataUrl = uploadToUrl();
                this.setState({ dataUrl });
              }}
            >
              Open in new tab
            </button>
            <span className="upload-gif-title">Watch an animated GIF in new tab</span>
            <div className={`link-to-gif ${this.state.dataUrl ? '' : 'hidden'}`}>
              <button
                type="button"
                onClick={() => {
                  debugBase64(this.state.dataUrl);
                  this.setState({ dataUrl: '' });
                }}
              >
                your animation file
              </button>
            </div>
          </div>
          <div className="download-block">
            <button
              id="upload-google"
              className={`gif-button ${this.state.isLogin ? '' : 'hidden'}`}
              type="button"
              onClick={() => {
                uploadToGoogle();
                setTimeout(() => {
                  this.setState({ googleUrl: true });
                }, 700);
                setTimeout(() => {
                  this.setState({ googleUrl: '' });
                }, 150000);
              }}
            >
              Get link
            </button>
            <span className={`upload-gif-google ${this.state.isLogin ? 'blocked' : 'hidden'}`}>
              Save your animation to Google disk to share
            </span>

            <button
              type="button"
              onClick={() => {
                $('.abcRioButton.abcRioButtonLightBlue').click();
              }}
              className={`save-online-button ${this.state.isLogin ? 'hidden' : ''}`}
            >
              Sign in to save to Google disk
            </button>
            <button
              type="button"
              className="hidden"
              id="updateGoogleButtonLoggedIn"
              onClick={() => this.updateState()}
            />

            <div className={`link-to-gif ${this.state.googleUrl ? '' : 'hidden'}`}>
              <span>Click the link</span>
              <a
                className="google-link"
                id="google-link"
                rel="noopener noreferrer"
                target="_blank"
                href={url}
              >
                {'Link to file on Google disk'}
              </a>
              <a
                className="google-link"
                id="span-link"
                rel="noopener noreferrer"
                target="_blank"
                href={gifUrl}
              >
                {'Direct link to your GIF'}
              </a>
            </div>
          </div>
        </div>

        <div
          className={`png-block ${this.state.active === 'show-png-block' ? 'flexed' : 'hidden'}`}
        >
          <span className="png-title">Export your animation as a PNG file</span>
          <div className="download-block">
            <button
              id="download-png"
              className="png-button"
              type="button"
              onClick={() => downloadPng()}
            >
              Download
            </button>
            <span className="download-png-title">Download selected frame as PNG file</span>
          </div>
          <div className="download-block">
            <button
              id="open-png"
              className="png-button"
              type="button"
              onClick={() => {
                const array = [];
                for (let i = 0; i < $('.preview').children().length; i += 1) {
                  array.push($('.preview').children()[i].src);
                }
                const dataUrl = uploadToUrl();
                debugBase64WithText(array, dataUrl);
              }}
            >
              Open
            </button>
            <span className="open-png-title">Open the spritesheet as a data uri</span>
          </div>
        </div>
        <div id="hidden" className="hidden" />
      </div>
    );
  }
}

export default ExportOptions;
