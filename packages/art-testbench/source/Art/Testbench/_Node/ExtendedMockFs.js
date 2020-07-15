"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["mockFs", "fs", "Path"],
    [
      global,
      { fs: require("fs"), mockFs: require("mock-fs"), Path: require("path") }
    ],
    (mockFs, fs, Path) => {
      let isDirectory, readFsTree;
      isDirectory = function(file) {
        return fs.statSync(file).isDirectory();
      };
      mockFs.getTree = readFsTree = function(path = "") {
        return Caf.object(fs.readdirSync(path), fileName => {
          let pathedFilename;
          pathedFilename = Path.join(path, fileName);
          return isDirectory(pathedFilename)
            ? readFsTree(pathedFilename)
            : fs.readFileSync(pathedFilename).toString();
        });
      };
      return mockFs;
    }
  );
});
