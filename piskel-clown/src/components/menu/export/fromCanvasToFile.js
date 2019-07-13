/* eslint-disable no-console */
import $ from 'jquery';
import { GIFEncoder } from '../../gifModule/jsgif-master/GIFEncoder';
import encode64 from '../../gifModule/jsgif-master/b64';
import { store, canvas, settings, user } from '../../../store/store';
import { Uploader } from './googleUploader';

let delay;
store.subscribe(() => {
  const fps = store.getState().fps || 3;
  delay = 1000 / fps;
});
let currentCanvas;
canvas.subscribe(() => {
  currentCanvas = canvas.getState().currentCanvas;
});
let filename;
settings.subscribe(() => {
  filename = settings.getState().title;
});

function debugBase64(base64URL) {
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

function debugBase64WithText(array, base64URL) {
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

function saveAsGif(upload) {
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.start();

  for (let i = 0; i < $('#canvas-block').children().length; i += 1) {
    const curCanv = document.querySelector(`#canvas${i + 1}`);
    const originalContext = $(`#canvas${i + 1}`)
      .get(0)
      .getContext('2d');
    const imageData = originalContext.getImageData(
      0,
      0,
      $(`#canvas${i + 1}`).width(),
      $(`#canvas${i + 1}`).width()
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
  }
  encoder.finish();
  filename = filename || 'New Piskel-clone';
  if (upload) {
    return encoder.upload(`${filename}.gif`);
  }
  return encoder.download(`${filename}.gif`);
}

function uploadToUrl() {
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.start();

  for (let i = 0; i < $('#canvas-block').children().length; i += 1) {
    const curCanv = document.querySelector(`#canvas${i + 1}`);
    const originalContext = $(`#canvas${i + 1}`)
      .get(0)
      .getContext('2d');
    const imageData = originalContext.getImageData(
      0,
      0,
      $(`#canvas${i + 1}`).width(),
      $(`#canvas${i + 1}`).width()
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
  }
  encoder.finish();
  const binaryGif = encoder.stream().getData();
  const dataUrl = `data:image/gif;base64,${encode64(binaryGif)}`;
  return dataUrl;
}

function downloadPng() {
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

const apikey = 'AIzaSyAVJFuo57LAwfGHx66mi177_F4r2sWrato';
function loadClient() {
  window.gapi.client.setApiKey(apikey);
  return window.gapi.client
    .load('https://content.googleapis.com/discovery/v1/apis/drive/v3/rest')
    .then(
      () => {
        console.log('GAPI client loaded for API');
      },
      err => {
        console.error('Error loading GAPI client for API', err);
      }
    );
}

function uploadToGoogle() {
  loadClient();
  const content = new Blob([saveAsGif('upload')], { type: 'image/gif' });
  const uploader = new Uploader({
    file: content,
    metadata: {
      name: filename
    },
    onComplete(data) {
      const info = JSON.parse(data);
      const fileId = info.id;
      const url = `https://docs.google.com/file/d/${fileId}/preview`;
      user.dispatch({ type: 'googleUrl', value: url });
      $('#google-link').attr('href', url);
      window.gapi.client.drive.permissions
        .create({
          fileId: `${fileId}`,
          resource: {
            role: 'reader',
            type: 'anyone'
          }
        })
        .then(
          response => {
            // Handle the results here (response.result has the parsed body).
            console.log('Response', response);
          },
          err => {
            console.error('Execute error', err);
          }
        );
    },
    onError(data) {
      console.log(data);
    }
  });
  uploader.upload();
}

export { saveAsGif, uploadToUrl, downloadPng, debugBase64, debugBase64WithText, uploadToGoogle };
