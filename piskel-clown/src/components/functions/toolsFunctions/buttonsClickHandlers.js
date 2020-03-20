import $ from 'jquery';
import picker from 'assets/images/toolIcons/colorpicker.png';
import bucket from 'assets/images/toolIcons/bucket.png';
import eraser from 'assets/images/toolIcons/eraser.png';
import pen from 'assets/images/toolIcons/pen.png';

export default function toolButtonsClickHandler(activeTool) {
  $('#drawCanvas').show();
  if (activeTool === 'paintBucketTool') {
    $(document.body).css({ cursor: `url(${bucket}) 15 15, auto` });
  } else if (activeTool === 'colorPickerTool') {
    $('#drawCanvas').hide();
    $(document.body).css({ cursor: `url(${picker}) 1 10, auto` });
  } else if (
    activeTool === 'penTool'
    || activeTool === 'strokeTool'
    || activeTool === 'rectangleTool'
    || activeTool === 'circleTool'
  ) {
    $(document.body).css({ cursor: `url(${pen}) 1 18, auto` });
  } else if (activeTool === 'eraserTool') {
    $(document.body).css({ cursor: `url(${eraser}) 1 18, auto` });
  } else {
    $(document.body).css({ cursor: 'default' });
  }
}
