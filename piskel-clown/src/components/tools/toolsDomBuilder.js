import React from 'react';
import $ from 'jquery';
import './tools.css';
import { colorPickerOnClick, customedColorOnChange, rgbaToHex, rgbToHex } from './color-picker';
import paintBucketOnClick from './paintBucket';
import penOnClick from './pen';
import eraserOnClick from './eraser';
import { strokeOnClick, rectangleOnClick, circleOnClick } from './stroke';
import { store, canvas } from '../../store/store';

let toolState;
let currentColorState;
let backColorState;
store.subscribe(() => {
  toolState = store.getState().currentTool;
  currentColorState = store.getState().currentColor;
  backColorState = store.getState().backColor;
});
let currentCanvas;
canvas.subscribe(() => {
  currentCanvas = canvas.getState().currentCanvas;
});
class Tools extends React.Component {
  constructor() {
    super();
    this.state = {
      tool: '',
      active: '',
      value1: '#161030',
      value2: '#c0c0c0',
      pickedColor: ''
    };
    this.mounted = false;
  }

  componentWillMount() {
    $(document).click(e => this.colorPickerHandleClick(e));
  }

  componentDidMount() {
    const currentColor = $('#currentColor').css('background-color');
    const backColor = $('#backColor').css('background-color');
    store.dispatch({ type: 'currentColor', value: currentColor });
    store.dispatch({ type: 'backColor', value: backColor });
    this.mounted = true;
    if (this.mounted === true) {
      this.setState({ pickedColor: currentColor });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  switchColorsOnClick() {
    store.dispatch({ type: 'currentColor', value: backColorState });
    store.dispatch({ type: 'backColor', value: this.state.pickedColor });
    const curColorValue = $('#customed1').val();
    const backColorValue = $('#customed2').val();
    $('#currentColor').css({ 'background-color': currentColorState });
    $('#backColor').css({ 'background-color': backColorState });
    this.setState({
      value1: backColorValue,
      value2: curColorValue,
      pickedColor: currentColorState
    });
  }

  colorPickerHandleClick(e) {
    if (this.state.tool === 'colorPickerTool') {
      $('#drawCanvas').hide();
      if ($(e.target).is('.canvas')) {
        const curCanv = document.querySelector(`#canvas${currentCanvas}`);
        const rect = curCanv.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        const ctx = curCanv.getContext('2d').getImageData(x, y, 1, 1).data;
        const rgbColor = `rgba(${ctx[0]}, ${ctx[1]}, ${ctx[2]})`;
        if (ctx[3] > 0) {
          const hexColor = rgbaToHex(ctx[0], ctx[1], ctx[2]);
          store.dispatch({ type: 'currentColor', value: rgbColor });
          $('#currentColor').css({ 'background-color': rgbColor });
          this.setState({
            value1: hexColor,
            pickedColor: rgbColor
          });
        }
      }
    } else {
      $('#drawCanvas').show();
    }
  }

  buttonOnHoverIn(e) {
    const id = $(e.target).attr('id');
    if (this.mounted) {
      this.setState({ active: id });
    }
  }

  buttonOnHoverOut(e) {
    $(e.target)
      .children()
      .removeClass('fas-hovered');
    if (this.mounted) {
      this.setState({ active: 'false' });
    }
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
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
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
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
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
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
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
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
              }}
            >
              <i
                className={`fas fa-eraser ${this.state.active === 'eraser' ? 'fas-hovered' : ''}`}
              />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="stroke"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                strokeOnClick();
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
              }}
            >
              <i
                className={`fas fa-slash ${this.state.active === 'stroke' ? 'fas-hovered' : ''}`}
              />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="rectangle"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                rectangleOnClick();
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
              }}
            >
              <i
                className={`far fa-square ${
                  this.state.active === 'rectangle' ? 'fas-hovered' : ''
                }`}
              />
            </button>
          </div>
          <div className="palette-block">
            <button
              id="circle"
              className="palette-button"
              type="button"
              onMouseEnter={e => this.buttonOnHoverIn(e)}
              onMouseLeave={e => this.buttonOnHoverOut(e)}
              onClick={() => {
                circleOnClick();
                if (this.mounted) {
                  this.setState({ tool: toolState });
                }
              }}
            >
              <i
                className={`far fa-circle ${this.state.active === 'circle' ? 'fas-hovered' : ''}`}
              />
            </button>
          </div>
        </div>

        <div className="color">
          <div className="color-block hidden">
            <div className="radiobutton current" id="currentColor" />
            <div className="radiobutton back" id="backColor" />
            <button
              type="button"
              id="switchHexValue"
              onClick={() => {
                const hex = rgbToHex(currentColorState);
                this.setState({ value1: hex });
              }}
            />
          </div>
          <div
            className="switcher"
            role="button"
            onClick={() => this.switchColorsOnClick()}
            onFocus={() => undefined}
            onKeyPress={() => undefined}
            tabIndex="-1"
          >
            <i className="fas fa-retweet" />
          </div>
          <div className="color-block-upper">
            <input
              type="color"
              name="colors"
              className="input-color"
              id="customed1"
              value={this.state.value1}
              onChange={() => {
                customedColorOnChange('customed1');
                this.setState({ value1: $('#customed1').val(), pickedColor: currentColorState });
              }}
            />
          </div>
          <div className="color-block-under">
            <input
              type="color"
              name="colors"
              className="input-color"
              id="customed2"
              value={this.state.value2}
              onChange={() => {
                customedColorOnChange('customed2');
                this.setState({ value2: $('#customed2').val() });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;
