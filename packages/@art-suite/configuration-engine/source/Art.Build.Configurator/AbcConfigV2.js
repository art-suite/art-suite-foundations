"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let AbcConfigV2 = global.AbcConfigV2;
  return AbcConfigV2.caf;
});
