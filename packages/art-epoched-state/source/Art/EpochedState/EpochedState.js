"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return { Epoch: require("./EpochClass") };
});
