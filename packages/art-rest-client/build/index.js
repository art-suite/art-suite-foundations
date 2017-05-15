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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("art-standard-lib");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);

module.exports.addModules({
  RestClient: __webpack_require__(3)
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {




/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var BaseClass, ErrorWithInfo, Promise, RestClient, StandardLib, appendQuery, decodeHttpStatus, each, failureTypes, formattedInspect, isNumber, log, merge, object, objectKeyCount, objectWithout, present, ref, ref1, serverFailure, success, timeout, w,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

StandardLib = __webpack_require__(0);

ref = __webpack_require__(0), objectWithout = ref.objectWithout, formattedInspect = ref.formattedInspect, present = ref.present, Promise = ref.Promise, merge = ref.merge, isNumber = ref.isNumber, timeout = ref.timeout, log = ref.log, objectKeyCount = ref.objectKeyCount, appendQuery = ref.appendQuery, object = ref.object, ErrorWithInfo = ref.ErrorWithInfo, w = ref.w, each = ref.each;

ref1 = __webpack_require__(6), success = ref1.success, serverFailure = ref1.serverFailure, failureTypes = ref1.failureTypes, decodeHttpStatus = ref1.decodeHttpStatus;

BaseClass = __webpack_require__(5).BaseClass;

__webpack_require__(2);

module.exports = RestClient = (function(superClass) {
  var legalVerbs;

  extend(RestClient, superClass);

  function RestClient() {
    return RestClient.__super__.constructor.apply(this, arguments);
  }

  RestClient.singletonClass();

  RestClient.legalVerbs = legalVerbs = {};

  each(w("get put post delete head"), function(v) {
    var upper;
    upper = v.toUpperCase();
    return legalVerbs[v.toLowerCase()] = legalVerbs[upper] = upper;
  });

  RestClient.get = function(url, options) {
    return this.singleton.get(url, options);
  };

  RestClient.put = function(url, data, options) {
    return this.singleton.put(url, data, options);
  };

  RestClient.post = function(url, data, options) {
    return this.singleton.post(url, data, options);
  };

  RestClient["delete"] = function(url, options) {
    return this.singleton["delete"](url, options);
  };

  RestClient.getArrayBuffer = function(url, options) {
    return this.singleton.getArrayBuffer(url, options);
  };

  RestClient.getJson = function(url, options) {
    return this.singleton.getJson(url, options);
  };

  RestClient.deleteJson = function(url, options) {
    return this.singleton.deleteJson(url, options);
  };

  RestClient.putJson = function(url, data, options) {
    return this.singleton.putJson(url, data, options);
  };

  RestClient.postJson = function(url, data, options) {
    return this.singleton.postJson(url, data, options);
  };

  RestClient.restRequest = function(options) {
    return this.singleton.restRequest(options);
  };

  RestClient.restJsonRequest = function(options) {
    return this.singleton.restJsonRequest(options);
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

  RestClient.getArrayBuffer = function(url, options) {
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
    var body, data, formData, headers, k, method, onProgress, responseType, showProgressAfter, specifiedVerb, url, v, verb;
    verb = options.verb, method = options.method, url = options.url, data = options.data, body = options.body, headers = options.headers, onProgress = options.onProgress, responseType = options.responseType, formData = options.formData, showProgressAfter = options.showProgressAfter;
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
    return this._normalizedRestRequest({
      method: method,
      url: url,
      body: body,
      headers: headers,
      onProgress: onProgress,
      responseType: responseType,
      showProgressAfter: showProgressAfter
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
        Accept: 'application/json'
      }, headers),
      data: data
    }));
  };

  RestClient.prototype._normalizedRestRequest = function(options) {
    var body, headers, method, onProgress, responseType, showProgressAfter, url;
    method = options.method, url = options.url, body = options.body, headers = options.headers, onProgress = options.onProgress, responseType = options.responseType, showProgressAfter = options.showProgressAfter;
    return new Promise(function(resolve, reject) {
      var getErrorResponse, getResponse, initialProgressCalled, k, lastProgressEvent, progressCallbackInternal, request, requestResolved, restRequestStatus, v;
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
        return reject(new ErrorWithInfo("XMLHttpRequest error event triggered", merge(restRequestStatus, {
          event: event
        }, decodeHttpStatus())));
      });
      request.addEventListener("load", function(event) {
        var decodedHttpStatus, httpStatus, info, message, stringInfo;
        requestResolved = true;
        decodedHttpStatus = decodeHttpStatus(httpStatus = request.status);
        if (!((decodedHttpStatus.status === success) && ((function() {
          try {
            resolve(getResponse());
            return true;
          } catch (error1) {}
        })()))) {
          info = merge(restRequestStatus, decodedHttpStatus, {
            event: event
          }, getErrorResponse());
          stringInfo = formattedInspect({
            info: objectWithout(info, "event", "request")
          });
          message = decodedHttpStatus.status === success ? "error processing successful response" : "request status: " + decodedHttpStatus.status + " (" + request.status + ")";
          message += "\n\n" + stringInfo;
          return reject(new ErrorWithInfo(message, info));
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
      return request.send(body);
    });
  };

  return RestClient;

})(BaseClass);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(7);

module.exports = Neptune.Art || Neptune.addNamespace('Art', Art = (function(superClass) {
  extend(Art, superClass);

  function Art() {
    return Art.__super__.constructor.apply(this, arguments);
  }

  return Art;

})(Neptune.Base));


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("art-class-system");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("art-communication-status");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("neptune-namespaces");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(1)).RestClient;


/***/ })
/******/ ]);