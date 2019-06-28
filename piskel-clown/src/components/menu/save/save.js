import React from 'react';
import $ from 'jquery';
import './save.css';
import { options } from '../../../store/store';

let optionsBlock;
options.subscribe(() => {
  optionsBlock = options.getState().optionsBlock;
});
class SaveOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'New Piskel'
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onChangeHandler() {
    const newValue = $('#title-input').val();
    this.setState({ value: newValue });
  }

  render() {
    return (
      <div
        className={`save-settings-block ${optionsBlock === 'save-settings' ? 'flexed' : 'hidden'}`}
      >
        <div className="sprite-info-block">
          <span className="sprite-info bold">Sprite information</span>
          <span className="label-title">Title:</span>
          <input className="title-input" id="title-input" defaultValue={this.state.value} />
          <span className="label-description">Description:</span>
          <textarea rows="1" cols="6" className="description-input" id="description-input" />
        </div>
        <div className="save-online-block">
          <span className="save-online bold">Save online</span>
          <button
            id="save-online"
            className="save-online-button"
            type="button"
            onClick={() => this.onChangeHandler()}
          >
            Save to your gallery
          </button>
          <p className="save-online-info">Your piskel will be stored online in your gallery</p>
        </div>
      </div>
    );
  }
}

export default SaveOptions;
