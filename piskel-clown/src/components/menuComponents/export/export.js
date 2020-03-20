import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import 'components/menuComponents/export/export.css';
import {
  saveAsGif,
  uploadToUrl,
  downloadPng,
  debugBase64,
  debugBase64WithText
} from 'components/functions/menuFunctions/fromCanvasToFile';
import { uploadToGoogle } from 'components/functions/menuFunctions/exportToGoogle';
import { pageNavigator } from 'components/functions/navigation';

export default class ExportOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'show-gif-block',
      dataUrl: '',
      links: false
    };
    this.mounted = false;
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

  render() {
    return (
      <div
        className={`export-settings-block ${
          this.props.active === 'export-settings' ? 'flexed' : 'hidden'
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
              onClick={
                () => saveAsGif(
                  null,
                  this.props.state.project.fps,
                  this.props.state.project.title,
                  this.props.state.framesArray
                )}
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
                const dataUrl = uploadToUrl(this.props.state.project.fps, this.props.state.framesArray);
                this.setState({ dataUrl, links: false });
                setTimeout(() => {
                  if (this.mounted) {
                    this.setState({ dataUrl: '' });
                  }
                }, 150000);
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
              className={`gif-button ${this.props.state.userData.isAuthed ? '' : 'hidden'}`}
              type="button"
              onClick={() => {
                if (!this.props.state.userData.isAuthed) {
                  pageNavigator(null, 'create', 'about', false);
                  $('#signOuted').click();
                  return;
                }
                uploadToGoogle(
                  this.props.state.project.title,
                  this.props.state.project.fps,
                  this.props.state.framesArray);
                this.setState({ dataUrl: '' });
                setTimeout(() => {
                  if (this.props.state.googleLinks.length > 0) {
                    this.setState({ links: true });
                  }
                }, 3000);
                setTimeout(() => {
                  if (this.mounted) {
                    this.setState({ links: false });
                  }
                }, 150000);
              }}
            >
              Get link
            </button>
            <span className={`upload-gif-google ${this.props.state.userData.isAuthed ? 'blocked' : 'hidden'}`}>
              Save your animation to Google disk to share
            </span>

            <button
              type="button"
              onClick={() => {
                $('.abcRioButton.abcRioButtonLightBlue').click();
              }}
              className={`save-online-button ${this.props.state.userData.isAuthed ? 'hidden' : ''}`}
            >
              Sign in to save to Google disk
            </button>

            <div className={`link-to-gif ${this.state.links ? '' : 'hidden'}`}>
              <span>Click the link</span>
              <a
                className="google-link"
                id="google-link"
                rel="noopener noreferrer"
                target="_blank"
                href={this.props.state.googleLinks[0]}
              >
                {'Link to file on Google disk'}
              </a>
              <a
                className="google-link"
                id="span-link"
                rel="noopener noreferrer"
                target="_blank"
                href={this.props.state.googleLinks[1]}
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
              onClick={() =>
                downloadPng(
                  this.props.state.currentCanvas,
                  this.props.state.project.fps,
                  this.props.state.project.title
                )}
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
                const dataUrl = uploadToUrl(this.props.state.project.fps, this.props.state.framesArray);
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

ExportOptions.propTypes = {
  active: PropTypes.string.isRequired,
  state: PropTypes.object.isRequired
}
