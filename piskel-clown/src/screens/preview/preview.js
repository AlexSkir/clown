import $ from 'jquery';
import { store } from '../../store/store';

let fps;
store.subscribe(() => {
  fps = store.getState().fps || 3;
});
let count = 0;
let anim;
function animate() {
  clearTimeout(anim); // stop old animation
  const time = 1000 / fps; // calc animation speed
  $('.preview')
    .children()
    .css({ display: 'none' }); // hide all canvas-images
  if ($('.preview').children()[count]) {
    $('.preview').children()[count].style.display = 'block'; // show only the "count"-th image
  }
  count += 1;
  if (count === $('.preview').children().length) {
    count = 0; // restart counting if all images were shown
  }

  anim = setTimeout(animate, time); // repeat animation
}

// make image from canvas drawing
function makeImage(n) {
  const canvasImage = new Image();
  if ($(`#canvas${n}`)[0]) {
    $(canvasImage)
      .attr('id', `canvasImage${n}`)
      .css({ width: '100%' })
      .attr('src', $(`#canvas${n}`)[0].toDataURL('image/png'));
  }
  // if the image is from the same canvas should update the image
  if ($(`#canvasImage${n}`).length) {
    $(canvasImage)
      .insertBefore(`#canvasImage${n}`)
      .next()
      .remove();
  } else {
    // if new canvas was made should append new image
    $(canvasImage).appendTo('.preview');
  }
  if ($('.preview').children().length > 1) {
    count = 0;
    animate();
  } else {
    clearTimeout(anim);
  }
}

let newWindow;
let id = 0;
// open new window to watch animation in full-size mode
function fullSizePreview() {
  if (newWindow) {
    id += 1;
    newWindow.close();
  }
  newWindow = window.open('about:blank', `window${id}`, 'width=300,height=300');

  // cloning animation box with images to new window
  const newPreview = $('.preview')
    .clone()
    .appendTo(newWindow.document.body)
    .css({ display: 'flex', 'justify-content': 'center', 'align-items': 'center', height: '100%' });
  $(newWindow.document.body).css({
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  });

  const newFps = fps;
  let newCount = 0;

  function newAnimate() {
    // clearTimeout(newAnim);
    const time = 1000 / newFps;
    newPreview.children().css({ display: 'none' });
    if (newPreview.children()[newCount]) {
      newPreview.children()[newCount].style.display = 'block';
    }
    newCount += 1;
    if (newCount === newPreview.children().length) {
      newCount = 0;
    }
    setTimeout(newAnimate, time);
  }
  // when new window loaded should start animation
  $(newWindow).ready(newAnimate);
}

export { makeImage, animate, fullSizePreview };
