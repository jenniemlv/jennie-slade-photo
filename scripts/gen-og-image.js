#!/usr/bin/env node
/**
 * Generates the default OG image placeholder for Jennie Slade Photography.
 * Creates a 1200x630 solid warm-gray (#d4d1cb) PNG at public/images/og-default.png.
 *
 * Run: node scripts/gen-og-image.js
 *
 * Note: Replace with a properly designed OG image using real photography
 * once Cloudinary photos are uploaded. Use getCldOgImageUrl() to generate
 * a proper branded OG image with a real photo as the background.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const WIDTH = 1200;
const HEIGHT = 630;

// Brand color warm-gray: #d4d1cb = rgb(212, 209, 203)
const R = 212, G = 209, B = 203;

// Build raw PNG bytes manually (no external dependencies)
function buildPNG(width, height, r, g, b) {
  // PNG signature
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk: 13 bytes of data
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 2;  // color type: RGB
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = makeChunk('IHDR', ihdrData);

  // IDAT chunk: raw pixel data, one row at a time
  // Each row: filter byte (0 = None) followed by width * 3 bytes of RGB
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const rowStart = y * rowSize;
    rawData[rowStart] = 0; // filter type: None
    for (let x = 0; x < width; x++) {
      const pixelStart = rowStart + 1 + x * 3;
      rawData[pixelStart] = r;
      rawData[pixelStart + 1] = g;
      rawData[pixelStart + 2] = b;
    }
  }
  const compressed = zlib.deflateSync(rawData, { level: 6 });
  const idat = makeChunk('IDAT', compressed);

  // IEND chunk
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBytes = Buffer.from(type, 'ascii');
  const crcInput = Buffer.concat([typeBytes, data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(computeCRC(crcInput), 0);
  return Buffer.concat([len, typeBytes, data, crc]);
}

// CRC-32 implementation
function computeCRC(buf) {
  let crc = 0xFFFFFFFF;
  const table = makeCRCTable();
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeCRCTable() {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}

const outPath = path.join(__dirname, '..', 'public', 'images', 'og-default.png');
const png = buildPNG(WIDTH, HEIGHT, R, G, B);
fs.writeFileSync(outPath, png);
console.log(`Created ${outPath} (${WIDTH}x${HEIGHT} warm-gray #d4d1cb PNG, ${png.length} bytes)`);
