import $ from 'jquery';
import store from 'store/store';

let customWidth;
store.subscribe(() => {
  customWidth = store.getState().customWidth || 33;
});

let endX;
let endY;
let mouseOverX;
let mouseOverY;

export function endCursorMove(e) {
  const curCanv = document.querySelector('#drawCanvas');
  const rect = curCanv.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  const ctx = $('#drawCanvas')
    .get(0)
    .getContext('2d');
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'gray';
  ctx.strokeStyle = 'gray';
  const width = $('#drawCanvas').width();
  const canvasSize = Math.ceil(width / customWidth); // todo pass store as argument
  endX = x;
  endY = y;
  const mouseMoveX = Math.floor(x / canvasSize) * canvasSize;
  const mouseMoveY = Math.floor(y / canvasSize) * canvasSize;
  if (mouseOverX > endX || mouseOverY > endY) {
    ctx.clearRect(0, 0, width, width);
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  } else if (mouseOverX + canvasSize < endX || mouseOverY + canvasSize < endY) {
    ctx.clearRect(0, 0, width, width);
    ctx.fillRect(mouseMoveX, mouseMoveY, canvasSize, canvasSize);
  }
}

export function createCursorShadow(e) {
  const width = $('#drawCanvas').width();
  const curCanv = document.querySelector('#drawCanvas');
  const canvasSize = Math.ceil(width / customWidth);
  const rect = curCanv.getBoundingClientRect();
  const x = Math.round(e.clientX - rect.left);
  const y = Math.round(e.clientY - rect.top);
  mouseOverX = Math.floor(x / canvasSize) * canvasSize;
  mouseOverY = Math.floor(y / canvasSize) * canvasSize;
  const ctx = $('#drawCanvas')
    .get(0)
    .getContext('2d');
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'gray';
  ctx.strokeStyle = 'gray';
  ctx.fillRect(mouseOverX, mouseOverY, canvasSize, canvasSize);
}

export function clearCanvas() {
  const ctx = $('#drawCanvas')
    .get(0)
    .getContext('2d');
  const width = $('#drawCanvas').width();
  ctx.clearRect(0, 0, width, width);
}
