import $ from 'jquery';
import { GIFEncoder } from 'services/jsgif-master/GIFEncoder';
import encode64 from 'services/jsgif-master/b64';

export function debugBase64(base64URL) {
  const win = window.open();
  $(win.document.body).css({
    display: 'flex',
    width: '100vw',
    heigh: '100vh',
    'justify-content': 'center',
    'align-items': 'center',
    background: 'whitesmoke'
  });
  $('<img></img>', {
    src: base64URL
  }).appendTo(win.document.body);
}

export function debugBase64WithText(array, base64URL) {
  const win = window.open();
  $(win.document.body).css({
    display: 'flex',
    'flex-direction': 'column',
    width: '100vw',
    height: '100vh',
    'align-items': 'center',
    background: 'whitesmoke',
    overflow: 'hidden'
  });
  const ancor = $('<div></div>', {
    id: 'ancor',
    width: '100%',
    height: '50%'
  })
    .appendTo(win.document.body)
    .css({
      width: '80%',
      height: '50%',
      background: 'white',
      'overflow-y': 'scroll',
      'margin-bottom': '25px',
      border: '1px solid black'
    });
  for (let i = 0; i < array.length; i += 1) {
    $('<img></img>', {
      src: array[i],
      width: '25%'
    })
      .appendTo(ancor)
      .css({ border: '1px solid black' });
  }
  $('<div></div>', {
    text: base64URL
  })
    .appendTo(win.document.body)
    .css({
      display: 'flex',
      'flex-wrap': 'wrap',
      width: '80%',
      height: '40%',
      'overflow-y': 'scroll',
      'word-break': 'break-word'
    });
}

export function saveAsGif(upload, fps, filename, frames) {
  const delay = 1000 / fps;
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.start();

  frames.forEach(item => {
    const curCanv = document.querySelector(`#canvas${frames[0].id}`);
    const originalContext = $(`#canvas${item.id}`)
      .get(0)
      .getContext('2d');
    const imageData = originalContext.getImageData(
      0,
      0,
      $(`#canvas${item.id}`).width(),
      $(`#canvas${item.id}`).width()
    );
    let len = imageData.data.length;
    const newArr = [];
    let map1;
    let map2;
    let count = 0;
    while (len > 0) {
      map1 = imageData.data.slice(count, count + 4);
      map2 = map1;
      if (map2.every(item => item === 0)) {
        map2 = map2.map(() => 255);
      }
      newArr.push(...map2);
      count += 4;
      len -= 4;
    }
    const fixedNewArray = Uint8ClampedArray.from(newArr);
    const newImage = new ImageData(fixedNewArray, curCanv.width, curCanv.height);
    encoder.setSize(curCanv.height, curCanv.width);
    encoder.addFrame(newImage, true);
  });
  encoder.finish();
  filename = filename || 'New Piskel-clone';
  if (upload) {
    return encoder.upload(`${filename}.gif`);
  }
  return encoder.download(`${filename}.gif`);
}

export function uploadToUrl(fps, frames) {
  const delay = 1000 / fps;
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.start();

  frames.forEach(item => {
    const curCanv = document.querySelector(`#canvas${frames[0].id}`);
    const originalContext = $(`#canvas${item.id}`)
      .get(0)
      .getContext('2d');
    const imageData = originalContext.getImageData(
      0,
      0,
      $(`#canvas${item.id}`).width(),
      $(`#canvas${item.id}`).width()
    );
    let len = imageData.data.length;
    const newArr = [];
    let map1;
    let map2;
    let count = 0;
    while (len > 0) {
      map1 = imageData.data.slice(count, count + 4);
      map2 = map1;
      if (map2.every(item => item === 0)) {
        map2 = map2.map(() => 255);
      }
      newArr.push(...map2);
      count += 4;
      len -= 4;
    }
    const fixedNewArray = Uint8ClampedArray.from(newArr);
    const newImage = new ImageData(fixedNewArray, curCanv.width, curCanv.height);
    encoder.setSize(curCanv.height, curCanv.width);
    encoder.addFrame(newImage, true);
  });
  encoder.finish();
  const binaryGif = encoder.stream().getData();
  const dataUrl = `data:image/gif;base64,${encode64(binaryGif)}`;
  return dataUrl;
}

export function downloadPng(currentCanvas, fps, filename) {
  const delay = 1000 / fps;
  const i = currentCanvas;
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.start();
  const width = $(`#canvas${i}`).width();
  const originalContext = $(`#canvas${i}`)
    .get(0)
    .getContext('2d');
  const imageData = originalContext.getImageData(0, 0, width, width);
  let len = imageData.data.length;
  const newArr = [];
  let map1;
  let map2;
  let count = 0;
  while (len > 0) {
    map1 = imageData.data.slice(count, count + 4);
    map2 = map1;
    if (map2.every(item => item === 0)) {
      map2 = map2.map(() => 255);
    }
    newArr.push(...map2);
    count += 4;
    len -= 4;
  }
  const fixedNewArray = Uint8ClampedArray.from(newArr);
  const newImage = new ImageData(fixedNewArray, width, width);
  encoder.setSize(width, width);
  encoder.addFrame(newImage, true);
  encoder.finish();
  filename = filename || 'New Piskel-clone';
  encoder.download(`${filename}.png`);
}
