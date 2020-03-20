import React from 'react';
import $ from 'jquery';
import 'components/menuComponents/settings/settings.css';
import PropTypes from 'prop-types';
import store from 'store/store';

export default class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'bg1'
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
    this.setState({ active: clicked });
    store.dispatch({ type: 'settings', value: ['currentBG', bg] });
  }

  render() {
    return (
      <div
        className={`general-settings-block ${this.props.active === 'settings' ? 'flexed' : 'hidden'}`}
      >
        <div className="current-bg">
          <span className="default-bg bold">Background</span>
          <div className="general-settings-buttons-area">
            {['bg1', 'bg2', 'bg3', 'bg4'].map(item => (
              <button
                key={item}
                type="button"
                id={item}
                onClick={e => this.addActiveOnClick(e)}
                className={`general-settings-button ${item} ${
                  this.state.active === item ? 'active-button' : 'not-active-button'
                  }`}
              />
            ))}
          </div>
          <p>Set default background</p>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  active: PropTypes.string.isRequired
}
