import $ from 'jquery';
import { GIFEncoder } from '../../gifModule/jsgif-master/GIFEncoder';
import { makeImage } from '../../../screens/preview/preview';
import { removeFrame } from '../../frames-list/framesManager';
// import encode64 from '../../gifModule/jsgif-master/b64';
// import { store, canvas, settings } from '../../../store/store';

function fromImageToCanvas() {
  const newCanv = $('<canvas></canvas>', {
    id: 'canvasSave1',
    width: '421px',
    height: '421px'
  })
    .appendTo('#hidden')
    .attr('width', 421)
    .attr('height', 421)
    .css({ width: '421px', height: '421px' });

  const originalContext = $(newCanv)
    .get(0)
    .getContext('2d');
  originalContext.scale(1, 1);
  const image = new Image();
  // const shifted = src.shift();
  // image.src = shifted;
  image.onload = () => {
    originalContext.drawImage(image, 0, 0, 421, 421);
    image.style.display = 'none';
  };
}

function makeFgif() {
  const delay = 1000 / 3;
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(delay);
  encoder.start();

  for (let i = 0; i < $('#hidden').children().length; i += 1) {
    const curCanv = $('#hidden').children()[i];
    const originalContext = $(curCanv)
      .get(0)
      .getContext('2d');
    const imageData = originalContext.getImageData(0, 0, curCanv.width, curCanv.height);
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
  const filename = 'New Piskel-clone';
  encoder.download(`${filename}.gif`);
}

function fromDataToCanvas(data) {
  const width = $('#drawCanvas').width();
  while ($('#canvas-block').children().length > 1) {
    removeFrame($('#canvas-block').children().length);
  }
  const firstctx = $(`#canvas1`)
    .get(0)
    .getContext('2d');
  firstctx.clearRect(0, 0, width, width);

  for (let i = 0; i < data.length; i += 1) {
    if ($('#canvas-block')) {
      if (data.length > $('#canvas-block').children().length) {
        $('.addNewFrame').click();
      }
      const ctx = $(`#canvas${i + 1}`)
        .get(0)
        .getContext('2d');
      const image = new Image();
      const promise = new Promise((resolve, reject) => {
        image.src = data[i];
        if (image.src) {
          resolve('Success!');
        } else {
          reject(Error('Something went wrong'));
        }
      });
      promise.then(() => {
        ctx.drawImage(image, 0, 0, width, width);
        const dataURL = $(`#canvas${i + 1}`)[0].toDataURL('image/png');
        $(`#frame${i + 1}`)
          .find('.preview-box')
          .css({
            background: `url(${dataURL})`,
            'background-size': 'contain'
          });
        makeImage(i + 1);
      });
    }
  }
}

export { fromImageToCanvas, makeFgif, fromDataToCanvas };
