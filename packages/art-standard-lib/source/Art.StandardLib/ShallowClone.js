// Generated by CoffeeScript 1.12.7

/*
This current iteration of clone relies on some singleton variables shared across all invocations of clone.
This is fine as long as javascript stays single-threaded.
It also introduces a little bit of uglyness initializing clonedMap necessitating the "top" variable.

FUTURE
A potentially better solution would be to create a new closer each time clone is called at the top-most level,
but when recursing, pass in a new function bound to that closure which is different from the global clone function.

populateClone would need to take an additional argument - the clone function to use for recursive cloning.
 */

(function() {
  var ShallowClone;

  module.exports = ShallowClone = (function() {
    function ShallowClone() {}

    ShallowClone.extendClone = function(obj) {
      if (obj.constructor === Array) {
        return obj.slice();
      } else {
        return Object.create(obj);
      }
    };

    ShallowClone.shallowClone = function(obj) {
      var k, ret, v;
      if (!obj) {
        return obj;
      }
      if (obj.constructor === Array) {
        return obj.slice();
      } else {
        ret = {};
        for (k in obj) {
          v = obj[k];
          ret[k] = v;
        }
        return ret;
      }
    };

    return ShallowClone;

  })();

}).call(this);

//# sourceMappingURL=ShallowClone.js.map
