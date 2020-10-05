"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "currentDir",
      "consistentJsonStringify",
      "merge",
      "JSON",
      "path",
      "Object",
      "mkdir",
      "writeFile",
      "String",
      "readFileAsString",
      "abcLog",
      "loadAbcConfig",
    ],
    [
      global,
      require("./StandardImport"),
      require("./FsEasy"),
      require("./LoadAbcConfig"),
      { path: require("path") },
    ],
    (
      currentDir,
      consistentJsonStringify,
      merge,
      JSON,
      path,
      Object,
      mkdir,
      writeFile,
      String,
      readFileAsString,
      abcLog,
      loadAbcConfig
    ) => {
      let Configuration;
      return (Configuration = Caf.defClass(
        class Configuration extends Object {},
        function (Configuration, classSuper, instanceSuper) {
          let noopLoader;
          noopLoader = function (current, generators) {
            return generators(currentDir);
          };
          this.defaultLoaders = {
            ".json": function (rawJsonString, generator) {
              let current;
              return consistentJsonStringify(
                merge(
                  (current = rawJsonString ? JSON.parse(rawJsonString) : {}),
                  generator(current)
                )
              );
            },
          };
          this.writeConfig = (npmRoot, abcConfig, options) => {
            let loaders, generators;
            loaders = abcConfig.loaders;
            generators = abcConfig.generators;
            return this._generateFilesR(
              npmRoot,
              (loaders = merge(this.defaultLoaders, loaders)),
              generators,
              options
            );
          };
          this._generateFilesR = function (
            currentDir,
            generators,
            loaders,
            options
          ) {
            return Caf.each2(generators, (v, k) => {
              let itemPath, current, loader, extension, temp;
              itemPath = path.join(currentDir, k);
              return Caf.is(v, Object)
                ? (mkdir(k),
                  this._generateFilesR(itemPath, v, loaders, options))
                : writeFile(
                    itemPath,
                    Caf.is(v, String)
                      ? v
                      : ((current = readFileAsString(itemPath)),
                        (loader =
                          (temp = loaders[(extension = path.extname(k))]) !=
                          null
                            ? temp
                            : noopLoader),
                        loader(current, v))
                  );
            });
          };
          this.configurePackage = function (npmRoot, options) {
            abcLog(`\nCONFIGURE: ${Caf.toString(npmRoot)}`);
            return loadAbcConfig(npmRoot, options.configure).then((abcConfig) =>
              this.writeConfig(npmRoot, abcConfig, options)
            );
          };
        }
      ));
    }
  );
});
