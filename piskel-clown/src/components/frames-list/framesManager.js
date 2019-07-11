import $ from 'jquery';
import 'jquery-ui-sortable-npm';
import { makeImage } from '../../screens/preview/preview';
import { openCanvas, newCanvas, copyCanvas, copyCanvasContext, putImage } from './canvasManager';

// show/hide frame buttons
function hoverIn() {
  const children = $(this).find('span');
  if (children.hasClass('minorZ')) {
    children.removeClass('minorZ');
    if ($('#sortable').children().length === 1) {
      $('#frame1')
        .find('.removeFrame')
        .addClass('minorZ');
      $('#frame1')
        .find('.dragFrame')
        .addClass('minorZ');
    }
  }
}
function hoverOut() {
  const children = $(this).find('span');
  if (!children.hasClass('minorZ')) {
    children.addClass('minorZ');
  }
  if ($('#sortable').children().length === 1) {
    $('#frame1')
      .find('.copyFrame')
      .addClass('minorZ');
    $('#frame1')
      .find('.dragFrame')
      .addClass('minorZ');
  }
}
// update IDs after adding/removing elements
function updateId() {
  for (let i = 0; i < $('#sortable').children().length; i += 1) {
    $('#sortable').children()[i].id = `frame${i + 1}`;
    const child = $($('#sortable').children()[i]);
    child.find('.number').text(i + 1);
    makeImage(i + 1);
  }
  for (let i = 0; i < $('#canvas-block').children().length; i += 1) {
    $('#canvas-block').children()[i].id = `canvas${i + 1}`;
  }
  for (let i = 0; i < $('.preview').children().length; i += 1) {
    $('.preview').children()[i].id = `canvasImage${i + 1}`;
  }
}

function dragFrame() {
  $('#sortable').sortable();
  $('#sortable').sortable('option', 'disabled', false);
  $('#sortable').disableSelection();
}

function dragOff(e) {
  $('#sortable').sortable('option', 'disabled', true);
  setTimeout(() => {
    const dragged = $(e.currentTarget)
      .parent()
      .find('.number')
      .text();
    updateId();
    const target = $(e.currentTarget)
      .parent()
      .find('.number')
      .text();
    $(e.currentTarget)
      .parent()
      .click();
    const draggedImage = copyCanvasContext(dragged);
    const targetImage = copyCanvasContext(target);
    putImage(dragged, targetImage);
    putImage(target, draggedImage);
    updateId();
  }, 200);
}

function removeFrame() {
  // calculating target's ID
  const num = $(this)
    .parent()
    .find('.number')
    .text();
  // remove all related elements
  $(`#frame${num}`).remove();
  $(`#canvasImage${num}`).remove();
  $(`#canvas${num}`).remove();
  updateId();
  $(`#frame${+num - 1}`).click(); // make previous frame active
}

function copyFrame() {
  // calculating target's ID
  const num = $(this)
    .parent()
    .find('.number')
    .text();
  // cloning target frame
  $(`#frame${num}`)
    .clone()
    .insertAfter(`#frame${num}`)
    .attr('id', `frame${+num + 1}`)
    .removeClass('activeFrame')
    .hover(hoverIn, hoverOut)
    .click(openCanvas);
  // cloning target canvas image
  copyCanvas(num);
  // bind frame events
  $(`#frame${+num + 1}`)
    .find('.removeFrame')
    .click(removeFrame);
  $(`#frame${+num + 1}`)
    .find('.copyFrame')
    .click(copyFrame);
  $(`#frame${+num + 1}`)
    .find('.dragFrame')
    .mousedown(dragFrame)
    .mouseup(dragOff);
  // make copied frame active
  setTimeout(() => {
    $(`#frame${+num + 1}`).click();
  }, 100);
  updateId();
  // cloning target frame preview image
  const dataURL = $(`#canvas${num}`)[0].toDataURL('image/png');
  if (dataURL) {
    $(`#frame${+num + 1}`)
      .find('.preview-box')
      .css({
        background: `url(${dataURL})`,
        'background-size': 'contain'
      });
  }
  // update frame images and animation
  for (let i = 0; i < $('.frame-list').children().length; i += 1) {
    makeImage(i + 1);
  }
}

function addNewFrame() {
  const count = $('.frame-list').children().length + 1; // calc ID for new frame
  $('.frame')
    .first()
    .clone()
    .appendTo('.frame-list')
    .attr('id', `frame${count}`)
    .removeClass('activeFrame')
    .hover(hoverIn, hoverOut)
    .click(openCanvas)
    .find('.preview-box')
    .css({ background: 'none' }); // clear preview-box background from first frame
  $('.number')
    .last()
    .text(count); // update number of frame
  newCanvas(count);
  $(`#frame${count}`)
    .find('.removeFrame')
    .click(removeFrame);
  $(`#frame${count}`)
    .find('.copyFrame')
    .click(copyFrame);
  $(`#frame${count}`)
    .find('.dragFrame')
    .mousedown(dragFrame)
    .mouseup(dragOff);
  setTimeout(() => {
    $(`#frame${count}`).click(); // make new frame active
  }, 100);
}

export { hoverIn, hoverOut, addNewFrame, removeFrame, copyFrame, dragFrame, dragOff, updateId };
