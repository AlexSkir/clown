import $ from 'jquery';
import { makeImage } from '../../screens/preview/preview';
import store from '../../store/store'

// show canvas according to active frame, hide other canvas
function openCanvas() {
  const num = $(this)
    .find('.number')
    .text(); // calc target frame ID
  store.dispatch({ type: 'currentCanvas', value: +num });
  $('.canvas').addClass('hidden'); // hide all canvas
  $(`#canvas${num}`).removeClass('hidden'); // show current canvas
  if ($('.activeFrame')) {
    $('.activeFrame').removeClass('activeFrame');
  }
  $(this).toggleClass('activeFrame'); // make current frame active
  setTimeout(() => {
    makeImage(+num); // automatically make image of current canvas for animation
  }, 200);
}

// create new canvas if new frame was created
function newCanvas(n) {
  const canvasWidth =
    window.innerWidth - 450 < window.innerHeight - 155
      ? window.innerWidth - 450
      : window.innerHeight - 155;
  const canvas = $('<canvas/>', {
    class: 'canvas hidden',
    id: `canvas${n}`
  })
    .attr('width', canvasWidth)
    .attr('height', canvasWidth);
  canvas.appendTo('.canvas-area');
}

// copy target frame's canvas with content if the frame was cloned
function copyCanvas(n) {
  const cloneWrapper = $(`#canvas${n}`)
    .clone()
    .attr('id', `canvas${+n + 1}`)
    .attr('width', $(`#canvas${n}`).width())
    .attr('height', $(`#canvas${n}`).width())
    .insertAfter(`#canvas${n}`);
  const originalContext = $(`#canvas${n}`)
    .get(0)
    .getContext('2d');
  const imageData = originalContext.getImageData(
    0,
    0,
    $(`#canvas${n}`).width(),
    $(`#canvas${n}`).width()
  );
  const cloneContext = cloneWrapper.get(0).getContext('2d');
  cloneContext.putImageData(imageData, 0, 0);
}

export { copyCanvas, newCanvas, openCanvas };
