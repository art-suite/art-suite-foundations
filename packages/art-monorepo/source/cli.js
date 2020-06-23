"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return (() => {
    return require("@art-suite/cli").start({
      commands: {
        "test-all": require("./test-all"),
        "update-sub-packages": require("./update-sub-packages"),
        "update-mono-package": require("./update-mono-package")
      }
    });
  })();
});
