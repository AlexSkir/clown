import React from 'react';
import $ from 'jquery';
import './tools.css';
import { colorPickerOnClick, customedColorOnChange, changeBG } from './color-picker';
import paintBucketOnClick from './paintBucket';
import penOnClick from './pen';
import eraserOnClick from './eraser';
import store from '../../store/store';

let toolState, currentColorState, prevColorState;
store.subscribe(() => {
  toolState = store.getState().currentTool;
  currentColorState = store.getState().currentColor;
  prevColorState = store.getState().prevColor;
})

class Tools extends React.Component {
  constructor() {
    super();
    this.state = {
      tool: ''
    }
  }
  paintBucketHandler = paintBucketOnClick;
  colorPickerHandler = colorPickerOnClick;
  penHandler = penOnClick;
  eraserHandler = eraserOnClick;
  customedColorHandler = customedColorOnChange;

  buttonOnHoverIn = e => {
    $(e.target)
      .children()
      .addClass('fas-hovered');
  }

  buttonOnHoverOut = e => {
    $(e.target)
      .children()
      .removeClass('fas-hovered');
  }

  handleClick = e => {
    if (toolState === 'colorPickerTool') {
      if ($(e.target).is('.radiobutton')) {
        if ($(e.target).css('background-color') !== currentColorState) {
          store.dispatch({ type: 'prevColor', value: currentColorState });
          store.dispatch({ type: 'currentColor', value: $(e.target).css('background-color') });
          changeBG(currentColorState, prevColorState);
        }
      }
    }
  }

  componentWillMount = () => {
    $(document).click(this.handleClick);
  }

  componentWillUnmount = () => {
    $(document).off(this.handleClick);
  }

  componentDidMount = () => {
    const currentColor = $('#currentColor').css('background-color');
    const prevColor = $('#prevColor').css('background-color');
    store.dispatch({ type: 'currentColor', value: currentColor });
    store.dispatch({ type: 'prevColor', value: prevColor });
  }

  render() {
    return (
      <div name="Tools">
        <div className="palette" id="palette-tool-area">
          <div className="palette-block">
            <button
              id="paint-bucket"
              className="palette-button"
              onMouseEnter={this.buttonOnHoverIn}
              onMouseLeave={this.buttonOnHoverOut}
              onClick={() => {
                this.paintBucketHandler();
                this.setState({ tool: toolState });
              }}
            >
              <i className="fas fa-fill-drip" />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="color-picker"
              className="palette-button"
              onMouseEnter={this.buttonOnHoverIn}
              onMouseLeave={this.buttonOnHoverOut}
              onClick={() => {
                this.colorPickerHandler();
                this.setState({ tool: toolState });
              }}
            >
              <i className="fas fa-eye-dropper" />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="pen"
              className="palette-button"
              onMouseEnter={this.buttonOnHoverIn}
              onMouseLeave={this.buttonOnHoverOut}
              onClick={() => {
                this.penHandler();
                this.setState({ tool: toolState });
              }}
            >
              <i className="fas fa-pencil-alt" />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="eraser"
              className="palette-button"
              onMouseEnter={this.buttonOnHoverIn}
              onMouseLeave={this.buttonOnHoverOut}
              onClick={() => {
                this.eraserHandler();
                this.setState({ tool: toolState });
              }}
            >
              <i className="fas fa-eraser" />
            </button>
          </div>
        </div>

        <div className={`color ${this.state.tool === 'colorPickerTool' ? '' : 'hidden'}`} >
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
              onChange={() => { this.customedColorHandler() }} />
            <span className="color-name">Custom color</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;
