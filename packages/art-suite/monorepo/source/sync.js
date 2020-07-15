"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return function(options) {
    return require("./update-sub-packages")(options).then(() =>
      require("./update-mono-package")(options)
    );
  };
});
