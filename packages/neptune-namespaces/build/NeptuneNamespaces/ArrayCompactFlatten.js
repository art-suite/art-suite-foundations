// Generated by CoffeeScript 1.12.7
(function() {
  var ArrayCompactFlatten, arraySlice, doFlattenInternal, flattenIfNeeded, isArguments, isArrayOrArguments, keepAll, needsFlatteningOrCompacting;

  arraySlice = Array.prototype.slice;

  isArguments = function(o) {
    return o.constructor === Object && (typeof o.callee === "function") && (typeof o.length === "number");
  };

  isArrayOrArguments = function(o) {
    return o && (o.constructor === Array || isArguments(o));
  };

  doFlattenInternal = function(array, keepTester, output) {
    var a, i, len;
    output || (output = []);
    for (i = 0, len = array.length; i < len; i++) {
      a = array[i];
      if (isArrayOrArguments(a)) {
        flattenIfNeeded(a, keepTester, output);
      } else if (keepTester(a)) {
        output.push(a);
      }
    }
    return output;
  };

  needsFlatteningOrCompacting = function(array, keepTester) {
    var a, i, len;
    for (i = 0, len = array.length; i < len; i++) {
      a = array[i];
      if (isArrayOrArguments(a) || !keepTester(a)) {
        return true;
      }
    }
    return false;
  };

  keepAll = function() {
    return true;
  };

  flattenIfNeeded = function(array, keepTester, output) {
    var i, len, v;
    if (keepTester == null) {
      keepTester = keepAll;
    }
    if (needsFlatteningOrCompacting(array, keepTester)) {
      return doFlattenInternal(array, keepTester, output);
    } else if (output) {
      for (i = 0, len = array.length; i < len; i++) {
        v = array[i];
        output.push(v);
      }
      return output;
    } else if (array.constructor !== Array) {
      return arraySlice.call(array);
    } else {
      return array;
    }
  };

  module.exports = ArrayCompactFlatten = (function() {
    var compact, flatten, keepUnlessNullOrUndefined;

    function ArrayCompactFlatten() {}

    ArrayCompactFlatten.keepUnlessNullOrUndefined = keepUnlessNullOrUndefined = function(a) {
      return a !== null && a !== void 0;
    };

    ArrayCompactFlatten.compact = compact = function(array, keepTester) {
      var a, i, len;
      if (keepTester == null) {
        keepTester = keepUnlessNullOrUndefined;
      }
      for (i = 0, len = array.length; i < len; i++) {
        a = array[i];
        if (!keepTester(a)) {
          return (function() {
            var j, len1, results;
            results = [];
            for (j = 0, len1 = array.length; j < len1; j++) {
              a = array[j];
              if (keepTester(a)) {
                results.push(a);
              }
            }
            return results;
          })();
        }
      }
      return array;
    };

    ArrayCompactFlatten.flatten = flatten = function(firstArg) {
      return flattenIfNeeded(arguments.length === 1 ? isArrayOrArguments(firstArg) ? firstArg : [firstArg] : arguments);
    };

    ArrayCompactFlatten.compactFlatten = function(array, keepTester) {
      if (keepTester == null) {
        keepTester = keepUnlessNullOrUndefined;
      }
      return flattenIfNeeded(array, keepTester);
    };

    return ArrayCompactFlatten;

  })();

}).call(this);

//# sourceMappingURL=ArrayCompactFlatten.js.map
