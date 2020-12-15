"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "path",
      "Promise",
      "fs",
      "present",
      "isArray",
      "Error",
      "formattedInspect",
      "isString",
    ],
    [
      global,
      require("art-standard-lib"),
      require("art-class-system"),
      { path: require("path"), fs: require("fs-extra") },
    ],
    (
      BaseClass,
      path,
      Promise,
      fs,
      present,
      isArray,
      Error,
      formattedInspect,
      isString
    ) => {
      let SourceRootFinder;
      SourceRootFinder = Caf.defClass(
        class SourceRootFinder extends BaseClass {
          constructor(options = {}) {
            let temp;
            super(...arguments);
            this.indicatorFiles =
              (temp = options.indicatorFiles) != null
                ? temp
                : ["package.json", ".git"];
            this._validatedIndicatorFiles();
            this.resetKnownSourceRoots();
          }
        },
        function (SourceRootFinder, classSuper, instanceSuper) {
          this.singletonClass();
          this.findSourceRoot = (directory) =>
            this.singleton.findSourceRoot(directory);
          this.findSourceRootSync = (directory) =>
            this.singleton.findSourceRootSync(directory);
          this.property("indicatorFiles", "knownSourceRoots");
          this.classGetter("sourceRootIndicatorFiles knownSourceRoots", {
            caffeineInitFileName: function () {
              return "caffeine-mc.config.caf";
            },
          });
          this.prototype.findSourceRoot = function (directory) {
            let known;
            return (known = this._knownSourceRoots[
              (directory = path.resolve(directory != null ? directory : "."))
            ])
              ? Promise.resolve(known)
              : fs.stat(directory).then((stat) => {
                  if (!stat.isDirectory()) {
                    directory = path.dirname(directory);
                  }
                  return this._findRootR(directory).then(
                    (sourceRoot) =>
                      (this._knownSourceRoots[directory] = sourceRoot || false)
                  );
                });
          };
          this.prototype.findSourceRootSync = function (directory) {
            let known;
            return (known = this._knownSourceRoots[
              (directory = path.resolve(directory != null ? directory : "."))
            ])
              ? known
              : (!(
                  fs.existsSync(directory) &&
                  fs.statSync(directory).isDirectory()
                )
                  ? (directory = path.dirname(directory))
                  : undefined,
                (this._knownSourceRoots[directory] =
                  this._findRootSyncR(directory) || false));
          };
          this.prototype.resetKnownSourceRoots = function () {
            return (this._knownSourceRoots = {});
          };
          this.prototype._findRootR = function (directory) {
            let from, into, to, i, temp;
            return Promise.all(
              ((from = this._indicatorFiles),
              (into = []),
              from != null
                ? ((to = from.length),
                  (i = 0),
                  (() => {
                    while (i < to) {
                      let file;
                      file = from[i];
                      into.push(fs.exists(path.join(directory, file)));
                      temp = i++;
                    }
                    return temp;
                  })())
                : undefined,
              into)
            ).then((rootFileExistResults) =>
              Caf.find(rootFileExistResults, null, (bool) => bool)
                ? directory
                : directory !== "/" && present(directory)
                ? this._findRootR(path.dirname(directory))
                : undefined
            );
          };
          this.prototype._findRootSyncR = function (directory) {
            let from, into, to, i, temp;
            return ((from = this._indicatorFiles),
            (into = null),
            from != null
              ? ((to = from.length),
                (i = 0),
                (() => {
                  while (i < to) {
                    let file;
                    file = from[i];
                    if (fs.existsSync(path.join(directory, file))) {
                      into = file;
                      break;
                    }
                    temp = i++;
                  }
                  return temp;
                })())
              : undefined,
            into)
              ? directory
              : directory !== "/" && present(directory)
              ? this._findRootSyncR(path.dirname(directory))
              : undefined;
          };
          this.prototype._validatedIndicatorFiles = function () {
            return !(
              isArray(this.indicatorFiles) &&
              this.indicatorFiles.length > 0 &&
              !Caf.find(
                this.indicatorFiles,
                (i) => true,
                (i) => !isString(i) || !present(i)
              )
            )
              ? (() => {
                  throw new Error(
                    `indicatorFiles must be an array of strings:\n${Caf.toString(
                      formattedInspect({ indicatorFiles: this.indicatorFiles })
                    )}`
                  );
                })()
              : undefined;
          };
        }
      );
      return {
        SourceRootFinder,
        findSourceRoot: SourceRootFinder.findSourceRoot,
        findSourceRootSync: SourceRootFinder.findSourceRootSync,
      };
    }
  );
});
