"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge"],
    [global, require("../StandardImport")],
    (merge) => {
      let Node;
      return (Node = Caf.defClass(
        class Node extends require("../Recipe") {},
        function (Node, classSuper, instanceSuper) {
          this.description =
            "Boilerplate for writing a Node NPM for the art-suite. (base: core)";
          this.getter({
            files: function () {
              return merge(this.recipe(require("./Core"), { node: true }), {
                "index.js":
                  "/*\n  NOTE: node PREFERS index.js OVER index.caf\n  I.E. webpack will ignore this file if index.caf is present.\n\n  use-build == true:  fast (no need to compile non-js files; all one file)\n  use-build == false: good for development of this package; don't have to re-build it to use it\n*/\nif (require('./use-build')) {\n  module.exports = require('./build');\n} else {\n  require('./register');\n  module.exports = require('./source');\n};",
                "index.caf":
                  "##\n  NOTE: webpack PREFERS index.caf OVER index.js\n  I.E. node will ignore this file if index.js is present.\n&source",
                "use-build.js":
                  '/*\n  true:   load package from ./build\n  false:  load package from ./source\n\n  "use-build" is provided as a stand-alone file in case you\n  have multiple entry-points to your package. Each one can\n  reference this one value to decide to use ./build of ./source.\n*/\nmodule.exports = true;',
              });
            },
          });
        }
      ));
    }
  );
});
