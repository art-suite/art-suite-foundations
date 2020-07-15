"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, require("art-standard-lib")],
    merge => {
      return function(options) {
        return require("./runLib")(merge(options, { verb: "run" }));
      };
    }
  );
});
