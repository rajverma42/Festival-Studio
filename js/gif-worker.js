/* ============================================================================
   Festival Studio — gif-worker.js
   Runs the expensive half of GIF creation (colour quantisation + LZW) off the
   main thread, so the preview keeps animating and the phone stays responsive.
   Frames are painted on the main thread and their pixels transferred here.

   Protocol
     → { type:'init',   width, height, colors, sample }
     → { type:'frame',  buffer:ArrayBuffer(rgba), delay }
     → { type:'finish' }
     ← { type:'frame-done', index }
     ← { type:'done',   buffer:ArrayBuffer(gif) }
     ← { type:'error',  message }
   ========================================================================== */
/* global importScripts, FS */
'use strict';

try {
  importScripts('gif-encoder.js');
} catch (e) {
  self.postMessage({ type: 'error', message: 'GIF encoder could not be loaded in the worker.' });
}

var enc = null;
var count = 0;

self.onmessage = function (e) {
  var m = e.data || {};
  try {
    if (m.type === 'init') {
      enc = new self.FS.GIFEncoder(m.width, m.height, {
        colors: m.colors || 200, sample: m.sample || 2, loop: 0
      });
      count = 0;
      self.postMessage({ type: 'ready' });
      return;
    }
    if (m.type === 'frame') {
      if (!enc) throw new Error('Encoder was not initialised.');
      enc.addFrame(new Uint8ClampedArray(m.buffer), m.delay);
      count++;
      self.postMessage({ type: 'frame-done', index: count });
      return;
    }
    if (m.type === 'finish') {
      if (!enc) throw new Error('Encoder was not initialised.');
      var bytes = enc.bytes();
      /* append the trailer once */
      var out = new Uint8Array(bytes.length + 1);
      out.set(bytes, 0);
      out[bytes.length] = 0x3B;
      enc = null;
      self.postMessage({ type: 'done', buffer: out.buffer }, [out.buffer]);
    }
  } catch (err) {
    self.postMessage({ type: 'error', message: (err && err.message) || 'GIF encoding failed in the worker.' });
  }
};
