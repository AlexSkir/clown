import React from 'react';
import $ from 'jquery';
import './frames.css';
import {
  hoverIn,
  hoverOut,
  addNewFrame,
  removeFrame,
  copyFrame,
  dragFrame,
  dragOff
} from './framesManager';
import { openCanvas } from './canvasManager';
import { store } from '../../store/store';

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
      .click(openCanvas);
    $('.removeFrame').click(removeFrame);
    $('.copyFrame').click(copyFrame);
    $('.dragFrame')
      .mousedown(dragFrame)
      .mouseup(dragOff);

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
        <ul id="sortable" className="frame-list">
          <li className="ui-state-default frame activeFrame" id="frame1">
            <p id="preview-box" className="preview-box" />
            <title className="number">1</title>
            <span className="removeFrame minorZ">
              <i className="fas fa-trash-alt" />
            </span>
            <span className="dragFrame minorZ">
              <i className="fas fa-arrows-alt" />
            </span>
            <span className="copyFrame minorZ">
              <i className="fas fa-copy" />
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
