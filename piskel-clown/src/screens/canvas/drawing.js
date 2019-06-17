import $ from 'jquery';
import store from '../../store/store';

let currentCanvas;
let customWidth;
let tool;
store.subscribe(() => {
  currentCanvas = store.getState().currentCanvas;
  customWidth = store.getState().customWidth || 33;
  tool = store.getState().currentTool;
});

let endX;
let endY;
let mouseDownX;
let mouseDownY;

// drawing on mouse move
function end(e) {
  const ctx = $(`#canvas${currentCanvas}`)
    .get(0)
    .getContext('2d');
  endX = e.offsetX;
  endY = e.offsetY;
  if (tool === 'penTool') {
    ctx.fillStyle = $('#currentColor').css('background-color'); // color depends on chosen color
    ctx.strokeStyle = $('#currentColor').css('background-color');
  } else if (tool === 'eraserTool') {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  }
  // calc pen size according to chosen canvas width
  const canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
  // calc position and size of canvas rectangles according to pen size
  const mouseMoveX = Math.floor(e.offsetX / canvasSize) * canvasSize;
  const mouseMoveY = Math.floor(e.offsetY / canvasSize) * canvasSize;
  if (mouseDownX > endX || mouseDownY > endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  } else if (mouseDownX + canvasSize < endX || mouseDownY + canvasSize < endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  }
}

// drawing on mouse click
function start(e) {
  if (tool === 'penTool' || tool === 'eraserTool') {
    const ctx = $(`#canvas${currentCanvas}`)
      .get(0)
      .getContext('2d');
    const canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
    if (tool === 'penTool') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = $('#currentColor').css('background-color');
      ctx.strokeStyle = $('#currentColor').css('background-color');
    } else if (tool === 'eraserTool') {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.globalCompositeOperation = 'destination-out';
    }
    mouseDownX = Math.floor(e.offsetX / canvasSize) * canvasSize;
    mouseDownY = Math.floor(e.offsetY / canvasSize) * canvasSize;
    ctx.fillRect(mouseDownX, mouseDownY, canvasSize, canvasSize);
    $(`#canvas${currentCanvas}`).mousemove(end);
  }
}

export { start, end };
