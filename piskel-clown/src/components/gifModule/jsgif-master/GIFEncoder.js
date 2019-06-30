/* eslint-disable no-console */
/* eslint-disable func-names */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-concat */
/* eslint-disable no-bitwise */
/* eslint-disable no-return-assign */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-empty */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable camelcase */
/* eslint-disable no-multi-assign */
/* eslint-disable no-unused-vars */
/* eslint-disable block-scoped-var */
/* eslint-disable no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/**
 * This class lets you encode animated GIF files
 * Base class :  http://www.java2s.com/Code/Java/2D-Graphics-GUI/AnimatedGifEncoder.htm
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @version 0.1 AS3 implementation
 */
import { NeuQuant } from './NeuQuant';
import { LZWEncoder } from './LZWEncoder';

const GIFEncoder = function() {
  for (var i = 0, chr = {}; i < 256; i++) chr[i] = String.fromCharCode(i);

  function ByteArray() {
    this.bin = [];
  }

  ByteArray.prototype.getData = function() {
    for (var v = '', l = this.bin.length, i = 0; i < l; i++) v += chr[this.bin[i]];
    return v;
  };

  ByteArray.prototype.writeByte = function(val) {
    this.bin.push(val);
  };

  ByteArray.prototype.writeUTFBytes = function(string) {
    for (let l = string.length, i = 0; i < l; i++) this.writeByte(string.charCodeAt(i));
  };

  ByteArray.prototype.writeBytes = function(array, offset, length) {
    for (let l = length || array.length, i = offset || 0; i < l; i++) this.writeByte(array[i]);
  };

  const exports = {};
  let width; // image size
  let height;
  let transparent = null; // transparent color if given
  let transIndex; // transparent index in color table
  let repeat = -1; // no repeat
  let delay = 0; // frame delay (hundredths)
  let started = false; // ready to output frames
  let out;
  let image; // current frame
  let pixels; // BGR byte array from frame
  let indexedPixels; // converted frame indexed to palette
  let colorDepth; // number of bit planes
  let colorTab; // RGB palette
  const usedEntry = []; // active palette entries
  let palSize = 7; // color table size (bits-1)
  let dispose = -1; // disposal code (-1 = use default)
  let closeStream = false; // close stream when finished
  let firstFrame = true;
  let sizeSet = false; // if false, get size from first frame
  let sample = 10; // default sample interval for quantizer
  let comment = 'Generated by jsgif (https://github.com/antimatter15/jsgif/)'; // default comment for generated gif

  /**
   * Sets the delay time between each frame, or changes it for subsequent frames
   * (applies to last frame added)
   * int delay time in milliseconds
   * @param ms
   */

  const setDelay = (exports.setDelay = function setDelay(ms) {
    delay = Math.round(ms / 10);
  });

  /**
   * Sets the GIF frame disposal code for the last added frame and any
   *
   * subsequent frames. Default is 0 if no transparent color has been set,
   * otherwise 2.
   * @param code
   * int disposal code.
   */

  const setDispose = (exports.setDispose = function setDispose(code) {
    if (code >= 0) dispose = code;
  });

  /**
   * Sets the number of times the set of GIF frames should be played. Default is
   * 1; 0 means play indefinitely. Must be invoked before the first image is
   * added.
   *
   * @param iter
   * int number of iterations.
   * @return
   */

  const setRepeat = (exports.setRepeat = function setRepeat(iter) {
    if (iter >= 0) repeat = iter;
  });

  /**
   * Sets the transparent color for the last added frame and any subsequent
   * frames. Since all colors are subject to modification in the quantization
   * process, the color in the final palette for each frame closest to the given
   * color becomes the transparent color for that frame. May be set to null to
   * indicate no transparent color.
   * @param
   * Color to be treated as transparent on display.
   */

  const setTransparent = (exports.setTransparent = function setTransparent(c) {
    transparent = c;
  });

  /**
   * Sets the comment for the block comment
   * @param
   * string to be insterted as comment
   */

  const setComment = (exports.setComment = function setComment(c) {
    comment = c;
  });

  /**
   * The addFrame method takes an incoming BitmapData object to create each frames
   * @param
   * BitmapData object to be treated as a GIF's frame
   */

  const addFrame = (exports.addFrame = function addFrame(im, is_imageData) {
    if (im === null || !started || out === null) {
      throw new Error('Please call start method before calling addFrame');
    }

    let ok = true;

    try {
      if (!is_imageData) {
        image = im.getImageData(0, 0, im.canvas.width, im.canvas.height).data;
        if (!sizeSet) setSize(im.canvas.width, im.canvas.height);
      } else if (im instanceof ImageData) {
        image = im.data;
        if (width != im.width || height != im.height) {
          setSize(im.width, im.height);
        } else {
        }
      } else if (im instanceof Uint8ClampedArray) {
        if (im.length == width * height * 4) {
          image = im;
        } else {
          console.log('Please set the correct size: ImageData length mismatch');
          ok = false;
        }
      } else {
        console.log('Please provide correct input');
        ok = false;
      }
      getImagePixels(); // convert to correct format if necessary
      analyzePixels(); // build color table & map pixels

      if (firstFrame) {
        writeLSD(); // logical screen descriptior
        writePalette(); // global color table
        if (repeat >= 0) {
          // use NS app extension to indicate reps
          writeNetscapeExt();
        }
      }

      writeGraphicCtrlExt(); // write graphic control extension
      if (comment !== '') {
        writeCommentExt(); // write comment extension
      }
      writeImageDesc(); // image descriptor
      if (!firstFrame) writePalette(); // local color table
      writePixels(); // encode and write pixel data
      firstFrame = false;
    } catch (e) {
      ok = false;
    }

    return ok;
  });

  /**
   * @description: Downloads the encoded gif with the given name
   * No need of any conversion from the stream data (out) to base64
   * Solves the issue of large file sizes when there are more frames
   * and does not involve in creation of any temporary data in the process
   * so no wastage of memory, and speeds up the process of downloading
   * to just calling this function.
   * @parameter {String} filename filename used for downloading the gif
   */

  const download = (exports.download = function download(filename) {
    if (out === null || closeStream == false) {
      console.log(
        'Please call start method and add frames and call finish method before calling download'
      );
    } else {
      filename =
        filename !== undefined ? (filename.endsWith('.gif') ? filename : filename) : 'download.gif';
      const templink = document.createElement('a');
      templink.download = filename;
      templink.href = URL.createObjectURL(
        new Blob([new Uint8Array(out.bin)], { type: 'image/gif' })
      );
      templink.click();
    }
  });

  /**
   * Adds final trailer to the GIF stream, if you don't call the finish method
   * the GIF stream will not be valid.
   */

  const finish = (exports.finish = function finish() {
    if (!started) return false;

    let ok = true;
    started = false;

    try {
      out.writeByte(0x3b); // gif trailer
      closeStream = true;
    } catch (e) {
      ok = false;
    }

    return ok;
  });

  /**
   * Resets some members so that a new stream can be started.
   * This method is actually called by the start method
   */

  const reset = function reset() {
    // reset for subsequent use
    transIndex = 0;
    image = null;
    pixels = null;
    indexedPixels = null;
    colorTab = null;
    closeStream = false;
    firstFrame = true;
  };

  /**
   * * Sets frame rate in frames per second. Equivalent to
   * <code>setDelay(1000/fps)</code>.
   * @param fps
   * float frame rate (frames per second)
   */

  const setFrameRate = (exports.setFrameRate = function setFrameRate(fps) {
    if (fps != 0xf) delay = Math.round(100 / fps);
  });

  /**
   * Sets quality of color quantization (conversion of images to the maximum 256
   * colors allowed by the GIF specification). Lower values (minimum = 1)
   * produce better colors, but slow processing significantly. 10 is the
   * default, and produces good color mapping at reasonable speeds. Values
   * greater than 20 do not yield significant improvements in speed.
   * @param quality
   * int greater than 0.
   * @return
   */

  const setQuality = (exports.setQuality = function setQuality(quality) {
    if (quality < 1) quality = 1;
    sample = quality;
  });

  /**
   * Sets the GIF frame size. The default size is the size of the first frame
   * added if this method is not invoked.
   * @param w
   * int frame width.
   * @param h
   * int frame width.
   */

  var setSize = (exports.setSize = function setSize(w, h) {
    if (started && !firstFrame) return;
    width = w;
    height = h;
    if (width < 1) width = 320;
    if (height < 1) height = 240;
    sizeSet = true;
  });

  /**
   * Initiates GIF file creation on the given stream.
   * @param os
   * OutputStream on which GIF images are written.
   * @return false if initial write failed.
   */

  const start = (exports.start = function start() {
    reset();
    let ok = true;
    closeStream = false;
    out = new ByteArray();
    try {
      out.writeUTFBytes('GIF89a'); // header
    } catch (e) {
      ok = false;
    }

    return (started = ok);
  });

  const cont = (exports.cont = function cont() {
    reset();
    const ok = true;
    closeStream = false;
    out = new ByteArray();

    return (started = ok);
  });

  /**
   * Analyzes image colors and creates color map.
   */

  var analyzePixels = function analyzePixels() {
    const len = pixels.length;
    const nPix = len / 3;
    indexedPixels = [];
    const nq = new NeuQuant(pixels, len, sample);

    // initialize quantizer
    colorTab = nq.process(); // create reduced palette

    // map image pixels to new palette
    let k = 0;
    for (let j = 0; j < nPix; j++) {
      const index = nq.map(pixels[k++] & 0xff, pixels[k++] & 0xff, pixels[k++] & 0xff);
      usedEntry[index] = true;
      indexedPixels[j] = index;
    }

    pixels = null;
    colorDepth = 8;
    palSize = 7;

    // get closest match to transparent color if specified
    if (transparent !== null) {
      transIndex = findClosest(transparent);
    }
  };

  /**
   * Returns index of palette color closest to c
   */

  var findClosest = function findClosest(c) {
    if (colorTab === null) return -1;
    const r = (c & 0xff0000) >> 16;
    const g = (c & 0x00ff00) >> 8;
    const b = c & 0x0000ff;
    let minpos = 0;
    let dmin = 256 * 256 * 256;
    const len = colorTab.length;

    for (let i = 0; i < len; ) {
      const dr = r - (colorTab[i++] & 0xff);
      const dg = g - (colorTab[i++] & 0xff);
      const db = b - (colorTab[i] & 0xff);
      const d = dr * dr + dg * dg + db * db;
      const index = i / 3;
      if (usedEntry[index] && d < dmin) {
        dmin = d;
        minpos = index;
      }
      i++;
    }
    return minpos;
  };

  /**
   * Extracts image pixels into byte array "pixels
   */

  var getImagePixels = function getImagePixels() {
    const w = width;
    const h = height;
    pixels = [];
    const data = image;
    let count = 0;

    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        const b = i * w * 4 + j * 4;
        pixels[count++] = data[b];
        pixels[count++] = data[b + 1];
        pixels[count++] = data[b + 2];
      }
    }
  };

  /**
   * Writes Graphic Control Extension
   */

  var writeGraphicCtrlExt = function writeGraphicCtrlExt() {
    out.writeByte(0x21); // extension introducer
    out.writeByte(0xf9); // GCE label
    out.writeByte(4); // data block size
    let transp;
    let disp;
    if (transparent === null) {
      transp = 0;
      disp = 0; // dispose = no action
    } else {
      transp = 1;
      disp = 2; // force clear if using transparent color
    }
    if (dispose >= 0) {
      disp = dispose & 7; // user override
    }
    disp <<= 2;
    // packed fields
    out.writeByte(
      0 | // 1:3 reserved
      disp | // 4:6 disposal
      0 | // 7 user input - 0 = none
        transp
    ); // 8 transparency flag

    WriteShort(delay); // delay x 1/100 sec
    out.writeByte(transIndex); // transparent color index
    out.writeByte(0); // block terminator
  };

  /**
   * Writes Comment Extention
   */

  var writeCommentExt = function writeCommentExt() {
    out.writeByte(0x21); // extension introducer
    out.writeByte(0xfe); // comment label
    out.writeByte(comment.length); // Block Size (s)
    out.writeUTFBytes(comment);
    out.writeByte(0); // block terminator
  };

  /**
   * Writes Image Descriptor
   */

  var writeImageDesc = function writeImageDesc() {
    out.writeByte(0x2c); // image separator
    WriteShort(0); // image position x,y = 0,0
    WriteShort(0);
    WriteShort(width); // image size
    WriteShort(height);

    // packed fields
    if (firstFrame) {
      // no LCT - GCT is used for first (or only) frame
      out.writeByte(0);
    } else {
      // specify normal LCT
      out.writeByte(
        0x80 | // 1 local color table 1=yes
        0 | // 2 interlace - 0=no
        0 | // 3 sorted - 0=no
        0 | // 4-5 reserved
          palSize
      ); // 6-8 size of color table
    }
  };

  /**
   * Writes Logical Screen Descriptor
   */

  var writeLSD = function writeLSD() {
    // logical screen size
    WriteShort(width);
    WriteShort(height);
    // packed fields
    out.writeByte(
      0x80 | // 1 : global color table flag = 1 (gct used)
      0x70 | // 2-4 : color resolution = 7
      0x00 | // 5 : gct sort flag = 0
        palSize
    ); // 6-8 : gct size

    out.writeByte(0); // background color index
    out.writeByte(0); // pixel aspect ratio - assume 1:1
  };

  /**
   * Writes Netscape application extension to define repeat count.
   */

  var writeNetscapeExt = function writeNetscapeExt() {
    out.writeByte(0x21); // extension introducer
    out.writeByte(0xff); // app extension label
    out.writeByte(11); // block size
    out.writeUTFBytes('NETSCAPE' + '2.0'); // app id + auth code
    out.writeByte(3); // sub-block size
    out.writeByte(1); // loop sub-block id
    WriteShort(repeat); // loop count (extra iterations, 0=repeat forever)
    out.writeByte(0); // block terminator
  };

  /**
   * Writes color table
   */

  var writePalette = function writePalette() {
    out.writeBytes(colorTab);
    const n = 3 * 256 - colorTab.length;
    for (let i = 0; i < n; i++) out.writeByte(0);
  };

  var WriteShort = function WriteShort(pValue) {
    out.writeByte(pValue & 0xff);
    out.writeByte((pValue >> 8) & 0xff);
  };

  /**
   * Encodes and writes pixel data
   */

  var writePixels = function writePixels() {
    const myencoder = new LZWEncoder(width, height, indexedPixels, colorDepth);
    myencoder.encode(out);
  };

  /**
   * Retrieves the GIF stream
   */

  const stream = (exports.stream = function stream() {
    return out;
  });

  const setProperties = (exports.setProperties = function setProperties(has_start, is_first) {
    started = has_start;
    firstFrame = is_first;
  });

  return exports;
};

export { GIFEncoder };
