"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "randomString",
      "process",
      "afterAll",
      "chainedTest",
      "fs",
      "log",
      "ArtBuildConfigurator",
      "assert",
      "Object",
    ],
    [
      global,
      require("./StandardImport"),
      {
        ArtBuildConfigurator: require("../Art.Build.Configurator"),
        fs: require("fs"),
      },
    ],
    (
      randomString,
      process,
      afterAll,
      chainedTest,
      fs,
      log,
      ArtBuildConfigurator,
      assert,
      Object
    ) => {
      let realRequire,
        mkdir,
        isDirectory,
        getTree,
        readFsTree,
        fsId,
        currentPath,
        parentPath,
        tempPath,
        initFs,
        restoreFs;
      realRequire = null;
      mkdir = function (dir) {
        return !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;
      };
      isDirectory = function (file) {
        if (!fs.existsSync(file)) {
          log.error(`DNE: ${Caf.toString(file)}`);
        }
        return fs.statSync(file).isDirectory();
      };
      getTree = readFsTree = function (path = ".") {
        return Caf.object(fs.readdirSync(path), (fileName) => {
          let pathedFilename;
          pathedFilename = require("path").join(path, fileName);
          return isDirectory(pathedFilename)
            ? readFsTree(pathedFilename)
            : fs.readFileSync(pathedFilename).toString();
        });
      };
      fsId = randomString();
      currentPath = process.cwd();
      parentPath = require("path").join(".", "temp");
      tempPath = require("path").join(parentPath, fsId);
      initFs = function () {
        mkdir(parentPath);
        mkdir(tempPath);
        return process.chdir(tempPath);
      };
      restoreFs = function () {
        log(`rm ${Caf.toString(tempPath)}`);
        return process.chdir(currentPath);
      };
      afterAll(restoreFs);
      return chainedTest(function () {
        realRequire = ArtBuildConfigurator.Main.realRequire;
        ArtBuildConfigurator.Main.realRequire = (file) => {
          return {};
        };
        return initFs();
      })
        .thenTest("configure once", function () {
          return ArtBuildConfigurator.go(process.cwd(), {
            configure: true,
            quiet: true,
          });
        })
        .thenTest("verify output", function () {
          return assert.eq(Object.keys(getTree()).sort(), [
            "art.build.config.caf",
            "package.json",
            "register.js",
            "webpack.config.js",
          ]);
        })
        .thenTest("configure twice", function () {
          return ArtBuildConfigurator.go(process.cwd(), {
            configure: true,
            quiet: true,
          });
        })
        .thenTest("teardown", function () {
          return (ArtBuildConfigurator.Main.realRequire = realRequire);
        });
    }
  );
});
