"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["cleanMonorepo", "green"],
    [global, require("./StandardImport")],
    (cleanMonorepo, green) => {
      return function (options) {
        return cleanMonorepo().then(() => green("Monorepo is clean."));
      };
    }
  );
});
