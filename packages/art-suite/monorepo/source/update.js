"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let Promise = global.Promise;
  return function(options) {
    return Promise.then(() =>
      require("./update-sub-packages")(options)
    ).then(() => require("./update-mono-package")(options));
  };
});
