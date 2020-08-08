"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["BaseClass", "dashCase", "Object"],
    [global, require("./StandardImport")],
    (BaseClass, dashCase, Object) => {
      let RecipeRegistry;
      return (RecipeRegistry = Caf.defClass(
        class RecipeRegistry extends BaseClass {},
        function(RecipeRegistry, classSuper, instanceSuper) {
          this.recipes = {};
          this.register = function(recipeClass) {
            return (this.recipes[dashCase(recipeClass.name)] = recipeClass);
          };
          this.classGetter({
            recipeNames: function() {
              return Object.keys(this.recipes);
            }
          });
        }
      ));
    }
  );
});
