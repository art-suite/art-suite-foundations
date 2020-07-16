"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["benchmark", "timeout", "setTimeout", "assert"],
    [global, require("./StandardImport")],
    (benchmark, timeout, setTimeout, assert) => {
      let wasSetup;
      benchmark(
        "sync",
        function() {
          return 1 + 2 + 3;
        },
        { testDuration: 0.1, loopUnrolling: 64 }
      );
      benchmark(
        "async_promise",
        function() {
          return timeout(1);
        },
        { testDuration: 0.1 }
      );
      benchmark(
        "async_callback",
        function(callback) {
          return setTimeout(callback, 10);
        },
        { testDuration: 0.1 }
      );
      wasSetup = false;
      benchmark(
        "all-options",
        function() {
          return 1 + 2 + 3;
        },
        {
          testDuration: 0.1,
          warmUpDuration: 0.1,
          loopUnrolling: 1,
          setup: function() {
            return (wasSetup = true);
          },
          logTestOutput: true,
          postProcessesResults: function(results) {
            assert.true(wasSetup);
            assert.isObject(results);
            assert.gt(results.duration, 0);
            return null;
          }
        }
      );
      benchmark(
        "postProcessesResults_alt",
        function() {
          return 1 + 2 + 3;
        },
        {
          testDuration: 0.1,
          postProcessesResults: function(results) {
            return {
              name: "hi",
              testUnits: "greetings",
              totalTests: 10,
              duration: 1,
              gcIncludedDuration: 1.1
            };
          }
        }
      );
      benchmark(
        "loopUnrolling: 1",
        function() {
          return 1 + 2 + 3;
        },
        { testDuration: 0.1, loopUnrolling: 1 }
      );
      benchmark(
        "loopUnrolling: 2",
        function() {
          return 1 + 2 + 3;
        },
        { testDuration: 0.1, loopUnrolling: 2 }
      );
      return benchmark(
        "loopUnrolling: 4",
        function() {
          return 1 + 2 + 3;
        },
        { testDuration: 0.1, loopUnrolling: 4 }
      );
    }
  );
});
