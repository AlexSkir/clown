import React from 'react';
import $ from 'jquery';
import './resizeWindow';
import './canvas.css';
import { canvas } from '../../store/store';
import { start, strokeLines } from './drawing';
import paintIt from './paint';
import { makeImage } from '../preview/preview';

let currentCanvas;
canvas.subscribe(() => {
  currentCanvas = canvas.getState().currentCanvas;
});

class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      size: ''
    };
    this.mounted = false;
  }

  componentWillMount() {
    const canvasWidth =
      window.innerWidth - 450 < window.innerHeight - 155
        ? window.innerWidth - 450
        : window.innerHeight - 155;
    this.setState({ size: canvasWidth });

    $(document).click(() => this.penHandleClick());
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  penHandleClick() {
    this.mounted = true;

    // remove old events
    $('#drawCanvas')
      .unbind('mousedown')
      .unbind('mouseup')
      .unbind('click');
    // initialize new events
    $('#drawCanvas').click(paintIt);
    $('#drawCanvas').mousedown(start);
    $('#drawCanvas').mousedown(strokeLines);
    $('#drawCanvas').mouseup(() => {
      $('#drawCanvas').off('mousemove');
      const dataURL = $(`#canvas${currentCanvas}`)[0].toDataURL('image/png');
      // put canvas image in preview-box
      $(`#frame${currentCanvas}`)
        .find('.preview-box')
        .css({
          background: `url(${dataURL})`,
          'background-size': 'contain'
        });
      // create image for animation preview
      setTimeout(() => {
        makeImage(currentCanvas);
      }, 500);
    });
  }

  render() {
    return (
      <div>
        <div id="canvas-block" className="canvas-block">
          <canvas
            id="canvas1"
            className="canvas hidden"
            width={this.state.size}
            height={this.state.size}
          />
        </div>
        <canvas
          id="drawCanvas"
          className="drawCanvas"
          width={this.state.size}
          height={this.state.size}
        />
      </div>
    );
  }
}

export default Canvas;
