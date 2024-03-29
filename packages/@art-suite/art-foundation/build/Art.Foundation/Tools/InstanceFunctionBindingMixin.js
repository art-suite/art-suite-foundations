// Generated by CoffeeScript 1.12.7
(function() {
  var defineModule, fastBind, isFunction, log, ref,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = require('art-standard-lib'), defineModule = ref.defineModule, isFunction = ref.isFunction, fastBind = ref.fastBind, log = ref.log;

  defineModule(module, function() {
    return function(superClass) {
      var InstanceFunctionBindingMixin;
      return InstanceFunctionBindingMixin = (function(superClass1) {
        extend(InstanceFunctionBindingMixin, superClass1);

        function InstanceFunctionBindingMixin() {
          return InstanceFunctionBindingMixin.__super__.constructor.apply(this, arguments);
        }

        InstanceFunctionBindingMixin.getFunctionsToBindList = function(hotReload) {
          if (!hotReload && this.hasOwnProperty("_functionsToBindList")) {
            return this._functionsToBindList;
          } else {
            return this._functionsToBindList = this._getFunctionsToBindList().sort();
          }
        };

        InstanceFunctionBindingMixin._getFunctionsToBindList = function() {
          var k, ref1, results, v;
          ref1 = this.prototype;
          results = [];
          for (k in ref1) {
            v = ref1[k];
            if (k !== "constructor" && isFunction(v) && this.propertyIsConcrete(k) && (!this.nonBindingFunctions || indexOf.call(this.nonBindingFunctions, k) < 0)) {
              results.push(k);
            }
          }
          return results;
        };

        InstanceFunctionBindingMixin.prototype.getBoundFunctionList = function() {
          return this._boundFunctionList;
        };

        InstanceFunctionBindingMixin.prototype.hotReloadDebug = function(functionsToBindList) {
          var existingMethods, i, k, len, newMethods, removedMethods;
          newMethods = [];
          existingMethods = [];
          removedMethods = (function() {
            var i, len, ref1, results;
            ref1 = this._boundFunctionList;
            results = [];
            for (i = 0, len = ref1.length; i < len; i++) {
              k = ref1[i];
              if (indexOf.call(functionsToBindList, k) < 0) {
                results.push(k);
              }
            }
            return results;
          }).call(this);
          for (i = 0, len = functionsToBindList.length; i < len; i++) {
            k = functionsToBindList[i];
            if (indexOf.call(this._boundFunctionList, k) >= 0) {
              existingMethods.push(k);
            } else {
              newMethods.push(k);
            }
          }
          return log({
            HotReloadBind: {
              existingMethods: existingMethods,
              newMethods: newMethods,
              removedMethods: removedMethods
            }
          });
        };

        InstanceFunctionBindingMixin.prototype.bindFunctionsToInstance = function(hotReload) {
          var functionsToBindList, i, j, k, len, len1, prototype, prototypeMethod, ref1;
          functionsToBindList = this["class"].getFunctionsToBindList(hotReload);
          if (this._boundFunctionList) {
            ref1 = this._boundFunctionList;
            for (i = 0, len = ref1.length; i < len; i++) {
              k = ref1[i];
              if (indexOf.call(functionsToBindList, k) < 0) {
                delete this[k];
              }
            }
          }
          prototype = this["class"].prototype;
          for (j = 0, len1 = functionsToBindList.length; j < len1; j++) {
            k = functionsToBindList[j];
            this[k] = (prototypeMethod = prototype[k]) ? fastBind(prototypeMethod, this) : void 0;
          }
          return this._boundFunctionList = functionsToBindList;
        };

        return InstanceFunctionBindingMixin;

      })(superClass);
    };
  });

}).call(this);

//# sourceMappingURL=InstanceFunctionBindingMixin.js.map
