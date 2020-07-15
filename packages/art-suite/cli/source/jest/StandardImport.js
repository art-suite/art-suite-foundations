"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Function"],
    [global, require("art-standard-lib")],
    Function => {
      let describe;
      return require("art-standard-lib").mergeWithSelf(
        require("art-class-system"),
        require("art-testbench"),
        {
          describe: (describe = function(map) {
            Caf.each2(map, (v, k) =>
              Caf.is(v, Function)
                ? global.describe(k, () => {
                    v();
                    return undefined;
                  })
                : global.describe(k, () => describe(v))
            );
            return undefined;
          })
        },
        { ArtCli: require("../ArtSuite.Cli") }
      );
    }
  );
});
