/* eslint-disable import/prefer-default-export */
/* eslint-disable no-continue */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-rest-params */
/* eslint-disable func-names */
/* eslint-disable camelcase */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable no-labels */
/* eslint-disable no-cond-assign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-assign */
/* eslint-disable no-plusplus */
/* eslint-disable no-var */
/* eslint-disable prefer-const */
/**
 * This class handles LZW encoding
 * Adapted from Jef Poskanzer's Java port by way of J. M. G. Elliott.
 * @author Kevin Weiner (original Java version - kweiner@fmsware.com)
 * @author Thibault Imbert (AS3 version - bytearray.org)
 * @author Kevin Kwok (JavaScript version - https://github.com/antimatter15/jsgif)
 * @version 0.1 AS3 implementation
 */

const LZWEncoder = function() {
  let exports = {};
  let EOF = -1;
  let imgW;
  let imgH;
  let pixAry;
  let initCodeSize;
  let remaining;
  let curPixel;

  // GIFCOMPR.C - GIF Image compression routines
  // Lempel-Ziv compression based on 'compress'. GIF modifications by
  // David Rowley (mgardi@watdcsu.waterloo.edu)
  // General DEFINEs

  let BITS = 12;
  let HSIZE = 5003; // 80% occupancy

  // GIF Image compression - modified 'compress'
  // Based on: compress.c - File compression ala IEEE Computer, June 1984.
  // By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  // Jim McKie (decvax!mcvax!jim)
  // Steve Davies (decvax!vax135!petsd!peora!srd)
  // Ken Turkowski (decvax!decwrl!turtlevax!ken)
  // James A. Woods (decvax!ihnp4!ames!jaw)
  // Joe Orost (decvax!vax135!petsd!joe)

  let n_bits; // number of bits/code
  let maxbits = BITS; // user settable max # bits/code
  let maxcode; // maximum code, given n_bits
  let maxmaxcode = 1 << BITS; // should NEVER generate this code
  let htab = [];
  let codetab = [];
  let hsize = HSIZE; // for dynamic table sizing
  let free_ent = 0; // first unused entry

  // block compression parameters -- after all codes are used up,
  // and compression rate changes, start over.

  let clear_flg = false;

  // Algorithm: use open addressing double hashing (no chaining) on the
  // prefix code / next character combination. We do a variant of Knuth's
  // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
  // secondary probe. Here, the modular division first probe is gives way
  // to a faster exclusive-or manipulation. Also do block compression with
  // an adaptive reset, whereby the code table is cleared when the compression
  // ratio decreases, but after the table fills. The variable-length output
  // codes are re-sized at this point, and a special CLEAR code is generated
  // for the decompressor. Late addition: construct the table according to
  // file size for noticeable speed improvement on small files. Please direct
  // questions about this implementation to ames!jaw.

  let g_init_bits;
  let ClearCode;
  let EOFCode;

  // output
  // Output the given code.
  // Inputs:
  // code: A n_bits-bit integer. If == -1, then EOF. This assumes
  // that n_bits =< wordsize - 1.
  // Outputs:
  // Outputs code to the file.
  // Assumptions:
  // Chars are 8 bits long.
  // Algorithm:
  // Maintain a BITS character long buffer (so that 8 codes will
  // fit in it exactly). Use the VAX insv instruction to insert each
  // code in turn. When the buffer fills up empty it and start over.

  let cur_accum = 0;
  let cur_bits = 0;
  let masks = [
    0x0000,
    0x0001,
    0x0003,
    0x0007,
    0x000f,
    0x001f,
    0x003f,
    0x007f,
    0x00ff,
    0x01ff,
    0x03ff,
    0x07ff,
    0x0fff,
    0x1fff,
    0x3fff,
    0x7fff,
    0xffff
  ];

  // Number of characters so far in this 'packet'
  let a_count;

  // Define the storage for the packet accumulator
  let accum = [];

  let LZWEncoder = (exports.LZWEncoder = function LZWEncoder(width, height, pixels, color_depth) {
    imgW = width;
    imgH = height;
    pixAry = pixels;
    initCodeSize = Math.max(2, color_depth);
  });

  // Add a character to the end of the current packet, and if it is 254
  // characters, flush the packet to disk.
  let char_out = function char_out(c, outs) {
    accum[a_count++] = c;
    if (a_count >= 254) flush_char(outs);
  };

  // Clear out the hash table
  // table clear for block compress

  let cl_block = function cl_block(outs) {
    cl_hash(hsize);
    free_ent = ClearCode + 2;
    clear_flg = true;
    output(ClearCode, outs);
  };

  // reset code table
  var cl_hash = function cl_hash(hsize) {
    for (let i = 0; i < hsize; ++i) htab[i] = -1;
  };

  let compress = (exports.compress = function compress(init_bits, outs) {
    let fcode;
    let i; /* = 0 */
    let c;
    let ent;
    let disp;
    let hsize_reg;
    let hshift;

    // Set up the globals: g_init_bits - initial number of bits
    g_init_bits = init_bits;

    // Set up the necessary values
    clear_flg = false;
    n_bits = g_init_bits;
    maxcode = MAXCODE(n_bits);

    ClearCode = 1 << (init_bits - 1);
    EOFCode = ClearCode + 1;
    free_ent = ClearCode + 2;

    a_count = 0; // clear packet

    ent = nextPixel();

    hshift = 0;
    for (fcode = hsize; fcode < 65536; fcode *= 2) ++hshift;
    hshift = 8 - hshift; // set hash code range bound

    hsize_reg = hsize;
    cl_hash(hsize_reg); // clear hash table

    output(ClearCode, outs);

    outer_loop: while ((c = nextPixel()) != EOF) {
      fcode = (c << maxbits) + ent;
      i = (c << hshift) ^ ent; // xor hashing

      if (htab[i] == fcode) {
        ent = codetab[i];
        continue;
      } else if (htab[i] >= 0) {
        // non-empty slot

        disp = hsize_reg - i; // secondary hash (after G. Knott)
        if (i === 0) disp = 1;

        do {
          if ((i -= disp) < 0) i += hsize_reg;

          if (htab[i] == fcode) {
            ent = codetab[i];
            continue outer_loop;
          }
        } while (htab[i] >= 0);
      }

      output(ent, outs);
      ent = c;
      if (free_ent < maxmaxcode) {
        codetab[i] = free_ent++; // code -> hashtable
        htab[i] = fcode;
      } else cl_block(outs);
    }

    // Put out the final code.
    output(ent, outs);
    output(EOFCode, outs);
  });

  // ----------------------------------------------------------------------------
  let encode = (exports.encode = function encode(os) {
    os.writeByte(initCodeSize); // write "initial code size" byte
    remaining = imgW * imgH; // reset navigation variables
    curPixel = 0;
    compress(initCodeSize + 1, os); // compress and write the pixel data
    os.writeByte(0); // write block terminator
  });

  // Flush the packet to disk, and reset the accumulator
  var flush_char = function flush_char(outs) {
    if (a_count > 0) {
      outs.writeByte(a_count);
      outs.writeBytes(accum, 0, a_count);
      a_count = 0;
    }
  };

  var MAXCODE = function MAXCODE(n_bits) {
    return (1 << n_bits) - 1;
  };

  // ----------------------------------------------------------------------------
  // Return the next pixel from the image
  // ----------------------------------------------------------------------------

  var nextPixel = function nextPixel() {
    if (remaining === 0) return EOF;
    --remaining;
    let pix = pixAry[curPixel++];
    return pix & 0xff;
  };

  var output = function output(code, outs) {
    cur_accum &= masks[cur_bits];

    if (cur_bits > 0) cur_accum |= code << cur_bits;
    else cur_accum = code;

    cur_bits += n_bits;

    while (cur_bits >= 8) {
      char_out(cur_accum & 0xff, outs);
      cur_accum >>= 8;
      cur_bits -= 8;
    }

    // If the next entry is going to be too big for the code size,
    // then increase it, if possible.

    if (free_ent > maxcode || clear_flg) {
      if (clear_flg) {
        maxcode = MAXCODE((n_bits = g_init_bits));
        clear_flg = false;
      } else {
        ++n_bits;
        if (n_bits == maxbits) maxcode = maxmaxcode;
        else maxcode = MAXCODE(n_bits);
      }
    }

    if (code == EOFCode) {
      // At EOF, write the rest of the buffer.
      while (cur_bits > 0) {
        char_out(cur_accum & 0xff, outs);
        cur_accum >>= 8;
        cur_bits -= 8;
      }

      flush_char(outs);
    }
  };

  LZWEncoder.apply(this, arguments);
  return exports;
};

export { LZWEncoder };