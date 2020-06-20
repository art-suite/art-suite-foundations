"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "requirePath", "alignColumns"],
    [global, require("../StandardImport")],
    (compactFlatten, requirePath, alignColumns) => {
      let IndexJsGenerator;
      return (IndexJsGenerator = Caf.defClass(
        class IndexJsGenerator extends Object {},
        function(IndexJsGenerator, classSuper, instanceSuper) {
          this.generate = function(namespace) {
            let includeInNamespace,
              generateNamespacedList,
              modules,
              setExportString;
            ({ includeInNamespace } = namespace);
            generateNamespacedList = set => {
              let list;
              return Caf.array(
                (list = Caf.array(set.namespaced, (path, namespaceName) => {
                  return { namespaceName, path };
                }).sort((a, b) => a.path.localeCompare(b.path))),
                (item, index) => [
                  " ",
                  item.namespaceName + ":",
                  `require('${Caf.toString(
                    requirePath(item.path)
                  )}')${Caf.toString(
                    index < list.length - 1 ? "," : undefined
                  )}`
                ]
              );
            };
            modules = generateNamespacedList(namespace.fileSet);
            setExportString = "module.exports = require('./namespace')";
            return compactFlatten([
              Caf.array(
                namespace.getAllNonNamespacedRequires(),
                name => `require('${Caf.toString(requirePath(name))}');`
              ),
              includeInNamespace || modules.length > 0
                ? `(${Caf.toString(setExportString)})\n${Caf.toString(
                    includeInNamespace
                      ? `.includeInNamespace(require('${Caf.toString(
                          requirePath(includeInNamespace)
                        )}'))`
                      : undefined
                  )}\n${Caf.toString(
                    modules.length > 0
                      ? `.addModules({\n${Caf.toString(
                          compactFlatten(alignColumns(modules)).join("\n")
                        )}\n})`
                      : undefined
                  )};`
                : `${Caf.toString(setExportString)};`,
              Caf.array(
                namespace.getAllNamespacedSubdirRequires(),
                name => `require('./${Caf.toString(name)}');`
              )
            ]).join("\n");
          };
        }
      ));
    }
  );
});
