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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? ref1.CommunicationStatus : void 0 : void 0) != null ? ref : __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {


/*
A core set of status-codes that code can reason about easily.

Goal:

  Minimal set of codes so Clients can reason about network requests in a
  consistant way.

Strategy:

  Have a small, simple set of status codes for our programs to reason about,
  and, if necessary, allow the communication channel to return additional
  information in the form of a 'message' that humans can look at to get more
  information about any failures.

Summary:

  6 statuses:

  success:        yay!
  missing:        the resouce does not exist (404)
  clientFailure:  fix client code or user inputs
  serverFailure:  fix server code
  networkFailure: retry when network is working
  failure:        boo! Unknown failure type

Automatic actions the Client can take on behalf of the user:

  status:
    missing:
      alert "The resoure is not available."

  failureTypes:
    network:
      automatic retries
      test a known-good URL to validate if there is any network connection at all
      alert "Please check your network connection."

    client:
      assuming the client is bug-free, ask the user to fix their submission (Ex: wrong password)
      alert "Yikes! That's not quite right. Please try again."

    server:
      alert "Ooops! We're sorry, but something went wrong on our servers.
        We'll fix it ASAP! In the mean time, how about some tea?"

Why not HTTP Status codes?

  1) They cover so much, most of which automatic code cannot do anything about
  other than report an error, possibly to be viewed by a human later.

  2) there is no HTTP status code for network failure.

  3) 404 isn't really a client-error or a server-error, it's its own thing: status: missing

    By definition:
      a client-error means there is something the client can do to fix it.
      a server-error means there is something the server can do to fix it.

    Unless the 404-response itself was a bug, 404 fits in neither of those categories.

    Example: If the client requests a resource once and it works, then
    fires the exact same request again and the resource is now 404, it's not the client's
    fault.

Note, these status-codes are used at the core of other Art Libs:

  ArtFlux
  ArtEry
  ArtRestClient
 */
var CommunicationStatus;

module.exports = CommunicationStatus = (function() {
  function CommunicationStatus() {}


  /*
  status: success
  
  * An unqualified success.
  * I guess it could be qualified, with additional information in another field,
    but the 'expected' data should be present.
   */

  CommunicationStatus.success = "success";


  /*
  status: pending
  
  * The request is proceeding.
  * No errors so far.
   */

  CommunicationStatus.pending = "pending";


  /*
  status: missing
  
  * The request was properly formatted.
  * There were no network errors.
  * There were no server errors.
  * The only problem is the server could not find the requested resource.
   */

  CommunicationStatus.missing = "missing";


  /*
  status: failure
  
  * catch-all failure
   */

  CommunicationStatus.failure = "failure";


  /*
  OUT: true if status is a valid status-string
   */

  CommunicationStatus.validStatus = function(status) {
    return CommunicationStatus[status] === status;
  };

  CommunicationStatus.networkFailure = "networkFailure";

  CommunicationStatus.clientFailure = "clientFailure";

  CommunicationStatus.serverFailure = "serverFailure";

  CommunicationStatus.decodeHttpStatus = function(httpStatus) {
    var ft, httpStatusCategory;
    if (httpStatus == null) {
      return {
        status: CommunicationStatus.networkFailure,
        message: "network failure"
      };
    }
    httpStatusCategory = httpStatus / 100 | 0;
    if (httpStatus === 404) {
      return {
        status: CommunicationStatus.missing,
        httpStatus: httpStatus
      };
    }
    if (httpStatusCategory === 2) {
      return {
        status: CommunicationStatus.success,
        httpStatus: httpStatus
      };
    }
    return {
      status: ft = (function() {
        switch (httpStatusCategory) {
          case 3:
          case 4:
            return this.clientFailure;
          case 5:
            return this.serverFailure;
          default:
            return this.failure;
        }
      }).call(CommunicationStatus),
      httpStatus: httpStatus,
      message: ft + " (" + httpStatus + ")"
    };
  };

  return CommunicationStatus;

})();


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3).includeInNamespace(__webpack_require__(1));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var Art, CommunicationStatus,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Art = __webpack_require__(4);

module.exports = Art.CommunicationStatus || Art.addNamespace('CommunicationStatus', CommunicationStatus = (function(superClass) {
  extend(CommunicationStatus, superClass);

  function CommunicationStatus() {
    return CommunicationStatus.__super__.constructor.apply(this, arguments);
  }

  return CommunicationStatus;

})(Neptune.Base));


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var Art, Neptune,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Neptune = __webpack_require__(5);

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

module.exports = require("neptune-namespaces");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);