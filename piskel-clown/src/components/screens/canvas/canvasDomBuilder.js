import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import store from 'store/store';
import 'components/screens/canvas/canvasDomBuilder.css';
import bg1 from 'assets/images/bg/bg1.png';
import { createCursorShadow, clearCanvas, endCursorMove } from 'components/functions/toolsFunctions/cursorShadow';
import { startDraw, endDraw, startStroke, endStroke } from 'components/functions/toolsFunctions/drawing';
import { makeImage } from 'components/functions/preview';
import paintIt from 'components/functions/toolsFunctions/paint';
import { rgbaToHex } from 'components/functions/colors';

export default class CanvasWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      size: '',
      draw: false,
      lines: false
    };
    this.mounted = false;
  }

  componentWillMount() {
    const canvasWidth =
      window.innerWidth - 500 < window.innerHeight - 155
        ? window.innerWidth - 500
        : window.innerHeight - 155;
    this.setState({ size: canvasWidth > 350 ? canvasWidth : 350 });
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  mouseDownHandler(e) {
    const tool = this.props.toolState.currentTool;
    const curCanvas = this.props.currentCanvas;
    const customWidth = this.props.settings.customWidth;
    const color = this.props.toolState.currentColor;
    if (tool === 'penTool' || tool === 'eraserTool') {
      this.setState({ draw: true });
      clearCanvas();
      startDraw(e, curCanvas, tool, customWidth, color);
      store.dispatch({ type: 'palette', value: color });
    } else if (tool === 'strokeTool' || tool === 'rectangleTool' || tool === 'circleTool') {
      this.setState({ lines: true });
      clearCanvas();
      startStroke(e, curCanvas, tool, customWidth, color);
      store.dispatch({ type: 'palette', value: color });
    } else if (tool === 'colorPickerTool') {
      if ($(e.target).is('.canvas')) {
        const curCanv = document.querySelector(`#canvas${curCanvas}`);
        const rect = curCanv.getBoundingClientRect();
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        const ctx = curCanv.getContext('2d').getImageData(x, y, 1, 1).data;
        if (ctx[3] > 0) {
          const hexColor = rgbaToHex(ctx[0], ctx[1], ctx[2]);
          store.dispatch({ type: 'toolState', value: ['currentColor', hexColor] });
          store.dispatch({ type: 'palette', value: hexColor });
        }
      }
    }
  }

  mouseMoveHandler(e) {
    const tool = this.props.toolState.currentTool;
    const curCanvas = this.props.currentCanvas;
    const customWidth = this.props.settings.customWidth;
    const color = this.props.toolState.currentColor;
    if (tool) {
      if (this.state.draw === true) {
        endDraw(e, curCanvas, tool, customWidth, color);
      } else {
        endCursorMove(e);
      }
      if (this.state.lines === true) {
        endStroke(e, curCanvas, tool, customWidth, color);
      }
    }
  }

  mouseUpHandler() {
    const tool = this.props.toolState.currentTool;
    const curCanvas = this.props.currentCanvas;
    this.setState({ draw: false, lines: false });
    if (!tool) {
      return;
    }
    clearCanvas();
    setTimeout(() => {
      makeImage(curCanvas);
    }, 500);
  }

  render() {
    return (
      <div className="canvas-wrapper">
        <div id="canvas-block" className="canvas-block">
          {this.props.framesArray.length >= 1 ? this.props.framesArray.map((item, i) => {
            return (
              <canvas
                key={item.id}
                id={`canvas${item.id}`}
                className={`canvas ${this.props.currentCanvas === item.id ? '' : 'hidden'}`}
                style={{ background: this.props.settings.currentBG || `url(${bg1}) repeat` }}
                width={this.state.size}
                height={this.state.size}
                onClick={e => this.mouseDownHandler(e)}
              />
            )
          }) :
            (
              <canvas
                id={this.props.currentCanvas}
                className='canvas'
                style={{ background: `url(${bg1}) repeat` }}
                width={this.state.size}
                height={this.state.size}
                onClick={e => this.mouseDownHandler(e)}
              />
            )
          }
        </div>
        <canvas
          id="drawCanvas"
          className="drawCanvas"
          onMouseOver={e => {
            if (this.props.toolState.currentTool) {
              if (this.state.draw === false) {
                createCursorShadow(e);
              }
            }
          }}
          onClick={e => {
            if (this.props.toolState.currentTool === 'paintBucketTool') {
              const curColor = this.props.toolState.currentColor;
              paintIt(e, this.props.currentCanvas, curColor);
              store.dispatch({ type: 'palette', value: curColor });
            }
          }}
          onMouseDown={e => this.mouseDownHandler(e)}
          onMouseMove={e => this.mouseMoveHandler(e)}
          onMouseLeave={() => {
            if (this.state.draw === false) {
              clearCanvas();
            }
          }}
          onMouseUp={e => this.mouseUpHandler(e)}
          onFocus={() => undefined}
          width={this.state.size}
          height={this.state.size}
        />
      </div>
    );
  }
}

CanvasWrapper.propTypes = {
  toolState: PropTypes.object.isRequired,
  currentCanvas: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  framesArray: PropTypes.array.isRequired
};
