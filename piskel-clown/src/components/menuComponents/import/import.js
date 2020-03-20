import React from 'react';
import PropTypes from 'prop-types';
import 'components/menuComponents/import/import.css';
import store from 'store/store';

export default function ImportOptions(props) {
  return (
    <div
      className={`general-settings-block ${
        props.active === 'import-settings' ? 'flexed' : 'hidden'
        }`}
    >
      <div className="current-bg">
        <span className="default-bg bold">Load from browser</span>
        <p>Load your animation saved in this browser</p>
        <button
          type="button"
          onClick={() => store.dispatch({ type: 'showLocalSaves', value: true })}
          className="browse-local-piskels-button"
        >
          Browse local saves
        </button>
      </div>
    </div>
  );
}

ImportOptions.propTypes = {
  active: PropTypes.string.isRequired
}
