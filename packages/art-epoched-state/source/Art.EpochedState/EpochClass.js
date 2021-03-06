// Generated by CoffeeScript 1.12.7
(function() {
  var BaseClass, EpochClass, Promise, defineModule, evalAndThrowErrorsOutOfStack, inspect, isFunction, ref, requestAnimationFrame,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = require('art-standard-lib'), defineModule = ref.defineModule, isFunction = ref.isFunction, inspect = ref.inspect, Promise = ref.Promise, requestAnimationFrame = ref.requestAnimationFrame, evalAndThrowErrorsOutOfStack = ref.evalAndThrowErrorsOutOfStack;

  BaseClass = require('art-class-system').BaseClass;

  defineModule(module, EpochClass = (function(superClass) {
    extend(EpochClass, superClass);

    function EpochClass(options) {
      if (options == null) {
        options = {};
      }
      EpochClass.__super__.constructor.apply(this, arguments);
      this._emptyQueueAfterProcessing = !!options.emptyQueueAfterProcessing;
      this._queuedItems = [];
      this._nextReadyQueue = [];
      this._epochQueued = false;
      this._processingEpoch = false;
      this._epochCount = 0;
      this._frameSecond = 0;
    }

    EpochClass.getter("processingEpoch epochQueued epochCount emptyQueueAfterProcessing frameSecond", {
      epochLength: function() {
        return this._queuedItems.length;
      }
    });

    EpochClass.prototype.updateGlobalCounts = function() {};


    /*
    This guarantess there will be a next "ready" event.
    If there were no setStates this epoch, then there won't be a next "ready" - unless you use this method.
    
    IN:
      f: an optional function to invoke on-next-ready
        mostly this is provided as a shortcut:
          @onNextReady =>
        is directly equivelent to:
          @onNextReady().then =>
    
    OUT: promise.then (result of calling f() or null if no f) ->
     */

    EpochClass.prototype.onNextReady = function(f, forceNextEpoch, passThroughArgument) {
      if (forceNextEpoch == null) {
        forceNextEpoch = true;
      }
      if (forceNextEpoch && !this._processingEpoch) {
        this.queueNextEpoch();
      }
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this._nextReadyQueue.push(function() {
            return Promise.then(function() {
              if (f) {
                return f(passThroughArgument);
              } else {
                return passThroughArgument;
              }
            }).then(resolve)["catch"](reject);
          });
        };
      })(this));
    };

    EpochClass.prototype._ready = function() {
      var f, i, len, nrq, results;
      if (!((nrq = this._nextReadyQueue).length > 0)) {
        return;
      }
      this._nextReadyQueue = [];
      results = [];
      for (i = 0, len = nrq.length; i < len; i++) {
        f = nrq[i];
        results.push(evalAndThrowErrorsOutOfStack((function(_this) {
          return function() {
            return f();
          };
        })(this)));
      }
      return results;
    };

    EpochClass.prototype.queueItem = function(item) {
      if (item) {
        this._queuedItems.push(item);
        this.queueNextEpoch();
      }
      return item;
    };

    EpochClass.prototype.isItemQueued = function(item) {
      return indexOf.call(this._queuedItems, item) >= 0;
    };

    EpochClass.prototype.queueNextEpoch = function() {
      if (!this._epochQueued) {
        this._epochQueued = true;
        return requestAnimationFrame((function(_this) {
          return function(frameTimeMs) {
            _this._frameSecond = frameTimeMs / 1000;
            _this._epochQueued = false;
            return _this.processEpoch();
          };
        })(this));
      }
    };

    EpochClass.prototype.flushEpochNow = function() {
      return this.processEpoch();
    };

    EpochClass.prototype.processEpoch = function() {
      var items;
      this._processingEpoch = true;
      items = this._queuedItems;
      if (this._emptyQueueAfterProcessing) {
        this.processEpochItemsWithErrorHandling(items);
        this._queuedItems = [];
      } else {
        this._queuedItems = [];
        this.processEpochItemsWithErrorHandling(items);
      }
      this._processingEpoch = false;
      this._epochCount++;
      return this._ready();
    };

    EpochClass.prototype.processEpochItemsWithErrorHandling = function(items) {
      return evalAndThrowErrorsOutOfStack((function(_this) {
        return function() {
          return _this.processEpochItems(items);
        };
      })(this));
    };

    EpochClass.prototype.processEpochItems = function(items) {
      var i, item, len, results;
      results = [];
      for (i = 0, len = items.length; i < len; i++) {
        item = items[i];
        if (isFunction(item)) {
          results.push(item());
        } else {
          results.push(item.processEpoch());
        }
      }
      return results;
    };

    return EpochClass;

  })(BaseClass));

}).call(this);

//# sourceMappingURL=EpochClass.js.map
