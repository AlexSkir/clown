import React from 'react';
import $ from 'jquery';
import './import.css';
import { options } from '../../../store/store';

// let customWidth;
let optionsBlock;
options.subscribe(() => {
  optionsBlock = options.getState().optionsBlock;
});

class ImportOptions extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div
        className={`general-settings-block ${
          optionsBlock === 'import-settings' ? 'flexed' : 'hidden'
        }`}
      >
        <div className="current-bg">
          <span className="default-bg bold">Load from browser</span>
          <p>Load your animation saved in this browser</p>
          <button
            type="button"
            onClick={() => $('#showSavesButton').click()}
            className="browse-local-piskels-button"
          >
            Browse local saves
          </button>
        </div>
      </div>
    );
  }
}

export default ImportOptions;
