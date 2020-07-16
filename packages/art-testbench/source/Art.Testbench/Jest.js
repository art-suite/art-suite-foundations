"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let Function = global.Function,
    describe;
  return {
    test: function(...args) {
      return global.test(...args);
    },
    describe: (describe = function(map) {
      Caf.each2(map, (v, k) =>
        Caf.is(v, Function)
          ? global.describe(k, () => {
              v();
              return undefined;
            })
          : global.describe(k, () => describe(v))
      );
      return undefined;
    })
  };
});
