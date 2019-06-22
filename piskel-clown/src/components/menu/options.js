import React from 'react';
import $ from 'jquery';
import './menu.css';
import store from '../../store/store';

let customWidth;
let fps;
store.subscribe(() => {
  customWidth = store.getState().customWidth || 33;
  fps = store.getState().fps || 3;
});

class Options extends React.Component {
  constructor() {
    super();
    this.state = {
      fps: '',
      customWidth: ''
    };
  }

  componentDidMount() {
    // calculating canvas resize options
    $('#current-width').text(customWidth);
    $('#current-height').text(customWidth);
    $('#new-width').text($('#canvas1').width());
    $('#resize-input').attr('max', `{${$('#canvas1').width()}}`);
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fpsOnChangeHandler() {
    store.dispatch({ type: 'fps', value: $('#fps-bar').val() });
    if (this.mounted) {
      this.setState({ fps });
    }
  }

  resizeCanvasOnClickHandler() {
    if ($('#resize-input').val()) {
      const inputVal = +$('#resize-input').val();
      const maxSize = +$('#resize-input').attr('max');
      if (inputVal > 0 && inputVal < maxSize) {
        store.dispatch({ type: 'customWidth', value: $('#resize-input').val() });
        if (this.mounted) {
          this.setState({ customWidth });
        }
        $('#resize-input').val('');
        $('#error-message').text('');
      } else {
        $('#error-message').text(
          `Size can be from ${$('#resize-input').attr('min')} to ${$('#resize-input').attr(
            'max'
          )} px`
        );
        $('#resize-input').val('');
      }
    }
  }

  render() {
    return (
      <div className="optionsBox">
        <div className="fps-options">
          <span id="display-fps" className="display-fps">
            {`${this.state.fps ? this.state.fps : fps} FPS`}
          </span>
          <input
            type="range"
            min="1"
            max="24"
            step="1"
            defaultValue={fps}
            id="fps-bar"
            onChange={() => this.fpsOnChangeHandler()}
          />
        </div>
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
            <span id="new-width" className="canvas-width" />
            <span>px</span>
            <input type="number" className="resize-input" id="resize-input" min="1" />
          </p>
          <p id="error-message" className="error-message" />
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

export default Options;
