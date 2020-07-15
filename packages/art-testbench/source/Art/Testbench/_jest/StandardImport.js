"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let test, describe;
  return require("art-standard-lib").mergeWithSelf(
    (({ test, describe } = global), { test, describe }),
    require("../Testbench")
  );
});
