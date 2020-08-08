"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["String", "formattedInspect", "merge"],
    [global, require("../StandardImport")],
    (String, formattedInspect, merge) => {
      let Core;
      return (Core = Caf.defClass(
        class Core extends require("../Recipe") {},
        function(Core, classSuper, instanceSuper) {
          this.description = "Basics for buliding any app with the ArtSuiteJS";
          this.getter({
            files: function() {
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
                ".gitignore": "node_modules/",
                "register.js":
                  "/*\n  REGISTER CoffeeScript (.coffee) and CaffeineScript (.caf) loaders & compilers.\n  NOTE: for Node; ultimately a NOOP for Webpack.\n*/\nrequire('coffee-script/register');\nrequire('caffeine-mc/register');",
                "art.build.config.caf": `${Caf.toString(
                  this.options.node
                    ? "target:\n  ##\n    configures for standard node-targeted library\n    NOTE: node-targeted libraries can also be built into broswer-targeted libraries.\n      They just can't be used *directly* in the browser\n  node: true"
                    : undefined
                )}\n\n\n${Caf.toString(
                  formattedInspect({
                    npm: {
                      description: this.packageDotName,
                      dependencies: merge(
                        { "art-build-configurator": "*" },
                        dependencies
                      )
                    }
                  })
                )}\n\nwebpack:\n  # common properties are merged into each target's properties\n  common: {}\n\n  # each target's individual properties\n  targets: ${Caf.toString(
                  Caf.array(
                    targets,
                    target => `${Caf.toString(target)}: {}`
                  ).join(", ")
                )}`,
                "README.md": `# ${Caf.toString(
                  this.packageDotName
                )}\n\n> Initialized by Art.Build.Configurator\n\n### Install\n\n\`\`\`coffeescript\nnpm install ${Caf.toString(
                  this.packageDashName
                )}\n\`\`\``,
                test: {
                  "index.js":
                    "require('../register');\nrequire('./index.caf');",
                  "index.caf":
                    "&StandardImport\n&art-testbench/testing\n.init\n  synchronous: true\n  defineTests: -> &tests",
                  "StandardImport.caf": `&ArtStandardLib.mergeWithSelf\n  &ArtClassSystem\n  &ArtTestbench\n  &${Caf.toString(
                    this.packageUppercaseName
                  )}`,
                  tests: {
                    [this.namespaceDirPath]: {
                      "Test.caf": `import &StandardImport\nsuite: ->\n  test '${Caf.toString(
                        this.mostSpecificName
                      )}' -> assert.eq 1, 1`
                    }
                  }
                },
                source: {
                  "index.js": `module.exports = require('./${Caf.toString(
                    this.namespaceDirPath
                  )}');`,
                  [this.namespaceDirPath]: {
                    "StandardImport.caf":
                      "&ArtStandardLib.mergeWithSelf\n  &ArtClassSystem"
                  }
                }
              };
            }
          });
        }
      ));
    }
  );
});
