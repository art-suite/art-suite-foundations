"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseClass",
      "fileBuilder",
      "merge",
      "path",
      "upperCamelCase",
      "dashCase",
      "getCapitalizedCodeWords",
      "peek",
      "process",
    ],
    [
      global,
      require("./StandardImport"),
      require("art-filebuilder"),
      { path: require("path") },
    ],
    (
      BaseClass,
      fileBuilder,
      merge,
      path,
      upperCamelCase,
      dashCase,
      getCapitalizedCodeWords,
      peek,
      process
    ) => {
      let Recipe;
      return (Recipe = Caf.defClass(
        class Recipe extends BaseClass {
          constructor(packageRoot, options) {
            super(...arguments);
            this._packageRoot =
              packageRoot != null ? packageRoot : process.cwd();
            this._options = options != null ? options : {};
            this._namespacePath = this._options.namespacePath;
          }
        },
        function (Recipe, classSuper, instanceSuper) {
          this.abstractClass();
          this.getFiles = function (packageRoot, options) {
            return new this(packageRoot, options).files;
          };
          this.writeFiles = function (packageRoot, options) {
            return fileBuilder(this.getFiles(packageRoot, options)).write(
              options
            );
          };
          this.postCreateConcreteClass = function () {
            require("./RecipeRegistry").register(this);
            return classSuper.postCreateConcreteClass.apply(this, arguments);
          };
          this.prototype.recipe = function (recipeClass, moreOptions) {
            return recipeClass.getFiles(
              this.packageRoot,
              merge(this.options, moreOptions)
            );
          };
          this.getter("options", "packageRoot", {
            packageName: function () {
              return path.basename(this.packageRoot);
            },
            packageUppercaseName: function () {
              return upperCamelCase(this.npmName);
            },
            packageDotName: function () {
              return this.namespacePath.join(".");
            },
            packageDashName: function () {
              return dashCase(this.packageName);
            },
            namespacePath: function () {
              let temp;
              return (temp = this._namespacePath) != null
                ? temp
                : (this._namespacePath = getCapitalizedCodeWords(this.npmName));
            },
            namespaceDirPath: function () {
              return this.namespacePath.join(".");
            },
            mostSpecificName: function () {
              return peek(this.namespacePath);
            },
            npmRoot: function () {
              return this.packageRoot;
            },
            npmName: function () {
              return path.basename(this.packageRoot);
            },
            cafRequireFriendlyNamespaceDirPath: function () {
              return upperCamelCase(this.namespacePath.join(" "));
            },
            cafPackageRootRequire: function () {
              return "&" + this.cafRequireFriendlyNamespaceDirPath;
            },
          });
        }
      ));
    }
  );
});
