"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, require("./StandardImport")],
    (merge) => {
      return function (options) {
        return require("./runLib")(
          merge(options, { command: "npm test", verb: "test" })
        );
      };
    }
  );
});
