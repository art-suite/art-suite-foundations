// Generated by CoffeeScript 1.12.7
(function() {
  var FunctionExtensions,
    slice = [].slice;

  module.exports = FunctionExtensions = (function() {
    function FunctionExtensions() {}

    FunctionExtensions.fastBind = function(fn, _this) {
      switch (fn.length) {
        case 0:
          return function() {
            return fn.call(_this);
          };
        case 1:
          return function(a) {
            return fn.call(_this, a);
          };
        case 2:
          return function(a, b) {
            return fn.call(_this, a, b);
          };
        case 3:
          return function(a, b, c) {
            return fn.call(_this, a, b, c);
          };
        case 4:
          return function(a, b, c, d) {
            return fn.call(_this, a, b, c, d);
          };
        case 5:
          return function(a, b, c, d, e) {
            return fn.call(_this, a, b, c, d, e);
          };
        case 6:
          return function(a, b, c, d, e, f) {
            return fn.call(_this, a, b, c, d, e, f);
          };
        case 7:
          return function(a, b, c, d, e, f, g) {
            return fn.call(_this, a, b, c, d, e, f, g);
          };
        case 8:
          return function(a, b, c, d, e, f, g, h) {
            return fn.call(_this, a, b, c, d, e, f, g, h);
          };
        case 9:
          return function(a, b, c, d, e, f, g, h, i) {
            return fn.call(_this, a, b, c, d, e, f, g, h, i);
          };
        case 10:
          return function(a, b, c, d, e, f, g, h, i, j) {
            return fn.call(_this, a, b, c, d, e, f, g, h, i, j);
          };
        default:
          return function() {
            var all;
            all = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fn.apply(_this, all);
          };
      }
    };

    return FunctionExtensions;

  })();


  /*
  PERFORMANCE 2017-09-22
    Faster with normal bind:
      Chrome: 4x
      Edge: 2x
    Faster with fastBind
      FF: 7.8x faster
      Safari:
        OSX:  12.4x
        iOS:  11x
    Android:
      S8 Samsung browser: fastBindFaster: 6.5
      S8: normalBindFaster: 4x
   */


  /*
  TODO:
  
  The above options are not hot-reload compatible. However, this alternative would be:
  
    name = fn.name
    (args...) -> _this[name].apply _this, args
  
  I need to perf-test this. Or, I need to finally start using a global "debug" mode that could use this
  in debug mode and the faster(?), non hot-reload options in production mode.
   */

}).call(this);

//# sourceMappingURL=FunctionExtensions.js.map