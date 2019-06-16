import React from 'react';
import $ from 'jquery';
import './preview.css';
import { fullSizePreview } from './preview';

// show/hide animation preview buttons
function hoverIn() {
  if ($('#preview-open').hasClass('hidden')) {
    $('#preview-open').removeClass('hidden');
  }
}
function hoverOut() {
  if (!$('#preview-open').hasClass('hidden')) {
    $('#preview-open').addClass('hidden');
  }
}

class Preview extends React.Component {
  render() {
    return (
      <div
        id="preview-area"
        className="preview-area"
        onMouseEnter={hoverIn}
        onMouseLeave={hoverOut}
      >
        <div
          className="preview-open hidden"
          id="preview-open"
          onClick={fullSizePreview} // open animation in full size mode
        ><i className="fas fa-external-link-alt"></i></div>
        <div className="preview"></div>
      </div>
    )
  }
}

export default Preview;
