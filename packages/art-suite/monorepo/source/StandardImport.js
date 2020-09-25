"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let blue, yellow, green;
  return require("art-standard-lib").mergeWithSelf(
    (({ blue, yellow, green } = require("chalk")), { blue, yellow, green }),
    require("./lib")
  );
});
