"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "merge",
      "objectHasKeys",
      "neq",
      "log",
      "writeJson",
      "loadAllPackages",
      "readJson"
    ],
    [global, require("art-standard-lib"), require("./lib")],
    (merge, objectHasKeys, neq, log, writeJson, loadAllPackages, readJson) => {
      let updateDependencyVersions,
        updateAllPackageDependencies,
        updateSubPackages;
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
        updatedMap = {},
        universalUpdates
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
                    (_package = packages[packageRoot] = merge(_package, {
                      [dependencySetName]: newDeps
                    })))
                  : undefined,
                writeJson(file, merge(_package, universalUpdates)))
              : undefined;
          },
          null,
          updatedMap
        );
      };
      return (updateSubPackages = function() {
        return loadAllPackages().then(packages => {
          let rootPackage,
            updatedMap,
            author,
            bugs,
            homepage,
            license,
            repository;
          rootPackage = readJson("package.json");
          updatedMap = updateAllPackageDependencies(rootPackage, packages);
          updateAllPackageDependencies(
            rootPackage,
            packages,
            "devDependencies",
            updatedMap,
            (({ author, bugs, homepage, license, repository } = rootPackage),
            { author, bugs, homepage, license, repository })
          );
          if (!objectHasKeys(updatedMap)) {
            log("Everything up to date.");
          }
          return null;
        });
      });
    }
  );
});
