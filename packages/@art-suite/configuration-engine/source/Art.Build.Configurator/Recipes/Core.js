"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["String"],
    [global, require("../StandardImport")],
    (String) => {
      let Core;
      return (Core = Caf.defClass(
        class Core extends require("../Recipe") {},
        function (Core, classSuper, instanceSuper) {
          this.description = "Basics for buliding any app with the ArtSuiteJS";
          this.getter({
            files: function () {
              let targets, dependencies, temp;
              temp = this.options;
              targets = temp.targets;
              dependencies = temp.dependencies;
              if (Caf.is(targets, String)) {
                targets = [targets];
              } else {
                targets != null ? targets : (targets = ["index"]);
              }
              return {
                "register.js": "require('caffeine-script/register');",
                "art.build.config.caf": "generators: {}",
                ".gitignore": "node_modules/",
                "README.md": `# ${Caf.toString(
                  this.packageDotName
                )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
                  this.packageDashName
                )}\n\`\`\``,
                source: {
                  "index.caf": this.cafPackageRootRequire,
                  [this.namespaceDirPath]: {
                    "StandardImport.caf":
                      "&ArtStandardLib.mergeWithSelf\n  &ArtClassSystem",
                  },
                  test: {
                    "StandardImport.caf": `&ArtStandardLib.mergeWithSelf\n  &ArtTestbench\n  ${Caf.toString(
                      this.cafPackageRootRequire
                    )}`,
                    "example.caf":
                      'import &StandardImport\n\ntest "example test" -> assert.eq 1, 1',
                  },
                },
              };
            },
          });
        }
      ));
    }
  );
});
