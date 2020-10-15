"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return {
    npm: {
      description: "Source.Source",
      dependencies: { "art-build-configurator": "*" }
    },
    webpack: { common: {}, targets: { index: {} } }
  };
});
