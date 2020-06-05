"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isPathedNamespace", "peek", "PackageNamespaceClassName"],
    [global, require("../StandardImport")],
    (isPathedNamespace, peek, PackageNamespaceClassName) => {
      let NamespaceJsGenerator;
      return (NamespaceJsGenerator = Caf.defClass(
        class NamespaceJsGenerator extends Object {},
        function(NamespaceJsGenerator, classSuper, instanceSuper) {
          this.getClassName = function({ namespaceName }) {
            return isPathedNamespace(namespaceName)
              ? peek(namespaceName.split("."))
              : namespaceName;
          };
          this.getParentNamespacePath = function({ parent }) {
            let temp;
            return (temp = parent.parent && "../namespace") != null
              ? temp
              : parent.path;
          };
          this.generate = function(namespace, versionFile) {
            let namespaceName,
              isPathNamespace,
              className,
              parentNamespacePath,
              requireParent;
            namespaceName = namespace.namespaceName;
            isPathNamespace = namespace.isPathNamespace;
            className = this.getClassName(namespace);
            parentNamespacePath = this.getParentNamespacePath(namespace);
            requireParent = `require('${Caf.toString(parentNamespacePath)}')`;
            return `module.exports = ${Caf.toString(
              (() => {
                switch (false) {
                  case !isPathNamespace:
                    return `module.exports =  ${Caf.toString(
                      requireParent
                    )}.vivifySubnamespace('${Caf.toString(namespaceName)}');`;
                  case !(versionFile && namespace.getIsRootPackageNamespace()):
                    return `${Caf.toString(
                      requireParent
                    )}.addNamespace(\n  '${Caf.toString(
                      namespaceName
                    )}',\n  (class ${Caf.toString(
                      className
                    )} extends ${Caf.toString(
                      PackageNamespaceClassName
                    )} {})\n  ._configureNamespace(require('${Caf.toString(
                      versionFile
                    )}'))\n);`;
                  default:
                    return `${Caf.toString(
                      requireParent
                    )}.addNamespace(\n  '${Caf.toString(
                      namespaceName
                    )}',\n  class ${Caf.toString(
                      className
                    )} extends ${Caf.toString(
                      PackageNamespaceClassName
                    )} {}\n);`;
                }
              })()
            )}\n${Caf.toString(
              Caf.array(
                namespace.getAllNamespacedSubdirRequires(),
                name => `require('./${Caf.toString(name)}/namespace');`
              ).join("\n")
            )}`;
          };
        }
      ));
    }
  );
});
