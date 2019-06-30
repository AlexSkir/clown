import React from 'react';
import $ from 'jquery';
import './save.css';
import { options, settings, preview, user } from '../../../store/store';
import { uploadToUrl } from '../export/fromCanvasToFile';

let optionsBlock;
options.subscribe(() => {
  optionsBlock = options.getState().optionsBlock;
});
let name;
user.subscribe(() => {
  name = user.getState().name;
});
class SaveOptions extends React.Component {
  constructor() {
    super();
    this.state = {
      value: 'New Piskel',
      isLogin: false
    };
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

  onChangeHandler() {
    const newValue = $('#title-input').val();
    this.setState({ value: newValue });
    settings.dispatch({ type: 'title', value: newValue });
    const array = [];
    for (let i = 0; i < $('.preview').children().length; i += 1) {
      array.push($('.preview').children()[i].src);
    }
    const dataUrl = uploadToUrl();
    preview.dispatch({ type: 'gif', value: dataUrl });
    preview.dispatch({ type: 'frames', value: array });
    const j = [];
    let x;
    for (let i = 0; i < 20; i += 1) {
      x = [[48, 57], [65, 90], [97, 122], [1040, 1103]][(Math.random() * 4) >> 0];
      j[i] = String.fromCharCode(((Math.random() * (x[1] - x[0] + 1)) >> 0) + x[0]);
    }
    const piskelID = j.join('');
    preview.dispatch({ type: 'piskelID', value: piskelID });
    $('#userAddPiskel').click();
  }

  updateState() {
    if (name) {
      this.setState({ isLogin: true });
    }
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
            className={`save-online-button ${this.state.isLogin ? '' : 'hidden'}`}
            type="button"
            onClick={() => this.onChangeHandler()}
          >
            Save to your gallery
          </button>
          <button
            type="button"
            onClick={() => {
              $('.abcRioButton.abcRioButtonLightBlue').click();
            }}
            className={`save-online-button ${this.state.isLogin ? 'hidden' : ''}`}
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
        </div>
      </div>
    );
  }
}

export default SaveOptions;
