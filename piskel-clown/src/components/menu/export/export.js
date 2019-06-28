import React from 'react';
import './export.css';
import { options } from '../../../store/store';

let optionsBlock;
options.subscribe(() => {
  optionsBlock = options.getState().optionsBlock;
});
class ExportOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      active: 'show-gif-block'
    };
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
          optionsBlock === 'export-settings' ? 'flexed' : 'hidden'
        }`}
      >
        <span className="export-info bold">Sprite information</span>
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
              onClick={() => undefined}
            >
              Download
            </button>
            <span className="download-gif-title">Download as an animated GIF</span>
          </div>
          <div className="download-block">
            <button id="upload-gif" className="gif-button" type="button" onClick={() => undefined}>
              Upload
            </button>
            <span className="upload-gif-title">Upload as an animated GIF to a public URL</span>
          </div>
        </div>
        <div
          className={`png-block ${this.state.active === 'show-png-block' ? 'flexed' : 'hidden'}`}
        >
          <span className="png-title">Export your animation as a PNG</span>
          <div className="download-block">
            <button
              id="download-png"
              className="png-button"
              type="button"
              onClick={() => undefined}
            >
              Download
            </button>
            <span className="download-png-title">Spritesheet file export</span>
          </div>
          <div className="download-block">
            <button id="open-png" className="png-button" type="button" onClick={() => undefined}>
              Open
            </button>
            <span className="open-png-title">Open the spritesheet as a data uri</span>
          </div>
          <div className="download-block">
            <button
              id="selected-frame-png"
              className="png-button"
              type="button"
              onClick={() => undefined}
            >
              Select
            </button>
            <span className="open-png-title">Export selected frame as a PNG file</span>
          </div>
        </div>
      </div>
    );
  }
}

export default ExportOptions;
