"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let XbdTag;
  XbdTag = require("./XbdTag");
  return {
    createTagFactories: XbdTag.createTagFactories,
    fromXbd: XbdTag.fromXbd,
    parse: XbdTag.fromXbd,
    xbd: XbdTag.fromXbd,
  };
});
