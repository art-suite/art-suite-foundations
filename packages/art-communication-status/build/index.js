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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var CommunicationStatus,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

module.exports = (__webpack_require__(4)).addNamespace('CommunicationStatus', CommunicationStatus = (function(superClass) {
  extend(CommunicationStatus, superClass);

  function CommunicationStatus() {
    return CommunicationStatus.__super__.constructor.apply(this, arguments);
  }

  CommunicationStatus.version = __webpack_require__(5).version;

  return CommunicationStatus;

})(Neptune.PackageNamespace));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);

module.exports.includeInNamespace(__webpack_require__(3));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var ref, ref1;

module.exports = (ref = typeof Neptune !== "undefined" && Neptune !== null ? (ref1 = Neptune.Art) != null ? ref1.CommunicationStatus : void 0 : void 0) != null ? ref : __webpack_require__(1);


/***/ }),
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(6)).vivifySubnamespace('Art');

__webpack_require__(0);


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = {"author":"Shane Brinkman-Davis Delamore, Imikimi LLC","dependencies":{"art-build-configurator":"*"},"description":"Simplified system of statuses for HTTP and any other network protocol","license":"ISC","name":"art-communication-status","scripts":{"build":"webpack --progress","start":"webpack-dev-server --hot --inline --progress","test":"nn -s;mocha -u tdd --compilers coffee:coffee-script/register","testInBrowser":"webpack-dev-server --progress"},"version":"1.5.2"}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require('neptune-namespaces' /*ABC - skip inlining with webpack*/);

/***/ })
/******/ ]);