"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["fs"],
    [global, require("./StandardImport"), { fs: require("fs-extra") }],
    (fs) => {
      let FsEasy;
      return (FsEasy = Caf.defClass(class FsEasy extends Object {}, function (
        FsEasy,
        classSuper,
        instanceSuper
      ) {
        this.mkdir = function (dir) {
          return !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
        };
        this.readFileAsString = function (file) {
          return fs.existsSync(file)
            ? fs.readFileSync(file).toString()
            : undefined;
        };
        this.writeFile = function (file, string) {
          return fs.writeFileSync(file, string);
        };
      }));
    }
  );
});
