"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["readJson", "loadAllPackages", "log", "Error", "writeJson"],
    [global, require("art-standard-lib"), require("./lib")],
    (readJson, loadAllPackages, log, Error, writeJson) => {
      let rootPackage, previousSubPackages, addDep;
      rootPackage = readJson("package.json");
      rootPackage.dependencies = {};
      previousSubPackages = {};
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
          log(
            `CONFLICTING PACKAGE VERSIONS:\n  ${Caf.toString(
              subPackage
            )}: {'${Caf.toString(name)}': '${Caf.toString(
              version
            )}'}\n  ${Caf.toString(previousSubPackage)}: {'${Caf.toString(
              name
            )}': '${Caf.toString(previousVersion)}'}`
          );
          throw new Error(
            `could not add ${Caf.toString(type)}: {'${Caf.toString(
              name
            )}': '${Caf.toString(version)}'} from ${Caf.toString(
              subPackage
            )} because it's already '${Caf.toString(
              intoPackageSet[name]
            )}' from ${Caf.toString(previousSubPackages[type][name])}`
          );
        } else {
          if (!alreadyFileDep) {
            intoPackageSet[name] = version;
          }
        }
        previousSubPackages[type] = previousSubPackages[type] || {};
        return (previousSubPackages[type][name] = subPackage);
      };
      return loadAllPackages().then(function(packages) {
        Caf.each2(packages, (_package, packageFolder) => {
          let name, dependencies, devDependencies;
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
      });
    }
  );
});
