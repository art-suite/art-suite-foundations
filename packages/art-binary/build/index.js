module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var BaseObject, Binary, BinaryString, ClassSystem, InspectedObjectLiteral, Promise, StandardLib, Utf8, compactFlatten, encodings, inspect, isFunction, isNode, isPlainArray, isString, log, merge, min, pad, readFileAsArrayBuffer, readFileAsDataUrl,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Binary = __webpack_require__(4);

Utf8 = __webpack_require__(9);

StandardLib = __webpack_require__(0);

ClassSystem = __webpack_require__(2);

merge = StandardLib.merge, isString = StandardLib.isString, isFunction = StandardLib.isFunction, isPlainArray = StandardLib.isPlainArray, log = StandardLib.log, min = StandardLib.min, inspect = StandardLib.inspect, readFileAsDataUrl = StandardLib.readFileAsDataUrl, readFileAsArrayBuffer = StandardLib.readFileAsArrayBuffer, compactFlatten = StandardLib.compactFlatten, pad = StandardLib.pad, InspectedObjectLiteral = StandardLib.InspectedObjectLiteral, Promise = StandardLib.Promise, isNode = StandardLib.isNode;

BaseObject = ClassSystem.BaseObject, inspect = ClassSystem.inspect;

encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

module.exports = BinaryString = (function(superClass) {
  var binary;

  extend(BinaryString, superClass);

  BinaryString.isBinary = function(arg) {
    var ref;
    return arg && ((arg instanceof BinaryString) || arg.constructor === ArrayBuffer || ((ref = arg.buffer) != null ? ref.constructor : void 0) === ArrayBuffer);
  };

  BinaryString.binary = binary = function(arg) {
    if (arg instanceof BinaryString) {
      return arg;
    } else {
      return new BinaryString(arg);
    }
  };

  BinaryString.binaryFromBlob = function(blob) {
    return readFileAsArrayBuffer(blob).then(function(ab) {
      return binary(ab);
    });
  };

  BinaryString.cloneUint8Array = function(srcU8A) {
    var dstU8A;
    dstU8A = new Uint8Array(new ArrayBuffer(src.length));
    dstU8A.set(srcU8A);
    return dstU8A;
  };

  function BinaryString(arg) {
    this.bytes = (function() {
      if (arg == null) {
        return new Uint8Array;
      } else if (arg instanceof BinaryString) {
        return BinaryString.cloneUint8Array(arg.bytes);
      } else if (isFunction(arg != null ? arg.uint8Array : void 0)) {
        return arg.uint8Array();
      } else if (isPlainArray(arg)) {
        return new Uint8Array(arg);
      } else if (arg instanceof ArrayBuffer) {
        return new Uint8Array(arg);
      } else if (arg instanceof Uint8Array) {
        return arg;
      } else if (isString(arg)) {
        return Utf8.toBuffer(arg);
      } else if (isFunction(arg.toString)) {
        return Utf8.toBuffer(arg.toString());
      } else {
        throw new Error("invalid Binary string constructor argument: " + (inspect(arg)));
      }
    })();
    this.length = this.bytes.length;
  }

  BinaryString.prototype.slice = function(a, b) {
    return new BinaryString(this.bytes.slice(a, b));
  };

  BinaryString.fromBase64 = function(base64encoding) {
    var byteString, i, j, len, ref, uint8Array;
    byteString = atob(base64encoding);
    len = byteString.length;
    uint8Array = new Uint8Array(new ArrayBuffer(len));
    for (i = j = 0, ref = len; j < ref; i = j += 1) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new BinaryString(uint8Array);
  };

  BinaryString.prototype.toDataUri = function(mimeType, sync) {
    var v;
    if (isNode) {
      v = "data:" + (mimeType != null ? mimeType : '') + ";base64," + (this.toBase64(true));
      if (sync) {
        return v;
      } else {
        return Promise.resolve(v);
      }
    } else {
      return readFileAsDataUrl(this.toBlob(mimeType));
    }
  };

  BinaryString.fromDataUri = function(dataURI) {
    var base64encoding, splitDataURI;
    splitDataURI = dataURI.split(',');
    base64encoding = splitDataURI[1];
    return this.fromBase64(base64encoding);
  };

  BinaryString.prototype.toString = function() {
    return Utf8.toString(this.bytes);
  };

  BinaryString.prototype.getString = function() {
    return this.toString();
  };

  BinaryString.prototype.toArrayBuffer = function() {
    return this.bytes.buffer;
  };

  BinaryString.prototype.toBlob = function(mimeType) {
    return new Blob([this.bytes], merge({
      type: mimeType
    }));
  };

  BinaryString.prototype.eq = function(b) {
    return this.compare(b) === 0;
  };

  BinaryString.prototype.compare = function(b) {
    var bytesA, bytesB, diff, i, j, ref;
    bytesA = this.bytes;
    bytesB = b.bytes;
    for (i = j = 0, ref = min(this.length, b.length); 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
      if (0 !== (diff = bytesA[i] - bytesB[i])) {
        return diff;
      }
    }
    return this.length - b.length;
  };

  BinaryString.prototype.inspect = function() {
    return this.getInspectedString();
  };

  BinaryString.getter({
    uint8Array: function() {
      return this.bytes;
    },
    arrayBuffer: function() {
      return this.bytes.buffer;
    },
    nodeBuffer: function() {
      return new Buffer(this.bytes);
    },
    blob: function() {
      return new Blob([this.bytes]);
    },
    plainArray: function() {
      var b, j, len1, ref, results;
      ref = this.bytes;
      results = [];
      for (j = 0, len1 = ref.length; j < len1; j++) {
        b = ref[j];
        results.push(b);
      }
      return results;
    },
    byteLength: function() {
      return this.length;
    },
    inspectedObjects: function() {
      var lenStr;
      lenStr = this.length >= 10 * 1024 * 1024 ? (Math.floor(this.length / 1024 * 1024)) + "m" : this.length >= 10 * 1024 ? (Math.floor(this.length / 1024)) + "k" : this.length + "b";
      return new InspectedObjectLiteral("<BinaryString length: " + lenStr + ">");
    },
    inspectedString: function(stride, maxBytes) {
      var characters, count, line, offset;
      if (stride == null) {
        stride = 8;
      }
      if (maxBytes == null) {
        maxBytes = 64;
      }
      count = 0;
      characters = [];
      if (this.length < maxBytes) {
        maxBytes = this.length;
      }
      line = new Array(stride);
      return compactFlatten([
        "BinaryString length: " + this.length + " bytes", maxBytes < this.length ? "First " + maxBytes + " bytes:" : void 0, (function() {
          var j, ref, ref1, results;
          results = [];
          for (offset = j = 0, ref = maxBytes, ref1 = stride; ref1 > 0 ? j < ref : j > ref; offset = j += ref1) {
            results.push(this._inspectLine(offset, stride, maxBytes));
          }
          return results;
        }).call(this)
      ]).join('\n');
    }
  });

  BinaryString.prototype._inspectLine = function(offset, length, maxBytes) {
    var b, characters, end, hexCharacters, i, y;
    end = min(this.length, offset + length);
    if (maxBytes >= 0) {
      end = min(end, maxBytes);
    }
    characters = (function() {
      var j, ref, ref1, results;
      results = [];
      for (i = j = ref = offset, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
        b = this.bytes[i];
        if (b >= 31 && b <= 127) {
          results.push(String.fromCharCode(b));
        } else {
          results.push('•');
        }
      }
      return results;
    }).call(this);
    hexCharacters = (function() {
      var j, ref, ref1, results;
      results = [];
      for (i = j = ref = offset, ref1 = end; ref <= ref1 ? j < ref1 : j > ref1; i = ref <= ref1 ? ++j : --j) {
        b = this.bytes[i];
        y = b.toString(16);
        if (y.length < 2) {
          y = "0" + y;
        }
        results.push(y);
      }
      return results;
    }).call(this);
    return (pad(hexCharacters.join(' '), length * 3)) + " '" + (characters.join('')) + "'";
  };


  /*
  toBase64 performance
  see: http://localhost:8080/webpack-dev-server/perf?grep=BinaryString
  as-of 2016-02-14, the manual string manipulation version is surprisingly the best on average for FF, Chrome and Safari
    For shorter lengths, toBase64Custom is by far the fastest, but
    toBase64ToDataUri starts to be faster at longer lengths.
   */

  BinaryString.prototype.toBase64 = function(sync) {
    var v;
    if (sync == null) {
      sync = false;
    }
    if (isNode) {
      v = new Buffer(this.bytes).toString('base64');
      if (sync) {
        return v;
      } else {
        return Promise.resolve(v);
      }
    } else if (this.length > 16 * 1024) {
      return this.toBase64ToDataUri();
    } else {
      return this.toBase64Custom();
    }
  };

  BinaryString.prototype.toBase64ToDataUri = function() {
    return this.toDataUri().then(function(dataUri) {
      return dataUri.split(',')[1];
    });
  };

  BinaryString.prototype.toBase64Custom = function() {
    var a, b, base64, byteLength, byteRemainder, bytes, c, chunk, d, i, j, mainLength, ref;
    bytes = this.bytes;
    base64 = '';
    byteLength = bytes.byteLength;
    byteRemainder = byteLength % 3;
    mainLength = byteLength - byteRemainder;
    for (i = j = 0, ref = mainLength - 1; j <= ref; i = j += 3) {
      chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
      a = (chunk & 16515072) >> 18;
      b = (chunk & 258048) >> 12;
      c = (chunk & 4032) >> 6;
      d = chunk & 63;
      base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
    }
    return Promise.resolve((function() {
      switch (byteRemainder) {
        case 0:
          return base64;
        case 1:
          chunk = bytes[mainLength];
          a = (chunk & 252) >> 2;
          b = (chunk & 3) << 4;
          return base64 + encodings[a] + encodings[b] + '==';
        case 2:
          chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
          a = (chunk & 64512) >> 10;
          b = (chunk & 1008) >> 4;
          c = (chunk & 15) << 2;
          return base64 + encodings[a] + encodings[b] + encodings[c] + '=';
      }
    })());
  };

  BinaryString.downloadBinaryData = function(filename, binaryData, mimeType) {
    var blob;
    binaryData = binary(binaryData);
    if (global.navigator.msSaveOrOpenBlob != null) {
      blob = binaryData.toBlob(mimeType);
      return window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      return binaryData.toDataUri(mimeType).then(function(uri) {
        var e;
        e = document.createElement('a');
        e.setAttribute('href', uri);
        e.setAttribute('download', filename);
        document.body.appendChild(e);
        e.click();
        return document.body.removeChild(e);
      });
    }
  };

  return BinaryString;

})(BaseObject);


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var BinaryString, File, Promise, StandardLib;

StandardLib = __webpack_require__(0);

Promise = StandardLib.Promise;

BinaryString = __webpack_require__(1);

module.exports = File = (function() {
  var readAsArrayBuffer;

  function File() {}

  File._readWithPromise = function(readFunction) {
    return function(file) {
      return new Promise(function(resolve, reject) {
        var fr;
        fr = new FileReader;
        fr[readFunction](file);
        fr.onerror = reject;
        return fr.onload = (function(_this) {
          return function(event) {
            return resolve(event.target.result);
          };
        })(this);
      });
    };
  };

  File.readAsArrayBuffer = readAsArrayBuffer = File._readWithPromise("readAsArrayBuffer");

  File.readAsDataURL = File._readWithPromise("readAsDataURL");

  File.readAsBinaryString = function(file) {
    return readAsArrayBuffer(file).then(function(arrayBuffer) {
      return new BinaryString(arrayBuffer);
    });
  };

  return File;

})();


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Binary,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(5)).addNamespace('Art.Binary', Binary = (function(superClass) {
  extend(Binary, superClass);

  function Binary() {
    return Binary.__super__.constructor.apply(this, arguments);
  }

  Binary.version = __webpack_require__(25).version;

  return Binary;

})(Neptune.PackageNamespace));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var DataUri, Promise, StandardLib, binary, isString, readAsDataURL;

StandardLib = __webpack_require__(0);

binary = __webpack_require__(1).binary;

readAsDataURL = __webpack_require__(3).readAsDataURL;

Promise = StandardLib.Promise, isString = StandardLib.isString;

module.exports = DataUri = (function() {
  var isDataUri;

  function DataUri() {}

  DataUri.isDataUri = isDataUri = function(dataString) {
    return isString(dataString) && dataString.slice(0, 5) === "data:";
  };


  /*
  IN: data can be any of
    File: HTML File object is read as ArrayBuffer
    DataURI string: if it is already a data-uri string it is just returned as a successful promise
    any type 'binary' accepts
  
  OUT:
    promise.then (dataUri) ->
    , (errorEventOrErrorObject) ->
   */

  DataUri.toDataUri = function(data, mimeType) {
    if (mimeType == null) {
      mimeType = 'image/png';
    }
    if (!data) {
      throw new Error("data not set");
    }
    if (global.File && data instanceof global.File) {
      return readAsDataURL(data);
    }
    if (isDataUri(data)) {
      return Promise.resolve(data);
    }
    return binary(data).toBase64().then(function(base64) {
      return "data:" + mimeType + ";base64," + base64;
    });
  };

  return DataUri;

})();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var BaseObject, Binary, ClassSystem, Stream, binary,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

ClassSystem = __webpack_require__(2);

Binary = __webpack_require__(4);

BaseObject = ClassSystem.BaseObject;

binary = __webpack_require__(1).binary;

module.exports = Stream = (function(superClass) {
  extend(Stream, superClass);

  Stream.stream = function(arg) {
    if (arg instanceof Stream) {
      return arg;
    } else if (arg instanceof ArrayBuffer) {
      return Stream.fromArrayBuffer(arg);
    } else if (arg instanceof Uint8Array) {
      return new Stream(arg);
    } else {
      return new Stream(binary(arg).bytes);
    }
  };

  Stream.fromArrayBuffer = function(arrayBuffer) {
    return new Stream(new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength));
  };

  function Stream(byteView) {
    this.byteView = byteView;
    this.pos = 0;
  }

  Stream.prototype.readByte = function() {
    return this.byteView[this.pos++];
  };

  Stream.prototype.readAsi = function() {
    var ret, shift, val;
    ret = 0;
    shift = 0;
    val = 128;
    while (val >= 128) {
      val = this.readByte();
      ret += (val % 128) << shift;
      shift += 7;
    }
    return ret;
  };

  Stream.prototype.uint8Array = function() {
    return this.byteView;
  };

  Stream.prototype.read = function(length) {
    var begin, end;
    begin = this.pos;
    this.pos += length;
    end = this.pos;
    return new Stream(this.byteView.subarray(begin, end));
  };

  Stream.prototype.inspect = function() {
    return "{Stream pos=" + this.pos + " byteOffset=" + this.byteView.byteOffset + " length=" + this.byteView.length + "}";
  };

  Stream.prototype.readAsiString = function() {
    return this.read(this.readAsi());
  };

  Stream.prototype.done = function() {
    return this.pos >= this.byteView.length;
  };

  Stream.getter({
    isDone: function() {
      return this.pos >= this.byteView.length;
    },
    binaryString: function() {
      return binary(this.byteView);
    },
    inspectedString: function() {
      return this.binaryString.inspectedString;
    }
  });

  Stream.prototype.toString = function() {
    return this.binaryString.toString();
  };

  return Stream;

})(BaseObject);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var base, base1, base10, base11, base2, base3, base4, base5, base6, base7, base8, base9, bound, genericSlice, ref, ref1;

bound = __webpack_require__(0).bound;

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


/***/ }),
/* 9 */
/***/ (function(module, exports) {

var Utf8;

module.exports = Utf8 = (function() {
  function Utf8() {}

  Utf8.toBuffer = function(string) {
    return new Uint8Array(this.toArray(string));
  };

  Utf8.toArray = function(string) {
    var char, i, out, uriEncoded;
    uriEncoded = encodeURIComponent(string);
    i = 0;
    out = (function() {
      var results;
      results = [];
      while (i < uriEncoded.length) {
        char = uriEncoded.charCodeAt(i++);
        if (char === 0x25) {
          i += 2;
          results.push(parseInt(uriEncoded.substr(i - 2, 2), 16));
        } else {
          results.push(char);
        }
      }
      return results;
    })();
    return out;
  };

  Utf8.toString = function(a) {
    var error, x, y;
    if (a === void 0) {
      return "<undefined>";
    }
    if (a === null) {
      return "<null>";
    }
    try {
      if (a instanceof ArrayBuffer) {
        a = new Uint8Array(a);
      }
      return decodeURIComponent(((function() {
        var j, len, results;
        results = [];
        for (j = 0, len = a.length; j < len; j++) {
          x = a[j];
          y = x.toString(16);
          if (y.length < 2) {
            y = "0" + y;
          }
          y = "%" + y;
          results.push(y);
        }
        return results;
      })()).join(''));
    } catch (error1) {
      error = error1;
      console.warn(error.toString(), error);
      return "<" + a.length + " binary bytes>";
    }
  };

  return Utf8;

})();


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var CommunicationStatus,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(19)).addNamespace('CommunicationStatus', CommunicationStatus = (function(superClass) {
  extend(CommunicationStatus, superClass);

  function CommunicationStatus() {
    return CommunicationStatus.__super__.constructor.apply(this, arguments);
  }

  CommunicationStatus.version = __webpack_require__(26).version;

  return CommunicationStatus;

})(Neptune.PackageNamespace));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

module.exports.includeInNamespace(__webpack_require__(13)).addModules({
  BinaryString: __webpack_require__(1),
  DataUri: __webpack_require__(6),
  EncodedImage: __webpack_require__(14),
  File: __webpack_require__(3),
  Stream: __webpack_require__(7),
  TypedarraySlicePolyfill: __webpack_require__(8),
  Utf8: __webpack_require__(9),
  WriteStream: __webpack_require__(15)
});


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(8);

module.exports = [
  __webpack_require__(3), {
    stream: (__webpack_require__(7)).stream
  }, [__webpack_require__(1), "binary binaryFromBlob downloadBinaryData"]
];


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var EncodedImage, ErrorWithInfo, HTMLImageElement, Image, Promise, StandardLib, binary, escapeRegExp, isBinary, isNode, isObject, isString, log, readFileAsDataUrl, ref, sameOrigin, toDataUri;

StandardLib = __webpack_require__(0);

toDataUri = __webpack_require__(6).toDataUri;

isNode = StandardLib.isNode, log = StandardLib.log, Promise = StandardLib.Promise, readFileAsDataUrl = StandardLib.readFileAsDataUrl, ErrorWithInfo = StandardLib.ErrorWithInfo, isString = StandardLib.isString, escapeRegExp = StandardLib.escapeRegExp, isObject = StandardLib.isObject, sameOrigin = StandardLib.sameOrigin;

ref = __webpack_require__(1), isBinary = ref.isBinary, binary = ref.binary;

__webpack_require__(20);

if (!global.Image) {
  try {
    global.HTMLImageElement = global.Image = (global.HTMLCanvasElement = eval('require')("canvas")).Image;
  } catch (error) {}
}

Image = global.Image, HTMLImageElement = global.HTMLImageElement;

module.exports = EncodedImage = (function() {
  var get;

  function EncodedImage() {}


  /*
  IN:
    first arg:
      String: url
      or
      Binary: image data
      or
      HTMLImageElement
  
    second arg:
      options: (object)
        options for RestClient.getArrayBuffer
        NOTE: if options is provided, image-data is fetched using
          RestClient.getArrayBuffer
        This seems to work to endrun TAINT.
  
      crossOrigin: true/false/null/undefined
        false: DO NOT make crossorigin request
        null/undefined: AUTO
          crossOrigin is set to 'anonymous' if the request is indeed cross-origin
        true: crossOrigin is always set to 'anonymous'
  
    CORS/TAINT
      To avoid taint, either set the second option to {} or true.
      AND - make sure the server is returning the correct headers.
  
  OUT:
    promise.then (fullyLoadedHtmlImage) ->
    , (htmlImageOnerrorEvent) ->
  
  
  CORS NOTES
    crossOrigin = "Anonymous" required to getImageData and avoid this error
      "The canvas has been tainted by cross-origin data."
  
    performance???
      I don't think there is a performance hit for making the crossOrigin request.
      - SBD March-2018
  
    crossOrigin should only be set for HTTP requests - since it can only be
    fulfilled with HTTP response headers. Some browsers (safari) get cranky
    if you use it with file or data URIs:
  
      file: urls break with crossOrigin in WkWebKit
      data: urls break with crossOrigin in Safari
   */

  EncodedImage.get = get = function(source, b) {
    var complete, crossOrigin, image, naturalWidth, options;
    if (isObject(b)) {
      options = b;
    } else {
      crossOrigin = b != null ? !!b : void 0;
    }
    if (source == null) {
      return Promise.reject();
    }
    if (source.constructor === HTMLImageElement || source.constructor === Image) {
      image = source;
      complete = source.complete, naturalWidth = source.naturalWidth;
      return new Promise(function(resolve, reject) {
        if (complete && (naturalWidth > 0 || isNode)) {
          return resolve(source);
        } else {
          image.onload = function() {
            return resolve(image);
          };
          return image.onerror = function(event) {
            return reject(new ErrorWithInfo("image load error", event));
          };
        }
      });
    } else {
      return Promise.then(function() {
        if (isBinary(source)) {
          if (Neptune.isNode) {
            return binary(source).nodeBuffer;
          } else {
            return toDataUri(source);
          }
        } else if (isString(source)) {
          if (isObject(options)) {
            return Neptune.Art.RestClient.getArrayBuffer(source, options).then(function(arrayBuffer) {
              return readFileAsDataUrl(new Blob([arrayBuffer]));
            });
          } else {
            return source;
          }
        } else {
          throw new Error("expected arg #1 to be string or binary");
        }
      }).then(function(url) {
        image = new Image;
        if (!isNode) {
          if (crossOrigin != null ? crossOrigin : !sameOrigin(url) && /^https?:/i.test(url)) {
            image.crossOrigin = "anonymous";
          }
        }
        image.src = url;
        return get(image);
      });
    }
  };

  EncodedImage.toImage = function(encodedImageData) {
    return toDataUri(encodedImageData).then((function(_this) {
      return function(dataUri) {
        return get(dataUri);
      };
    })(this));
  };

  return EncodedImage;

})();


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var BaseObject, ClassSystem, Promise, StandardLib, WriteStream, binary, bound, bufferSize, log, readFileAsArrayBuffer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StandardLib = __webpack_require__(0);

ClassSystem = __webpack_require__(2);

binary = __webpack_require__(1).binary;

Promise = StandardLib.Promise, readFileAsArrayBuffer = StandardLib.readFileAsArrayBuffer, bound = StandardLib.bound;

BaseObject = ClassSystem.BaseObject, log = ClassSystem.log;

bufferSize = 1024;

module.exports = WriteStream = (function(superClass) {
  extend(WriteStream, superClass);

  function WriteStream() {
    this._written = [];
    this._writeBuffer = new Uint8Array(bufferSize);
    this._pos = 0;
    this._writtenLength = 0;
  }

  WriteStream.prototype.writeByte = function(byte) {
    if (this._pos === bufferSize) {
      this._commitHead();
    }
    return this._writeBuffer[this._pos++] = byte;
  };

  WriteStream.prototype.writeAsi = function(number) {
    var nextByte, results;
    if (!(number >= 0)) {
      throw new Error("expected number >= 0");
    }
    results = [];
    while (true) {
      nextByte = number & 0x7F;
      number >>= 7;
      if (number > 0) {
        results.push(this.writeByte(nextByte | 0x80));
      } else {
        this.writeByte(nextByte);
        break;
      }
    }
    return results;
  };

  WriteStream.prototype.write = function(string) {
    var binaryString;
    binaryString = binary(string);
    if (this._pos + binaryString.length <= bufferSize) {
      this._writeBuffer.set(binaryString.uint8Array, this._pos);
      return this._pos += binaryString.length;
    } else {
      this._commitHead();
      this._writtenLength += binaryString.length;
      return this._written.push(binaryString.uint8Array);
    }
  };

  WriteStream.prototype.writeAsiString = function(string) {
    var binaryString;
    binaryString = binary(string);
    this.writeAsi(binaryString.length);
    return this.write(binaryString);
  };

  WriteStream.getter({
    arrayBufferPromise: function() {
      return this._compact().then(function(uint8Array) {
        return uint8Array.buffer;
      });
    },
    binaryStringPromise: function() {
      return this.arrayBufferPromise.then(function(ab) {
        return binary(ab);
      });
    },
    length: function() {
      return this._pos + this._writtenLength;
    }
  });


  /*
  Using new Blob is much faster, thus we use Promises since it is async
    http://jsperf.com/appending-arraybuffers
  
  OUT: promise.then (compactedUint8Array) ->
  EFFECT:
    head was committed
    if @_written.length <= 1 then it isn't changed
    else @_written = [compactedUint8Array]
   */

  WriteStream.prototype._compact = function() {
    this._commitHead();
    switch (this._written.length) {
      case 0:
        return new Promise(function(resolve) {
          return resolve(new Uint8Array(0));
        });
      case 1:
        return new Promise((function(_this) {
          return function(resolve) {
            return resolve(_this._written[0]);
          };
        })(this));
      default:
        return readFileAsArrayBuffer(new Blob(this._written)).then((function(_this) {
          return function(ab) {
            _this._written = [new Uint8Array(ab)];
            return _this._written[0];
          };
        })(this));
    }
  };

  WriteStream.prototype._commitHead = function() {
    if (!(this._pos > 0)) {
      return;
    }
    this._writtenLength += this._pos;
    this._written.push(this._writeBuffer.slice(0, this._pos));
    return this._pos = 0;
  };

  return WriteStream;

})(BaseObject);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? ref1.CommunicationStatus : void 0 : void 0) != null ? ref : __webpack_require__(18);


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var CommunicationStatus;

module.exports = CommunicationStatus = (function() {
  var communicationStatuses, k, ref, v;

  function CommunicationStatus() {}

  CommunicationStatus.communicationStatuses = communicationStatuses = {

    /*
    status: success
    
    * An unqualified success.
    * I guess it could be qualified, with additional information in another field,
      but the 'expected' data should be present.
     */
    success: {
      httpStatus: 200

      /*
      status: missing
      
      * The request was properly formatted.
      * There were no network errors.
      * There were no server errors.
      * The only problem is the server could not find the requested resource.
       */
    },
    missing: {
      httpStatus: 404,
      failure: true

      /*
      status: clientFailure
      
      * The server rejected the request.
      * There is something wrong with the client's request.
      * It's up to the client to fix the problem.
      * This includes mal-formed requests as well as invalid data.
      * all 4xx errors except 404
      NOTE: 404 is not necessarilly a client NOR server error, therefor it's status: missing
       */
    },
    clientFailure: {
      httpStatus: 400,
      clientFailure: true,
      failure: true

      /*
      status: notAuthorized
      
      * The resource exists, but the client is not allowed to access it.
      
      This is a form of clientFailure because the client could possibly change
      something in the request to make it work.
       */
    },
    clientFailureNotAuthorized: {
      httpStatus: 403,
      clientFailure: true,
      failure: true

      /*
      status: serverFailure
      
      * There is something broken on the server.
      * There is nothing the client can do to solve this problem.
      
      SBD: Possble rename to 'internalFailure': Reason: so it also makes sense for local library calls.
        If something is failing in a local library, serverFailure makes less sense.
        Then again, local libraries pretty-much don't need communicationStatus at all - they
        can use 'throw' or 'promise.reject'
       */
    },
    serverFailure: {
      httpStatus: 500,
      failure: true,
      serverFailure: true

      /*
      status: networkFailure
      
      * The remote-server could not be reached.
      * There is nothing the code running on the Client NOR Server can do to fix this.
      * There is something wrong with the network between the client computer and the server.
      * The client can attempt to retry at a later time and it might magically work.
      * The client-side-humans or server-side-humans can attempt to fix the network.
      * The failure may be one of the following:
        a) the local computer has no internet connection OR
        b) the internet is in a shitstorm ;) OR
        c) there is an network problem within the Servers' facility.
       */
    },
    networkFailure: {
      failure: true

      /*
      status: aborted
      
      * the request was aborted, AS REQUESTED BY THE CLIENT
       */
    },
    aborted: {
      failure: true

      /*
      status: pending
      
      * The request is proceeding.
      * No errors so far.
       */
    },
    pending: {},

    /*
    status: failure
    
    Use when the same code is used clientSide and serverSide.
    
    Server code should convert :failure into :serverFailure when sending
    a failing reply to a client.
     */
    failure: {
      httpStatus: 500,
      failure: true
    }
  };

  ref = CommunicationStatus.communicationStatuses;
  for (k in ref) {
    v = ref[k];
    CommunicationStatus[k] = k;
  }

  CommunicationStatus.isClientFailure = function(status) {
    var ref1;
    return !!((ref1 = communicationStatuses[status]) != null ? ref1.clientFailure : void 0);
  };

  CommunicationStatus.isServerFailure = function(status) {
    var ref1;
    return !!((ref1 = communicationStatuses[status]) != null ? ref1.serverFailure : void 0);
  };

  CommunicationStatus.isFailure = function(status) {
    var ref1;
    return !!((ref1 = communicationStatuses[status]) != null ? ref1.failure : void 0);
  };

  CommunicationStatus.isSuccess = function(status) {
    return status === "success";
  };


  /*
  OUT: true if status is a valid status-string
   */

  CommunicationStatus.validStatus = function(status) {
    return CommunicationStatus[status] === status;
  };

  CommunicationStatus.decodeHttpStatus = function(httpStatus) {
    var status;
    if (httpStatus == null) {
      return {
        status: CommunicationStatus.networkFailure,
        message: "network failure"
      };
    }
    status = (function() {
      switch (httpStatus / 100 | 0) {
        case 2:
          return this.success;
        case 3:
          return this.missing;
        case 4:
          switch (httpStatus) {
            case 403:
              return this.clientFailureNotAuthorized;
            case 404:
              return this.missing;
            default:
              return this.clientFailure;
          }
          break;
        case 5:
          switch (httpStatus) {
            case 502:
            case 503:
            case 504:
              return this.networkFailure;
            case 501:
            case 505:
            case 530:
              return this.clientFailure;
            case 500:
              return this.serverFailure;
          }
      }
    }).call(CommunicationStatus);
    if (status == null) {
      throw new Error("unhandled httpStatus: " + httpStatus);
    }
    return {
      status: status,
      httpStatus: httpStatus,
      message: status + " (" + httpStatus + ")"
    };
  };

  CommunicationStatus.encodeHttpStatus = function(status) {
    var httpStatus, ref1;
    if (!(httpStatus = (ref1 = CommunicationStatus.communicationStatuses[status]) != null ? ref1.httpStatus : void 0)) {
      throw new Error("There is no valid HttpStatus for " + status + ".");
    }
    return httpStatus;
  };

  return CommunicationStatus;

})();


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);

module.exports.includeInNamespace(__webpack_require__(17));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(5)).vivifySubnamespace('Art');

__webpack_require__(10);


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ }),
/* 21 */
/***/ (function(module, exports) {




/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, Promise, RequestError, RestClient, StandardLib, aborted, appendQuery, capitalizedDashCase, decodeHttpStatus, each, failureTypes, formattedInspect, isNumber, log, merge, networkFailure, object, objectKeyCount, objectWithout, present, ref, ref1, serverFailure, success, timeout, w,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StandardLib = __webpack_require__(0);

ref = __webpack_require__(0), objectWithout = ref.objectWithout, formattedInspect = ref.formattedInspect, present = ref.present, Promise = ref.Promise, merge = ref.merge, isNumber = ref.isNumber, timeout = ref.timeout, log = ref.log, objectKeyCount = ref.objectKeyCount, appendQuery = ref.appendQuery, object = ref.object, RequestError = ref.RequestError, object = ref.object, w = ref.w, capitalizedDashCase = ref.capitalizedDashCase, each = ref.each;

ref1 = __webpack_require__(16), networkFailure = ref1.networkFailure, success = ref1.success, serverFailure = ref1.serverFailure, aborted = ref1.aborted, failureTypes = ref1.failureTypes, decodeHttpStatus = ref1.decodeHttpStatus;

BaseClass = __webpack_require__(2).BaseClass;

__webpack_require__(21);

module.exports = RestClient = (function(superClass) {
  var legalVerbs, normalizeHeaders;

  extend(RestClient, superClass);

  function RestClient() {
    return RestClient.__super__.constructor.apply(this, arguments);
  }

  RestClient.singletonClass();

  RestClient.RestClientClass = RestClient;

  RestClient.legalVerbs = legalVerbs = {};

  each(w("get put post delete head"), function(v) {
    var upper;
    upper = v.toUpperCase();
    return legalVerbs[v.toLowerCase()] = legalVerbs[upper] = upper;
  });

  RestClient.get = function(url, options) {
    return RestClient.singleton.get(url, options);
  };

  RestClient.put = function(url, data, options) {
    return RestClient.singleton.put(url, data, options);
  };

  RestClient.post = function(url, data, options) {
    return RestClient.singleton.post(url, data, options);
  };

  RestClient["delete"] = function(url, options) {
    return RestClient.singleton["delete"](url, options);
  };

  RestClient.getArrayBuffer = function(url, options) {
    return RestClient.singleton.getArrayBuffer(url, options);
  };

  RestClient.getJson = function(url, options) {
    return RestClient.singleton.getJson(url, options);
  };

  RestClient.deleteJson = function(url, options) {
    return RestClient.singleton.deleteJson(url, options);
  };

  RestClient.putJson = function(url, data, options) {
    return RestClient.singleton.putJson(url, data, options);
  };

  RestClient.postJson = function(url, data, options) {
    return RestClient.singleton.postJson(url, data, options);
  };

  RestClient.restRequest = function(options) {
    return RestClient.singleton.restRequest(options);
  };

  RestClient.restJsonRequest = function(options) {
    return RestClient.singleton.restJsonRequest(options);
  };


  /*
  get/put/post/delete
  
  IN:
    url: valid url string
  
    data: (only on PUT/POST requests)
      data to send
      NOTE: must be null if using formData
  
    options:
  
      formData: plain object of key-value pairs to submit as form-data
        You can even use this for "get" requests.
        NOTE: "data" must be null if using "formData"
  
      headers: plain object of additional HTTP headers to set
  
      onProgress: (restRequestStatus) -> null
        called each time progress is made
        NOTE: restRequestStatus.progress contains a 0-to-1 number that indicates how much progress has been made.
          progress indicates DOWNLOAD progress for GET requests and UPLOAD progress for all others.
  
      responseType: "arraybuffer", "blob", "document", "json", or "text"
        default: "text"
        NOTE: "json" is handled manually since IE11 and iOS7 don't support the "json" option.
        https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType
  
  OUT: Promise:
    resolved: (responseData) ->
    rejected: (restRequestStatus) ->
  
  responseData:
    a String, or the type specified by the responseType option
  
  restRequestStatus:
    event:    # the HTML event object
    request:  # the XMLHttpRequest
    options:  # the restRequest options: verb, url, data, headers, onProgress, responseType, formData
    httpStatus:   # the HTML status code, if the request completed
    response: # responseData
    status:       a valid CommunicationStatus
    error:    # Error object or string-explaination of why the request was rejected
    progress:
      a value between 0 and 1
      If the progress is indeterminant, this is 0
      If this isn't an onProgress event, this is the amount of progress
      that was made up to the point of the event.
   */

  RestClient.prototype.get = function(url, options) {
    return this.restRequest(merge(options, {
      verb: "GET",
      url: url
    }));
  };

  RestClient.prototype.put = function(url, data, options) {
    return this.restRequest(merge(options, {
      verb: "PUT",
      url: url,
      data: data
    }));
  };

  RestClient.prototype.post = function(url, data, options) {
    return this.restRequest(merge(options, {
      verb: "POST",
      url: url,
      data: data
    }));
  };

  RestClient.prototype["delete"] = function(url, options) {
    return this.restRequest(merge(options, {
      verb: "DELETE",
      url: url
    }));
  };

  RestClient.prototype.getArrayBuffer = function(url, options) {
    return this.restRequest(merge(options, {
      verb: "GET",
      url: url,
      responseType: "arraybuffer"
    }));
  };


  /*
  get/put/post/deleteJson
  
  same as get/put/post/delete above
  
  except:
    sent data should be plain objects which are JSON.stringified
    response data is automatically JSON.parsed
  
    additional options are set:
      responseType: "json"
      headers:      Accept: 'application/json'
   */

  RestClient.prototype.getJson = function(url, options) {
    return this.restJsonRequest(merge(options, {
      verb: "get",
      url: url
    }));
  };

  RestClient.prototype.deleteJson = function(url, options) {
    return this.restJsonRequest(merge(options, {
      verb: "delete",
      url: url
    }));
  };

  RestClient.prototype.putJson = function(url, data, options) {
    return this.restJsonRequest(merge(options, {
      verb: "put",
      url: url,
      data: data
    }));
  };

  RestClient.prototype.postJson = function(url, data, options) {
    return this.restJsonRequest(merge(options, {
      verb: "post",
      url: url,
      data: data
    }));
  };


  /*
  IN:
    options:
      verb: "GET", "PUT", "POST"
      method: alias for verb
  
      data: data to restRequest - passed to xmlHttpRequest.restRequest
      body: alias for data
  
      plus all the options for get/put/post listed above
      showProgressAfter: milliseconds (default: 100)
        only show progress after # milliseconds
  
      onProgress: (requestStatus) ->
        see "All callbacks" below for details about inputs.
        Note that onProgress is triggered a little differently than
        the normal XMLHttpRequest progress events:
          - it will only be called after showProgressAfter ms
          - it is guaranteed to be called after showProgressAfter ms if the request hasn't completed
          - if the request completes before showProgressAfter ms, it will never be called
  
  OUT: see get/put/post above
  
  All callbacks look like this: (requestStatus) ->
    requestStatus:
      request:  XMLHttpRequest
      progress: number # between 0 and 1
      options:  options # passed-in options object
      event:    the most recent event
      response: # the processed response data, if ready
      error:    # if any
      httpStatus:   number # HTTP status code, if the request is complete
  
  EFFECT:
   */

  RestClient.prototype.restRequest = function(options) {
    var body, data, formData, headers, k, method, onProgress, query, responseType, showProgressAfter, specifiedVerb, url, v, verb, verbose;
    verb = options.verb, verbose = options.verbose, method = options.method, url = options.url, data = options.data, body = options.body, query = options.query, headers = options.headers, onProgress = options.onProgress, responseType = options.responseType, formData = options.formData, showProgressAfter = options.showProgressAfter;
    if (!isNumber(showProgressAfter)) {
      showProgressAfter = 100;
    }
    method || (method = verb);
    body || (body = data);
    if (!(method = RestClient.legalVerbs[specifiedVerb = method])) {
      throw new Error("invalid method: " + specifiedVerb);
    }
    if (formData) {
      if (body) {
        throw new Error("can't specify both 'body' and 'formData'");
      }
      body = new FormData;
      for (k in formData) {
        v = formData[k];
        body.append(k, v);
      }
    } else {
      body = (body != null ? typeof body.toArrayBuffer === "function" ? body.toArrayBuffer() : void 0 : void 0) || body;
    }
    if (method === "GET" && body) {
      log.error({
        RestClient_restRequest: {
          info: "can't GET with body",
          options: options
        }
      });
      throw new Error("With their ultimate wisdom, the gods decree: NO DATA WITH GET");
    }
    if (query) {
      url = appendQuery(url, query);
    }
    return this._normalizedRestRequest({
      verbose: verbose,
      method: method,
      url: url,
      body: body,
      onProgress: onProgress,
      responseType: responseType,
      showProgressAfter: showProgressAfter,
      headers: normalizeHeaders(headers)
    });
  };

  RestClient.normalizeHeaders = normalizeHeaders = function(headers) {
    return object(headers, {
      key: function(v, k) {
        return capitalizedDashCase(k);
      }
    });
  };

  RestClient.prototype.restJsonRequest = function(options) {
    var data, headers, method, verb;
    verb = options.verb, method = options.method, data = options.data, headers = options.headers;
    verb = RestClient.legalVerbs[verb || method];
    if (data && objectKeyCount(data) === 0) {
      data = null;
    }
    if (verb === "GET" && options.data) {
      options = merge(options, {
        url: appendQuery(options.url, object(data, function(v) {
          return JSON.stringify(v);
        }))
      });
      data = null;
    } else {
      data && (data = JSON.stringify(data));
    }
    return this.restRequest(merge(options, {
      responseType: "json",
      headers: merge({
        Accept: 'application/json',
        "Content-Type": 'application/json'
      }, headers),
      data: data
    }));
  };

  RestClient.prototype._normalizedRestRequest = function(options) {
    var body, headers, method, onProgress, responseType, showProgressAfter, url, verbose;
    method = options.method, url = options.url, body = options.body, headers = options.headers, onProgress = options.onProgress, responseType = options.responseType, showProgressAfter = options.showProgressAfter, verbose = options.verbose;
    return new Promise(function(resolve, reject) {
      var fail, getErrorResponse, getResponse, initialProgressCalled, k, lastProgressEvent, progressCallbackInternal, request, requestResolved, restRequestStatus, v;
      fail = function(props) {
        return reject(new RequestError(merge(props, {
          sourceLib: "ArtRestClient",
          body: body,
          headers: headers,
          responseType: responseType,
          key: url,
          type: method,
          responseUrl: request.responseURL,
          progress: restRequestStatus.progress
        })));
      };
      restRequestStatus = {
        request: request = new XMLHttpRequest,
        progress: 0,
        options: options,
        abort: function() {
          request.abort();
          return fail({
            status: aborted,
            message: "XMLHttpRequest aborted"
          });
        }
      };
      getErrorResponse = function() {
        var error;
        try {
          return getResponse();
        } catch (error1) {
          error = error1;
          return {
            status: serverFailure,
            rawResponse: request.response,
            message: "ArtRestClient: Error parsing server's response: " + error + "\nrawResponse: " + request.response
          };
        }
      };
      getResponse = function() {
        var response;
        response = request.response;
        if (response && responseType === "json") {
          return JSON.parse(response);
        } else {
          return response;
        }
      };
      request.open(method, url, true);
      if (present(responseType) && responseType !== "json") {
        request.responseType = responseType;
      }
      if (headers) {
        for (k in headers) {
          v = headers[k];
          request.setRequestHeader(k, v);
        }
      }
      requestResolved = false;
      request.addEventListener("error", function(event) {
        requestResolved = true;
        return fail({
          status: networkFailure,
          message: "XMLHttpRequest error event triggered",
          data: {
            event: event
          }
        });
      });
      request.addEventListener("load", function(event) {
        var decodedHttpStatus, httpStatus, message;
        requestResolved = true;
        decodedHttpStatus = decodeHttpStatus(httpStatus = request.status);
        if (!((decodedHttpStatus.status === success) && ((function() {
          try {
            resolve(getResponse());
            return true;
          } catch (error1) {}
        })()))) {
          message = decodedHttpStatus.status === success ? (decodedHttpStatus.status = serverFailure, "error processing successful response") : void 0;
          return fail(merge(decodedHttpStatus, {
            message: message,
            event: event,
            data: getErrorResponse()
          }));
        }
      });
      if (onProgress) {
        initialProgressCalled = showProgressAfter <= 0;
        lastProgressEvent = null;
        timeout(showProgressAfter, function() {
          initialProgressCalled = true;
          return progressCallbackInternal(lastProgressEvent || {});
        });
        progressCallbackInternal = function(event) {
          var loaded, ref2, total;
          ref2 = lastProgressEvent = event, total = ref2.total, loaded = ref2.loaded;
          if (initialProgressCalled && !requestResolved) {
            return typeof onProgress === "function" ? onProgress(restRequestStatus = merge(restRequestStatus, {
              event: event,
              progress: total > 0 ? loaded / total : 0
            })) : void 0;
          }
        };
        if (method === "GET") {
          request.addEventListener("progress", progressCallbackInternal);
        } else {
          request.upload.addEventListener("progress", progressCallbackInternal);
        }
      }
      if (verbose) {
        log("ArtRestClient: " + method + " " + url);
      }
      return request.send(body);
    });
  };

  return RestClient;

})(BaseClass);


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(24);

module.exports.includeInNamespace(__webpack_require__(22));


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var RestClient,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(5)).addNamespace('Art.RestClient', RestClient = (function(superClass) {
  extend(RestClient, superClass);

  function RestClient() {
    return RestClient.__super__.constructor.apply(this, arguments);
  }

  RestClient.version = __webpack_require__(27).version;

  return RestClient;

})(Neptune.PackageNamespace));


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-class-system":"*","art-config":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.0","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.2","chai":"^4.0.1","coffee-loader":"^0.7.3","coffee-script":"^1.12.6","colors":"^1.2.1","commander":"^2.15.1","css-loader":"^0.28.4","dateformat":"^3.0.3","detect-node":"^2.0.3","fs-extra":"^5.0.0","glob":"^7.1.2","glob-promise":"^3.4.0","json-loader":"^0.5.4","mocha":"^3.4.2","neptune-namespaces":"*","script-loader":"^0.7.0","style-loader":"^0.18.1","webpack":"^2.6.1","webpack-dev-server":"^2.4.5","webpack-merge":"^4.1.0","webpack-node-externals":"^1.6.0"},"description":"Art.Binary","license":"ISC","name":"art-binary","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"0.2.0"}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-class-system":"*","art-config":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.0","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.1","chai":"^4.0.1","coffee-loader":"^0.7.3","coffee-script":"^1.12.6","colors":"^1.1.2","commander":"^2.9.0","css-loader":"^0.28.4","dateformat":"^2.0.0","detect-node":"^2.0.3","fs-extra":"^3.0.1","glob":"^7.1.2","glob-promise":"^3.1.0","json-loader":"^0.5.4","mocha":"^3.4.2","neptune-namespaces":"*","script-loader":"^0.7.0","style-loader":"^0.18.1","webpack":"^2.6.1","webpack-dev-server":"^2.4.5","webpack-merge":"^4.1.0","webpack-node-externals":"^1.6.0"},"description":"Simplified system of statuses for HTTP and any other network protocol","license":"ISC","name":"art-communication-status","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.5.2"}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*","art-class-system":"*","art-communication-status":"^1.0.0","art-config":"*","art-standard-lib":"*","art-testbench":"*","bluebird":"^3.5.0","caffeine-script":"*","caffeine-script-runtime":"*","case-sensitive-paths-webpack-plugin":"^2.1.1","chai":"^4.0.1","coffee-loader":"^0.7.3","coffee-script":"^1.12.6","colors":"^1.1.2","commander":"^2.9.0","css-loader":"^0.28.4","dateformat":"^2.0.0","detect-node":"^2.0.3","fs-extra":"^3.0.1","glob":"^7.1.2","glob-promise":"^3.1.0","json-loader":"^0.5.4","mocha":"^3.4.2","neptune-namespaces":"*","script-loader":"^0.7.0","style-loader":"^0.18.1","webpack":"^2.6.1","webpack-dev-server":"^2.4.5","webpack-merge":"^4.1.0","webpack-node-externals":"^1.6.0","xhr2":"^0.1.4"},"description":"Promise-based rest-client library. Makes HTTP/HTTPS easy in both NODE and BROWSER.","license":"ISC","name":"art-rest-client","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.6.3"}

/***/ })
/******/ ]);