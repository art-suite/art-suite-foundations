// Generated by CoffeeScript 1.12.7
(function() {
  var MiniFoundation, Path, colors,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  colors = require("colors");

  Path = require('path');

  module.exports = MiniFoundation = (function() {
    var compactFlatten, escapeJavascriptString, formattedInspect, isFunction, isPlainArray, isPlainObject, isString, k, log, normalizeDirectory, ref, ref1, v;

    function MiniFoundation() {}

    ref = require('art-standard-lib/Core');
    for (k in ref) {
      v = ref[k];
      if (v !== "Core") {
        MiniFoundation[k] = v;
      }
    }

    ref1 = MiniFoundation, compactFlatten = ref1.compactFlatten, isFunction = ref1.isFunction, isPlainArray = ref1.isPlainArray, isPlainObject = ref1.isPlainObject, isString = ref1.isString;

    MiniFoundation.promiseSequence = function(promiseGeneratingFunctions) {
      var resolveNextPromise;
      promiseGeneratingFunctions = promiseGeneratingFunctions.reverse();
      resolveNextPromise = function() {
        if (promiseGeneratingFunctions.length > 0) {
          return promiseGeneratingFunctions.pop()().then(function() {
            return resolveNextPromise();
          });
        }
      };
      if (promiseGeneratingFunctions.length === 0) {
        return Promise.resolve();
      } else {
        return resolveNextPromise();
      }
    };

    MiniFoundation.normalizeDirectory = normalizeDirectory = function(directory) {
      return Path.normalize(Path.isAbsolute(directory) ? directory : Path.join(process.cwd(), directory));
    };

    MiniFoundation.escapeJavascriptString = escapeJavascriptString = function(str) {
      return JSON.stringify(str);
    };

    MiniFoundation.arrayWithoutLast = function(array) {
      return array.slice(0, array.length - 1);
    };

    MiniFoundation.fileWithoutExtension = function(file) {
      return file.split(/\.[a-zA-Z]+$/)[0];
    };

    MiniFoundation.peek = function(array, offset) {
      if (offset == null) {
        offset = -1;
      }
      return (array != null ? array.length : void 0) > 0 && array[array.length + offset];
    };

    MiniFoundation.pushIfUnique = function(array, value) {
      if (indexOf.call(array, value) < 0) {
        array.push(value);
      }
      return array;
    };

    MiniFoundation.indent = function(str, indentStr) {
      var joiner;
      if (indentStr == null) {
        indentStr = "  ";
      }
      joiner = "\n" + indentStr;
      return indentStr + str.split("\n").join(joiner);
    };

    MiniFoundation.pad = function(str, length, character) {
      var diff;
      if (character == null) {
        character = " ";
      }
      if (0 < (diff = length - str.length)) {
        str += character.repeat(diff);
      }
      return str;
    };

    MiniFoundation.withoutTrailingSlash = function(str) {
      return str.match(/^(.*[^\/])\/?$/)[1];
    };

    MiniFoundation.formattedInspect = formattedInspect = function(a, indent) {
      var el, inspected, str;
      if (indent == null) {
        indent = '';
      }
      if (isFunction(a != null ? a.getInspectedObjects : void 0)) {
        a = a.getInspectedObjects();
      }
      if (isPlainArray(a)) {
        inspected = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = a.length; i < len; i++) {
            el = a[i];
            results.push(formattedInspect(el, indent + '  '));
          }
          return results;
        })();
        return "[]\n" + indent + (inspected.join("\n" + indent));
      } else if (isPlainObject(a)) {
        inspected = (function() {
          var i, len, ref2, results;
          ref2 = Object.keys(a).sort();
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            k = ref2[i];
            results.push((k + ": ") + formattedInspect(a[k], indent + '  '));
          }
          return results;
        })();
        return "\n" + indent + (inspected.join("\n" + indent));
      } else if (isString(a)) {
        str = a.match(/\n/) ? compactFlatten(['"""', a.split(/\n/), '"""']).join("\n" + indent) : escapeJavascriptString(a);
        return str.green;
      } else {
        return "" + a;
      }
    };

    MiniFoundation.log = log = function() {
      var el, list;
      if (arguments.length === 1) {
        return console.log(formattedInspect(arguments[0]));
      } else {
        list = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = arguments.length; i < len; i++) {
            el = arguments[i];
            results.push(el);
          }
          return results;
        }).apply(this, arguments);
        return console.log(formattedInspect(list));
      }
    };

    MiniFoundation.getParentPath = function(path) {
      return Path.parse(path).dir;
    };

    MiniFoundation.getRelativePath = function(absFrom, absTo) {
      if (absFrom) {
        return Path.relative(absFrom, absTo);
      } else {
        return absTo;
      }
    };

    MiniFoundation.getAbsPath = function(absPath, relativePath) {
      if (absPath) {
        return Path.join(absPath, relativePath);
      } else {
        return relativePath;
      }
    };

    return MiniFoundation;

  })();

}).call(this);

//# sourceMappingURL=MiniFoundation.js.map
