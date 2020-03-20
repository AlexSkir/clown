import React from 'react';
import $ from 'jquery';
import 'components/menuComponents/resize/resize.css';
import store from 'store/store';
import PropTypes from 'prop-types';

export default class ResizeCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customWidth: 33,
      maxWidth: '',
      newWidth: '',
      error: false
    };
  }

  componentDidMount() {
    this.setState({ maxWidth: $('#drawCanvas').width() });
  }

  resizeCanvasOnClickHandler() {
    const newWidth = this.state.newWidth;
    if (newWidth > 0 && newWidth < this.state.maxWidth) {
      this.setState({ customWidth: newWidth });
      store.dispatch({ type: 'settings', value: ['customWidth', newWidth] });
    } else {
      this.setState({ error: true });
    }
    $('#resize-input').val('');
  }

  render() {
    return (
      <div
        className={`resize-canvas-block ${
          this.props.active === 'resize-settings' ? 'flexed' : 'hidden'
          }`}
      >
        <div className="current-size">
          <span className="default-size bold">current size</span>
          <p>
            {`Width `}
            <span className="default-width bold" id="current-width">
              {this.state.customWidth}
            </span>
            px
          </p>
          <p>
            Height
            <span className="default-width bold" id="current-height">
              {this.state.customWidth}
            </span>
            px
          </p>
        </div>
        <div className="resize-canvas">
          <span className="resize bold">resize</span>
          <p className="new-width-block">
            <span>1 - </span>
            <span id="new-width" className="canvas-width">
              {this.state.maxWidth}
            </span>
            <span>px</span>
            <input
              type="number"
              className="resize-input"
              id="resize-input"
              min="1"
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.resizeCanvasOnClickHandler(e);
                }
              }}
              onChange={e => this.setState({ newWidth: e.target.value })}
            />
          </p>
          <p id="error-message" className={`error-message ${this.state.error ? '' : 'hidden'}`}>
            {`Size can be from 1 to ${this.state.maxWidth} px`}
          </p>
          <button
            id="resize-button"
            className="resize-button"
            type="button"
            onClick={() => this.resizeCanvasOnClickHandler()}
          >
            Change canvas size
          </button>
        </div>
      </div>
    );
  }
}

ResizeCanvas.propTypes = {
  active: PropTypes.string.isRequired,
  currentCanvas: PropTypes.string.isRequired
}
