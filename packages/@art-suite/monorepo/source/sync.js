"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["removePackageLocks", "removeNodeModules", "green"],
    [global, require("./StandardImport")],
    (removePackageLocks, removeNodeModules, green) => {
      return function (options) {
        return require("./update-sub-packages")(options)
          .then(() => require("./update-mono-package")(options))
          .then(() => removePackageLocks())
          .then(() => removeNodeModules())
          .then(() => green("All package.json files synced."));
      };
    }
  );
});
