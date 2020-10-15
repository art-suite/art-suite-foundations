"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["updatePackage", "process"],
    [global, require("art-standard-lib")],
    (updatePackage, process) => {
      return require("@art-suite/cli").start({
        description:
          "ArtSuite Configuration Engine\n\nInitialize & Maintain Auto-Generated Package Files",
        commands: {
          init: {
            run: function (options) {
              return "Not supported yet.";
            },
            description: "Initialize new ACE managed package. COMING SOON.",
          },
          update: {
            run: function (options) {
              return updatePackage(process.cwd(), options);
            },
            description: "Update package files",
          },
        },
      });
    }
  );
});
