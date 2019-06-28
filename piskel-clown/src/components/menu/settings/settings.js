import React from 'react';
import $ from 'jquery';
import './settings.css';
import { options } from '../../../store/store';

// let customWidth;
let optionsBlock;
options.subscribe(() => {
  // customWidth = store.getState().customWidth || 33;
  optionsBlock = options.getState().optionsBlock;
});

function setBG(background) {
  $('.frame').css({ background });
  $('.canvas').css({ background });
}
class Settings extends React.Component {
  constructor() {
    super();
    this.state = {
      active: ''
    };
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  addActiveOnClick(e) {
    const clicked = e.target.getAttribute('id');
    const bg = $(e.target).css('background-image');
    setBG(bg);
    this.setState({ active: clicked });
  }

  render() {
    return (
      <div
        className={`general-settings-block ${optionsBlock === 'settings' ? 'flexed' : 'hidden'}`}
      >
        <div className="current-bg">
          <span className="default-bg bold">Background</span>
          <div className="general-settings-buttons-area">
            <button
              type="button"
              id="bg1"
              onClick={e => this.addActiveOnClick(e)}
              className={`general-settings-button bg1 ${
                this.state.active === 'bg1' ? 'active-button' : 'not-active-button'
              }`}
            />
            <button
              type="button"
              id="bg2"
              onClick={e => this.addActiveOnClick(e)}
              className={`general-settings-button bg2 ${
                this.state.active === 'bg2' ? 'active-button' : 'not-active-button'
              }`}
            />
            <button
              type="button"
              id="bg3"
              onClick={e => this.addActiveOnClick(e)}
              className={`general-settings-button bg3 ${
                this.state.active === 'bg3' ? 'active-button' : 'not-active-button'
              }`}
            />
            <button
              type="button"
              id="bg4"
              onClick={e => this.addActiveOnClick(e)}
              className={`general-settings-button bg4 ${
                this.state.active === 'bg4' ? 'active-button' : 'not-active-button'
              }`}
            />
          </div>
          <p>Set default background</p>
        </div>
      </div>
    );
  }
}

export default Settings;
