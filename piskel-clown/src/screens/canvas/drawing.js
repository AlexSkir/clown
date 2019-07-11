import $ from 'jquery';
import { store, canvas, palette } from '../../store/store';

let currentCanvas;
let customWidth;
let tool;
canvas.subscribe(() => {
  currentCanvas = canvas.getState().currentCanvas;
});
store.subscribe(() => {
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
  const canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
  mouseDownX = Math.floor(e.offsetX / canvasSize) * canvasSize;
  mouseDownY = Math.floor(e.offsetY / canvasSize) * canvasSize;
  if (tool === 'penTool' || tool === 'eraserTool') {
    const ctx = $(`#canvas${currentCanvas}`)
      .get(0)
      .getContext('2d');
    if (tool === 'penTool') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = $('#currentColor').css('background-color');
      ctx.strokeStyle = $('#currentColor').css('background-color');
    } else if (tool === 'eraserTool') {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.globalCompositeOperation = 'destination-out';
    }
    ctx.fillRect(mouseDownX, mouseDownY, canvasSize, canvasSize);
    $('#drawCanvas').mousemove(end);
    palette.dispatch({ type: 'addColor', value: $('#currentColor').css('background-color') });
    $('#addColorButton').click();
  }
}

let startX = 0;
let startY = 0;
let lastX = 0;
let lastY = 0;
let radius;

function endStroke(e) {
  let canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
  const drawCtx = $('#drawCanvas')
    .get(0)
    .getContext('2d');
  const width = $('#drawCanvas').width();

  lastX = e.pageX - this.offsetLeft;
  lastY = e.pageY - this.offsetTop;
  drawCtx.clearRect(0, 0, width, width);
  drawCtx.globalCompositeOperation = 'source-over';
  drawCtx.strokeStyle = $('#currentColor').css('background-color');
  drawCtx.lineWidth = canvasSize;
  drawCtx.beginPath();
  if (tool === 'strokeTool') {
    drawCtx.moveTo(startX, startY);
    drawCtx.lineTo(lastX, lastY);
    drawCtx.stroke();
  } else if (tool === 'rectangleTool') {
    drawCtx.moveTo(startX, startY);
    drawCtx.lineTo(lastX, startY);
    drawCtx.lineTo(lastX, lastY);
    drawCtx.lineTo(startX, lastY);
    drawCtx.lineTo(startX, startY);
    drawCtx.stroke();
  } else if (tool === 'circleTool') {
    radius =
      Math.sqrt((startX - lastX) * (startX - lastX) + (startY - lastY) * (startY - lastY)) / 2;
    drawCtx.arc(startX, startY, radius, 0, 2 * Math.PI);
    drawCtx.stroke();
  }

  $('#drawCanvas').mouseup(() => {
    canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
    const ctx = $(`#canvas${currentCanvas}`)
      .get(0)
      .getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = $('#currentColor').css('background-color');
    ctx.lineWidth = canvasSize;
    ctx.beginPath();
    if (tool === 'strokeTool') {
      ctx.moveTo(startX, startY);
      ctx.lineTo(lastX, lastY);
      ctx.stroke();
      drawCtx.clearRect(0, 0, width, width);
    } else if (tool === 'rectangleTool') {
      ctx.moveTo(startX, startY);
      ctx.lineTo(lastX, startY);
      ctx.lineTo(lastX, lastY);
      ctx.lineTo(startX, lastY);
      ctx.lineTo(startX, startY);
      ctx.stroke();
      drawCtx.clearRect(0, 0, width, width);
    } else if (tool === 'circleTool') {
      ctx.arc(startX, startY, radius, 0, 2 * Math.PI);
      ctx.stroke();
      drawCtx.clearRect(0, 0, width, width);
    }
  });
}

function strokeLines(e) {
  startX = e.pageX - this.offsetLeft;
  startY = e.pageY - this.offsetTop;
  $('#drawCanvas').mousemove(endStroke);
}

export { start, end, strokeLines };
