import React from 'react';
import $ from 'jquery';
import './frames.css';
import { hoverIn, hoverOut, addNewFrame, removeFrame, copyFrame } from './framesManager';
import { openCanvas } from './canvasManager';
import store from '../../store/store';

let customWidth;
store.subscribe(() => {
  customWidth = store.getState().customWidth;
});

class Frames extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    $('.frame')
      .hover(hoverIn, hoverOut)
      .click(openCanvas); // show/hide frame buttons
    $('.removeFrame').click(removeFrame); // frame-button to remove frame
    $('.copyFrame').click(copyFrame); // frame-button to copy frame

    // make the first frame active
    $('#frame1')
      .click(openCanvas)
      .click();

    // calculating canvas resize options
    $('#current-width').text(customWidth);
    $('#current-height').text(customWidth);
    $('#new-width').text($('#canvas1').width());
    $('#resize-input').attr('max', $('#canvas1').width());
  }

  render() {
    return (
      <div className="frame-box">
        <ul id="frame-list" className="frame-list">
          <li className="frame activeFrame" id="frame1">
            <p id="preview-box" className="preview-box" />
            <title className="number">1</title>
            <span className="copyFrame hidden">
              <i className="fas fa-copy" />
            </span>
            <span className="removeFrame hidden">
              <i className="fas fa-trash-alt" />
            </span>
          </li>
        </ul>
        <button className="addNewFrame" onClick={addNewFrame} type="button">
          Add new frame
        </button>
      </div>
    );
  }
}

export default Frames;
