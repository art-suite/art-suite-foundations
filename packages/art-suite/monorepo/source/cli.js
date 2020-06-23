"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return (() => {
    return require("@art-suite/cli").start({
      commands: {
        test: require("./test"),
        sync: require("./sync"),
        "update-mono-package": require("./update-mono-package"),
        "update-sub-packages": require("./update-sub-packages")
      }
    });
  })();
});
