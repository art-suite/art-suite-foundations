"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["deepMerge", "merge"],
    [global, require("../StandardImport")],
    (deepMerge, merge) => {
      let App;
      return (App = Caf.defClass(
        class App extends require("../Recipe") {},
        function (App, classSuper, instanceSuper) {
          this.description = "A minimal ArtSuiteJS app. (base: core)";
          this.getter({
            files: function () {
              let clientFiles;
              clientFiles = this.options.clientFiles;
              return deepMerge(
                this.recipe(
                  require("./Core"),
                  deepMerge(
                    {
                      targets: "Client",
                      dependencies: { "art-suite-app": "*" },
                    },
                    this.options
                  )
                ),
                {
                  "Client.caf": `&source/${Caf.toString(
                    this.cafRequireFriendlyNamespaceDirPath
                  )}/Client`,
                  "index.caf": "&source",
                  "index.html":
                    '<html><body>\n  <h1>Development</h1>\n  <ul>\n    <li><a href="/Client?dev=true">Client</a></li>\n  </ul>\n  <h1>Production</h1>\n  <ul>\n    <li><a href="/Client">Client</a></li>\n  </ul>\n</body></html>',
                  source: {
                    [this.namespaceDirPath]: {
                      _Client: merge(
                        {
                          "StandardImport.caf": "&ArtSuite",
                          "Main.caf": `import &StandardImport\n\n&ArtSuiteApp.initArtSuiteClient\n  title:         :${Caf.toString(
                            this.packageDotName
                          )}\n  MainComponent:\n    class CanvasComponent extends Component\n\n      render: ->\n        CanvasElement\n          draw:       #eee\n\n          TextElement\n            padding:  10\n            text:     "" 'Hello world!' - ${Caf.toString(
                            this.packageDotName
                          )}`,
                        },
                        clientFiles
                      ),
                    },
                  },
                }
              );
            },
          });
        }
      ));
    }
  );
});
