"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "merge",
      "log",
      "blue",
      "readJson",
      "clone",
      "Error",
      "loadAllPackages",
      "neq",
      "writeJson"
    ],
    [global, require("art-standard-lib"), require("./lib"), require("colors")],
    (
      merge,
      log,
      blue,
      readJson,
      clone,
      Error,
      loadAllPackages,
      neq,
      writeJson
    ) => {
      let addArtMonorepoFeatures, updateMonoPackage;
      addArtMonorepoFeatures = function(rootPackage) {
        let temp, base;
        (temp = (base = rootPackage.dependencies)[
          require("../package").name
        ]) != null
          ? temp
          : (base[require("../package").name] =
              "^" + require("../package").version);
        rootPackage.scripts = merge(
          { test: "art-monorepo test", sync: "art-monorepo sync" },
          rootPackage.scripts
        );
        return rootPackage;
      };
      return (updateMonoPackage = function({ quiet }) {
        let rootPackage,
          originalRootPackage,
          previousSubPackages,
          HandledError,
          addDep;
        if (!quiet) {
          log(blue("Updating **/package.json >> ./package.json..."));
        }
        rootPackage = readJson("package.json");
        originalRootPackage = clone(rootPackage);
        rootPackage.dependencies = {};
        previousSubPackages = {};
        HandledError = Caf.defClass(class HandledError extends Error {});
        addDep = (type, name, version, subPackage) => {
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
          .then(packages => {
            Caf.each2(packages, (_package, packageFolder) => {
              let name, dependencies, devDependencies;
              _package.path = packageFolder;
              name = _package.name;
              dependencies = _package.dependencies;
              devDependencies = _package.devDependencies;
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
            addArtMonorepoFeatures(rootPackage);
            if (neq(originalRootPackage, rootPackage)) {
              writeJson("package.json", rootPackage);
              log("Updated ./package.json");
            } else {
              log("Everything up to date.");
            }
            return null;
          })
          .catch(error =>
            !Caf.is(error, HandledError)
              ? (() => {
                  throw error;
                })()
              : undefined
          );
      });
    }
  );
});
