"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return require("art-standard-lib").mergeWithSelf(
    require("art-testbench"),
    require("../../source"),
    require("./Art.Config")
  );
});
