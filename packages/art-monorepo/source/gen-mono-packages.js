"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["readJson", "Error", "loadAllPackages", "log", "writeJson"],
    [global, require("art-standard-lib"), require("./lib")],
    (readJson, Error, loadAllPackages, log, writeJson) => {
      let rootPackage, previousSubPackages, HandledError, addDep;
      rootPackage = readJson("package.json");
      rootPackage.dependencies = {};
      previousSubPackages = {};
      HandledError = Caf.defClass(class HandledError extends Error {});
      addDep = function(type, name, version, subPackage) {
        let intoPackageSet,
          existingDep,
          alreadyHaveDep,
          alreadyFileDep,
          settingFileDep,
          conflict,
          previousSubPackage,
          previousVersion;
        intoPackageSet = rootPackage[type];
        existingDep = intoPackageSet[name];
        alreadyHaveDep = !!existingDep;
        alreadyFileDep = alreadyHaveDep && /^file:/.test(existingDep);
        settingFileDep = /^file:/.test(version);
        conflict =
          alreadyHaveDep &&
          existingDep !== version &&
          alreadyFileDep === settingFileDep;
        if (conflict) {
          previousSubPackage = previousSubPackages[type][name];
          previousVersion = intoPackageSet[name];
          log.warn("CONFLICTING PACKAGE VERSIONS:");
          log.withOptions(
            { color: true, unquoted: true, maxLineLength: 78 },
            {
              dependency: name,
              conflictingPackages: {
                [subPackage.path + "/package.json"]: version,
                [previousSubPackage.path + "/package.json"]: previousVersion
              }
            }
          );
          throw new HandledError(
            `Missmatch conflict:\n  ${Caf.toString(
              subPackage.path
            )}: ${Caf.toString(name)}: '${Caf.toString(
              intoPackageSet[name]
            )}'\n  ${Caf.toString(previousSubPackage.path)}: ${Caf.toString(
              name
            )}: '${Caf.toString(version)}'`
          );
        } else {
          if (!alreadyFileDep) {
            intoPackageSet[name] = version;
          }
        }
        previousSubPackages[type] = previousSubPackages[type] || {};
        return (previousSubPackages[type][name] = subPackage);
      };
      return loadAllPackages()
        .then(function(packages) {
          Caf.each2(packages, (_package, packageFolder) => {
            let name, dependencies, devDependencies;
            _package.path = packageFolder;
            name = _package.name;
            dependencies = _package.dependencies;
            devDependencies = _package.devDependencies;
            log(`package: ${Caf.toString(packageFolder)}`);
            Caf.each2(dependencies, (v, k) =>
              addDep("dependencies", k, v, _package)
            );
            Caf.each2(devDependencies, (v, k) =>
              addDep("dependencies", k, v, _package)
            );
            return addDep(
              "dependencies",
              name,
              `file:${Caf.toString(packageFolder)}`
            );
          });
          return writeJson("package.json", rootPackage);
        })
        .catch(function(error) {
          return !Caf.is(error, HandledError)
            ? (() => {
                throw error;
              })()
            : undefined;
        });
    }
  );
});
