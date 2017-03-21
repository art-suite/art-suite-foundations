module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

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

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? ref1.RestClient : void 0 : void 0) != null ? ref : __webpack_require__(3);


/***/ }),
/* 1 */
/***/ (function(module, exports) {




/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var ErrorWithInfo, Promise, RestClient, StandardLib, appendQuery, decodeHttpStatus, failure, failureTypes, isNumber, log, merge, object, objectKeyCount, present, ref, serverFailure, success, timeout;

StandardLib = __webpack_require__(7);

present = StandardLib.present, Promise = StandardLib.Promise, merge = StandardLib.merge, isNumber = StandardLib.isNumber, timeout = StandardLib.timeout, log = StandardLib.log, objectKeyCount = StandardLib.objectKeyCount, appendQuery = StandardLib.appendQuery, object = StandardLib.object, ErrorWithInfo = StandardLib.ErrorWithInfo;

ref = __webpack_require__(6), success = ref.success, serverFailure = ref.serverFailure, failure = ref.failure, failureTypes = ref.failureTypes, decodeHttpStatus = ref.decodeHttpStatus;

__webpack_require__(1);

module.exports = RestClient = (function() {
  function RestClient() {}

  RestClient.legalVerbs = {
    get: "GET",
    GET: "GET",
    put: "PUT",
    PUT: "PUT",
    post: "POST",
    POST: "POST",
    "delete": "DELETE",
    DELETE: "DELETE"
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

  RestClient.get = function(url, options) {
    return RestClient.restRequest(merge(options, {
      verb: "GET",
      url: url
    }));
  };

  RestClient.put = function(url, data, options) {
    return RestClient.restRequest(merge(options, {
      verb: "PUT",
      url: url,
      data: data
    }));
  };

  RestClient.post = function(url, data, options) {
    return RestClient.restRequest(merge(options, {
      verb: "POST",
      url: url,
      data: data
    }));
  };

  RestClient["delete"] = function(url, options) {
    return RestClient.restRequest(merge(options, {
      verb: "DELETE",
      url: url
    }));
  };

  RestClient.getArrayBuffer = function(url, options) {
    return this.get(url, merge(options, {
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

  RestClient.getJson = function(url, options) {
    return RestClient.restJsonRequest(merge(options, {
      verb: "get",
      url: url
    }));
  };

  RestClient.deleteJson = function(url, options) {
    return RestClient.restJsonRequest(merge(options, {
      verb: "delete",
      url: url
    }));
  };

  RestClient.putJson = function(url, data, options) {
    return RestClient.restJsonRequest(merge(options, {
      verb: "put",
      url: url,
      data: data
    }));
  };

  RestClient.postJson = function(url, data, options) {
    return RestClient.restJsonRequest(merge(options, {
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

  RestClient.restRequest = function(options) {
    var data, formData, headers, k, method, onProgress, responseType, showProgressAfter, specifiedVerb, url, v, verb;
    verb = options.verb, method = options.method, url = options.url, data = options.data, headers = options.headers, onProgress = options.onProgress, responseType = options.responseType, formData = options.formData, showProgressAfter = options.showProgressAfter;
    if (!isNumber(showProgressAfter)) {
      showProgressAfter = 100;
    }
    verb || (verb = method);
    if (!(verb = RestClient.legalVerbs[specifiedVerb = verb])) {
      throw new Error("invalid verb: " + specifiedVerb);
    }
    if (formData) {
      if (data) {
        throw new Error("can't specify both 'data' and 'formData'");
      }
      data = new FormData;
      for (k in formData) {
        v = formData[k];
        data.append(k, v);
      }
    } else {
      data = (data != null ? typeof data.toArrayBuffer === "function" ? data.toArrayBuffer() : void 0 : void 0) || data;
    }
    return new Promise(function(resolve, reject) {
      var getErrorResponse, getResponse, initialProgressCalled, lastProgressEvent, progressCallbackInternal, request, requestResolved, restRequestStatus;
      if (verb === "GET" && data) {
        log.error({
          RestClient_restRequest: {
            info: "can't GET with data",
            options: options
          }
        });
        throw new Error("With their ultimate wisdom, the HTTP gods decree: NO DATA WITH GET");
      }
      restRequestStatus = {
        request: request = new XMLHttpRequest,
        progress: 0,
        options: options
      };
      getErrorResponse = function() {
        var error;
        try {
          return {
            response: getResponse()
          };
        } catch (error1) {
          error = error1;
          return {
            status: serverFailure,
            rawResponse: request.response,
            message: "Error parsing server's response: " + error
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
      request.open(verb, url, true);
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
        return reject(new ErrorWithInfo("XMLHttpRequest error event triggered", merge(restRequestStatus, {
          event: event
        }, decodeHttpStatus())));
      });
      request.addEventListener("load", function(event) {
        var decodedHttpStatus, httpStatus;
        requestResolved = true;
        decodedHttpStatus = decodeHttpStatus(httpStatus = request.status);
        if (!((decodedHttpStatus.status === success) && ((function() {
          try {
            resolve(getResponse());
            return true;
          } catch (error1) {}
        })()))) {
          return reject(new ErrorWithInfo("error processing response", merge(restRequestStatus, decodedHttpStatus, {
            event: event
          }, getErrorResponse())));
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
          var loaded, ref1, total;
          ref1 = lastProgressEvent = event, total = ref1.total, loaded = ref1.loaded;
          if (initialProgressCalled && !requestResolved) {
            return typeof onProgress === "function" ? onProgress(restRequestStatus = merge(restRequestStatus, {
              event: event,
              progress: total > 0 ? loaded / total : 0
            })) : void 0;
          }
        };
        if (verb === "GET") {
          request.addEventListener("progress", progressCallbackInternal);
        } else {
          request.upload.addEventListener("progress", progressCallbackInternal);
        }
      }
      return request.send(data);
    });
  };

  RestClient.restJsonRequest = function(options) {
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
        Accept: 'application/json'
      }, headers),
      data: data
    }));
  };

  return RestClient;

})();


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4).includeInNamespace(__webpack_require__(2));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Art, RestClient,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(5);

module.exports = Art.RestClient || Art.addNamespace('RestClient', RestClient = (function(superClass) {
  extend(RestClient, superClass);

  function RestClient() {
    return RestClient.__super__.constructor.apply(this, arguments);
  }

  return RestClient;

})(Neptune.Base));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(8);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("art-communication-status");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);