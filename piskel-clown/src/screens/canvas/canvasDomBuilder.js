import React from 'react';
import $ from 'jquery';
import './resizeWindow';
import './canvas.css';
import store from '../../store/store'
import { start } from './drawing';
import { makeImage } from '../preview/preview';

let currentCanvas;
store.subscribe(() => {
  currentCanvas = store.getState().currentCanvas;
});


class Canvas extends React.Component {
  constructor() {
    super();
    this.state = {
      size: '',
      tool: '',
      currentCanvas: ''
    }
  }
  handleClick = () => {
    // remove old events
    $(`#canvas${currentCanvas}`)
      .unbind('mousedown')
      .unbind('mouseup');
    // initialize new events
    $(`#canvas${currentCanvas}`).mousedown(start);
    $(`#canvas${currentCanvas}`).mouseup(() => {
      $(`#canvas${currentCanvas}`).off('mousemove');
      // create canvas-image url
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
  componentWillMount() {
    const canvasWidth =
      window.innerWidth - 450 < window.innerHeight - 155
        ? window.innerWidth - 450
        : window.innerHeight - 155;
    this.setState({ size: canvasWidth });
    $(document).click(this.handleClick);
  }

  render() {
    return (
      <canvas
        id="canvas1"
        className="canvas hidden"
        width={this.state.size}
        height={this.state.size}
      >
      </canvas >
    )
  }
}

export default Canvas;
