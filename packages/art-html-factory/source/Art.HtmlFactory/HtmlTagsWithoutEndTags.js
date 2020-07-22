"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return { link: true, meta: true, img: true, br: true, wbr: true };
});
