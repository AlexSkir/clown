// import $ from 'jquery';
// import { GIFEncoder } from '../../gifModule/jsgif-master/GIFEncoder';
// import encode64 from '../../gifModule/jsgif-master/b64';
// import { store, canvas, settings } from '../../../store/store';

// function fromImageToCanvas() {
//   const newCanv = $('<canvas></canvas>', {
//     id: 'canvasSave1',
//     width: '421px',
//     height: '421px'
//   })
//     .appendTo('#hidden')
//     .attr('width', 421)
//     .attr('height', 421)
//     .css({ width: '421px', height: '421px' });

//   const originalContext = $(newCanv)
//     .get(0)
//     .getContext('2d');
//   originalContext.scale(1, 1);
//   const image = new Image();
//   const shifted = src.shift();
//   image.src = shifted;
//   image.onload = () => {
//     originalContext.drawImage(image, 0, 0, 421, 421);
//     image.style.display = 'none';
//   };
// }

// function makeFgif() {
//   const delay = 1000 / 3;
//   const encoder = new GIFEncoder();
//   encoder.setRepeat(0);
//   encoder.setDelay(delay);
//   encoder.start();

//   for (let i = 0; i < $('#hidden').children().length; i += 1) {
//     const curCanv = $('#hidden').children()[i];
//     const originalContext = $(curCanv)
//       .get(0)
//       .getContext('2d');
//     const imageData = originalContext.getImageData(0, 0, curCanv.width, curCanv.height);
//     let len = imageData.data.length;
//     const newArr = [];
//     let map1;
//     let map2;
//     let count = 0;
//     while (len > 0) {
//       map1 = imageData.data.slice(count, count + 4);
//       map2 = map1;
//       if (map2.every(item => item === 0)) {
//         map2 = map2.map(() => 255);
//       }
//       newArr.push(...map2);
//       count += 4;
//       len -= 4;
//     }
//     const fixedNewArray = Uint8ClampedArray.from(newArr);
//     const newImage = new ImageData(fixedNewArray, curCanv.width, curCanv.height);
//     encoder.setSize(curCanv.height, curCanv.width);
//     encoder.addFrame(newImage, true);
//   }
//   encoder.finish();
//   const filename = 'New Piskel-clone';
//   encoder.download(`${filename}.gif`);
// }

// export { fromImageToCanvas, makeFgif };
