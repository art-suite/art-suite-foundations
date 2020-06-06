"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "loadAllPackages",
      "merge",
      "objectHasKeys",
      "neq",
      "log",
      "writeJson",
      "readJson"
    ],
    [global, require("./lib"), require("art-standard-lib")],
    (loadAllPackages, merge, objectHasKeys, neq, log, writeJson, readJson) => {
      let fs, updateDependencyVersions, updateAllPackageDependencies;
      fs = require("fs-extra");
      updateDependencyVersions = function(packages, fromDeps, toDeps) {
        return toDeps != null && fromDeps != null
          ? Caf.object(fromDeps, (fromVersion, packageName) => {
              let toVersion, fileRefMatch;
              return (toVersion = toDeps[packageName]) &&
                fromVersion !== toVersion
                ? (fileRefMatch = toVersion.match(/^file:(.*)$/))
                  ? `^${Caf.toString(packages[fileRefMatch[1]].version)}`
                  : toVersion
                : fromVersion;
            })
          : undefined;
      };
      updateAllPackageDependencies = function(
        rootPackage,
        packages,
        dependencySetName = "dependencies",
        updatedMap = {}
      ) {
        let rootDeps;
        rootDeps = merge(rootPackage.dependencies, rootPackage.devDependencies);
        if (!objectHasKeys(rootDeps)) {
          return;
        }
        return Caf.each2(
          packages,
          (_package, packageRoot) => {
            let deps, newDeps, changed, file;
            return objectHasKeys((deps = _package[dependencySetName]))
              ? ((newDeps = updateDependencyVersions(packages, deps, rootDeps)),
                (changed = newDeps && neq(newDeps, deps)),
                (file = packageRoot + "/package.json"),
                changed
                  ? ((updatedMap[packageRoot] = true),
                    log({ update: file }),
                    (_package = merge(_package, {
                      [dependencySetName]: newDeps
                    })))
                  : undefined,
                writeJson(file, _package))
              : undefined;
          },
          null,
          updatedMap
        );
      };
      return loadAllPackages().then(function(packages) {
        let rootPackage, updatedMap;
        rootPackage = readJson("package.json");
        updatedMap = updateAllPackageDependencies(rootPackage, packages);
        updateAllPackageDependencies(
          rootPackage,
          packages,
          "devDependencies",
          updatedMap
        );
        return !objectHasKeys(updatedMap)
          ? log("Everything up to date.")
          : undefined;
      });
    }
  );
});
