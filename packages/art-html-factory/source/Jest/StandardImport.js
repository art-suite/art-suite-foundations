"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return require("art-standard-lib").mergeWithSelf(
    require("../"),
    require("art-testbench")
  );
});