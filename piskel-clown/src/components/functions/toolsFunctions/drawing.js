import $ from 'jquery';

let endX;
let endY;
let mouseDownX;
let mouseDownY;

// drawing on mouse move
export function endDraw(e, currentCanvas, tool, customWidth, color) {
  const drawCanv = document.querySelector('#drawCanvas');
  const rect = drawCanv.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  const ctx = $(`#canvas${currentCanvas}`)
    .get(0)
    .getContext('2d');
  endX = x;
  endY = y;
  if (tool === 'penTool') {
    ctx.fillStyle = color; // color depends on chosen color
    ctx.strokeStyle = color;
  } else if (tool === 'eraserTool') {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
  }

  // calc pen size according to chosen canvas width
  const canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
  // calc position and size of canvas rectangles according to pen size
  const mouseMoveX = Math.floor(x / canvasSize) * canvasSize;
  const mouseMoveY = Math.floor(y / canvasSize) * canvasSize;
  if (mouseDownX > endX || mouseDownY > endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  } else if (mouseDownX + canvasSize < endX || mouseDownY + canvasSize < endY) {
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  }
}

// drawing on mouse click
export function startDraw(e, currentCanvas, tool, customWidth, color) {
  const canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
  const drawCanv = document.querySelector('#drawCanvas');
  const rect = drawCanv.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  mouseDownX = Math.floor(x / canvasSize) * canvasSize;
  mouseDownY = Math.floor(y / canvasSize) * canvasSize;
  if (tool === 'penTool' || tool === 'eraserTool') {
    const ctx = $(`#canvas${currentCanvas}`)
      .get(0)
      .getContext('2d');
    if (tool === 'penTool') {
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
    } else if (tool === 'eraserTool') {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.globalCompositeOperation = 'destination-out';
    }
    ctx.fillRect(mouseDownX, mouseDownY, canvasSize, canvasSize);
  }
}

let startX;
let startY;
let lastX;
let lastY;
let radius;

export function endStroke(e, currentCanvas, tool, customWidth, color) {
  const drawCanv = document.querySelector('#drawCanvas');
  const rect = drawCanv.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  const canvasSize = Math.ceil($(`#canvas${currentCanvas}`).width() / customWidth);
  const drawCtx = $('#drawCanvas')
    .get(0)
    .getContext('2d');
  const width = $('#drawCanvas').width();

  lastX = x;
  lastY = y;
  drawCtx.clearRect(0, 0, width, width);
  drawCtx.globalCompositeOperation = 'source-over';
  drawCtx.strokeStyle = color;
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
    const ctx = $(`#canvas${currentCanvas}`)
      .get(0)
      .getContext('2d');
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = color;
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
    $('#drawCanvas').off('mouseup')
  });
}

export function startStroke(e, currentCanvas, tool, customWidth, color) {
  const drawCanv = document.querySelector('#drawCanvas');
  const rect = drawCanv.getBoundingClientRect();
  const x = Math.floor(e.clientX - rect.left);
  const y = Math.floor(e.clientY - rect.top);
  startX = x;
  startY = y;

  $('#drawCanvas').mousemove(endStroke(e, currentCanvas, tool, customWidth, color));
}
