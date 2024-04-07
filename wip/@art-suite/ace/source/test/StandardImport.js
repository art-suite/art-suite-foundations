"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["AceMain", "glob", "JSON"],
    [
      global,
      require("art-standard-lib"),
      require("../ArtSuite.Ace"),
      require("glob"),
      { ArtSuiteAce: require("../ArtSuite.Ace") },
    ],
    (AceMain, glob, JSON) => {
      return require("art-standard-lib").mergeWithSelf(
        require("art-class-system"),
        require("art-testbench"),
        require("art-testbench/Node"),
        require("../ArtSuite.Ace"),
        {
          mockAceForTesting: function () {
            return (AceMain.realRequire = (path) =>
              /register/.test(path)
                ? ""
                : glob(path + ".*").then(([filePath]) =>
                    JSON.parse(require("fs").readFileSync(filePath).toString())
                  ));
          },
        }
      );
    }
  );
});
