import $ from 'jquery';

// copy target frame's canvas with content if the frame was cloned
export function copyCanvas(oldID, newID) {
  const originalContext = $(`#canvas${oldID}`)
    .get(0)
    .getContext('2d');
  const imageData = originalContext.getImageData(
    0,
    0,
    $(`#canvas${oldID}`).width(),
    $(`#canvas${oldID}`).width()
  );
  const cloneContext = $(`#canvas${newID}`).get(0).getContext('2d');
  cloneContext.putImageData(imageData, 0, 0);
}

export function copyCanvasContext(n) {
  const originalContext = $(`#canvas${n}`)
    .get(0)
    .getContext('2d');
  const imageData = originalContext.getImageData(
    0,
    0,
    $(`#canvas${n}`).width(),
    $(`#canvas${n}`).width()
  );
  return imageData;
}

export function putImage(n, imageData) {
  const cloneContext = $(`#canvas${n}`)
    .get(0)
    .getContext('2d');
  cloneContext.putImageData(imageData, 0, 0);
}
