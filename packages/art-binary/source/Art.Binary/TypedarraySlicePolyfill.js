// Generated by CoffeeScript 1.12.7
(function() {
  var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, bound, genericSlice, ref, ref1;

  bound = require('art-standard-lib').bound;

  (base = Uint8Array.prototype).slice || (base.slice = genericSlice = function(start, end) {
    var i, j, length, out, outIndex, ref, ref1;
    if (end == null) {
      end = this.length;
    }
    if (start < 0) {
      start += this.length;
    }
    if (end < 0) {
      end += this.length;
    }
    start = bound(0, start, this.length);
    end = bound(0, end, this.length);
    out = new Uint8Array(length = end - start);
    outIndex = 0;
    for (i = j = ref = start, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
      out[outIndex++] = this[i];
    }
    return out;
  });

  (base1 = Int8Array.prototype).slice || (base1.slice = genericSlice);

  (base2 = Uint8Array.prototype).slice || (base2.slice = genericSlice);

  (base3 = Int16Array.prototype).slice || (base3.slice = genericSlice);

  (base4 = Uint16Array.prototype).slice || (base4.slice = genericSlice);

  (base5 = Int32Array.prototype).slice || (base5.slice = genericSlice);

  (base6 = Uint32Array.prototype).slice || (base6.slice = genericSlice);

  (base7 = Float32Array.prototype).slice || (base7.slice = genericSlice);

  (base8 = Float64Array.prototype).slice || (base8.slice = genericSlice);

  if ((ref = self.Uint8ClampedArray) != null) {
    (base9 = ref.prototype).slice || (base9.slice = genericSlice);
  }

  if ((ref1 = self.CanvasPixelArray) != null) {
    (base10 = ref1.prototype).slice || (base10.slice = genericSlice);
  }

  (base11 = ArrayBuffer.prototype).slice || (base11.slice = function(start, end) {
    return (new Uint8Array(this)).slice(start, end).buffer;
  });

}).call(this);

//# sourceMappingURL=TypedarraySlicePolyfill.js.map
