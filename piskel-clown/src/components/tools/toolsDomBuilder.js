import React from 'react';
import $ from 'jquery';
import './tools.css';
import { colorPickerOnClick, customedColorOnChange, changeBG } from './color-picker';
import paintBucketOnClick from './paintBucket';
import penOnClick from './pen';
import eraserOnClick from './eraser';
import store from '../../store/store';

let toolState;
let currentColorState;
let prevColorState;
store.subscribe(() => {
  toolState = store.getState().currentTool;
  currentColorState = store.getState().currentColor;
  prevColorState = store.getState().prevColor;
});

class Tools extends React.Component {
  constructor() {
    super();
    this.state = {
      tool: '',
      active: ''
    };
  }

  componentWillMount() {
    $(document).click(e => this.colorPickerHandleClick(e));
  }

  componentDidMount() {
    const currentColor = $('#currentColor').css('background-color');
    const prevColor = $('#prevColor').css('background-color');
    store.dispatch({ type: 'currentColor', value: currentColor });
    store.dispatch({ type: 'prevColor', value: prevColor });
  }

  componentWillUnmount() {
    $(document).off(this.colorPickerHandleClick);
  }

  colorPickerHandleClick(e) {
    if (this.state.tool === 'colorPickerTool') {
      if ($(e.target).is('.radiobutton')) {
        if ($(e.target).css('background-color') !== currentColorState) {
          store.dispatch({ type: 'prevColor', value: currentColorState });
          store.dispatch({ type: 'currentColor', value: $(e.target).css('background-color') });
          changeBG(currentColorState, prevColorState);
        }
      }
    }
  }

  buttonOnHoverIn(e) {
    const id = $(e.target).attr('id');
    this.setState({ active: id });
  }

  buttonOnHoverOut(e) {
    $(e.target)
      .children()
      .removeClass('fas-hovered');
    this.setState({ active: 'false' });
  }

  render() {
    return (
      <div name="Tools">
        <div className="palette" id="palette-tool-area">
          <div className="palette-block">
            <button
              id="paint-bucket"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                paintBucketOnClick();
                this.setState({ tool: toolState });
              }}
            >
              <i
                className={`fas fa-fill-drip ${
                  this.state.active === 'paint-bucket' ? 'fas-hovered' : ''
                }`}
              />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="color-picker"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                colorPickerOnClick();
                this.setState({ tool: toolState });
              }}
            >
              <i
                className={`fas fa-eye-dropper ${
                  this.state.active === 'color-picker' ? 'fas-hovered' : ''
                }`}
              />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="pen"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                penOnClick();
                this.setState({ tool: toolState });
              }}
            >
              <i
                className={`fas fa-pencil-alt ${this.state.active === 'pen' ? 'fas-hovered' : ''}`}
              />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="eraser"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                eraserOnClick();
                this.setState({ tool: toolState });
              }}
            >
              <i
                className={`fas fa-eraser ${this.state.active === 'eraser' ? 'fas-hovered' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className={`color ${this.state.tool === 'colorPickerTool' ? '' : 'hidden'}`}>
          <div className="color-block">
            <div className="radiobutton white" id="currentColor" />
            <span className="color-name">Current color</span>
          </div>
          <div className="color-block">
            <div className="radiobutton green" id="prevColor" />
            <span className="color-name">Prev color</span>
          </div>
          <div className="color-block">
            <div className="radiobutton red" />
            <span className="color-name">Red</span>
          </div>
          <div className="color-block">
            <div className="radiobutton blue" />
            <span className="color-name">Blue</span>
          </div>
          <div className="color-block">
            <input
              type="color"
              name="colors"
              id="customed"
              value="#161030"
              onChange={() => {
                customedColorOnChange();
              }}
            />
            <span className="color-name">Custom color</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;
