import React from 'react';
import $ from 'jquery';
import './resizeWindow';
import './canvas.css';
import store from '../../store/store';
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
      curCanvas: ''
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
    if (this.mounted) {
      this.setState({ curCanvas: currentCanvas });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  penHandleClick() {
    if (this.mounted) {
      this.setState({ curCanvas: currentCanvas });
    }

    // remove old events
    $(`#canvas${this.state.curCanvas}`)
      .unbind('mousedown')
      .unbind('mouseup');
    // initialize new events
    $(`#canvas${this.state.curCanvas}`).mousedown(start);
    $(`#canvas${this.state.curCanvas}`).mouseup(() => {
      $(`#canvas${this.state.curCanvas}`).off('mousemove');
      // create canvas-image url
      const dataURL = $(`#canvas${this.state.curCanvas}`)[0].toDataURL('image/png');
      // put canvas image in preview-box
      $(`#frame${this.state.curCanvas}`)
        .find('.preview-box')
        .css({
          background: `url(${dataURL})`,
          'background-size': 'contain'
        });
      // create image for animation preview
      setTimeout(() => {
        makeImage(this.state.curCanvas);
      }, 500);
    });
  }

  render() {
    return (
      <canvas
        id="canvas1"
        className="canvas hidden"
        width={this.state.size}
        height={this.state.size}
      />
    );
  }
}

export default Canvas;
