"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["AceMain", "globPromise", "JSON"],
    [
      global,
      require("art-standard-lib"),
      require("../ArtSuite.Ace"),
      {
        globPromise: require("glob-promise"),
        ArtSuiteAce: require("../ArtSuite.Ace"),
      },
    ],
    (AceMain, globPromise, JSON) => {
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
                : globPromise(path + ".*").then(([filePath]) =>
                    JSON.parse(require("fs").readFileSync(filePath).toString())
                  ));
          },
        }
      );
    }
  );
});
