"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["merge", "dashCase", "abcLog", "Recipes", "Promise", "RecipeRegistry"],
    [global, require("./StandardImport"), require("./AbcLog")],
    (merge, dashCase, abcLog, Recipes, Promise, RecipeRegistry) => {
      let Initialization;
      return (Initialization = Caf.defClass(
        class Initialization extends Object {},
        function (Initialization, classSuper, instanceSuper) {
          this.initPackage = function (recipeName, npmRoot, options) {
            let pretend, verbose, recipe;
            pretend = options.pretend;
            verbose = options.verbose;
            if (pretend && !verbose) {
              options = merge(options, { verbose: true });
            }
            if (recipeName === true) {
              recipeName = null;
            }
            recipeName = dashCase(recipeName != null ? recipeName : "core");
            return recipeName === "Help"
              ? (abcLog(
                  `Please select a valid recipe name:\n\n  ${Caf.toString(
                    Recipes.getModuleNames().join("\n  ")
                  )}\n\nEx: abc -i node`
                ),
                Promise.reject("exiting"))
              : (abcLog(
                  `\n${Caf.toString(
                    pretend ? "PRETEND-" : undefined
                  )}INIT-${Caf.toString(recipeName)}: ${Caf.toString(npmRoot)}`
                ),
                !(recipe = RecipeRegistry.recipes[recipeName])
                  ? (abcLog({
                      recipes: Caf.object(
                        RecipeRegistry.recipes,
                        (recipe, name) => {
                          let temp;
                          return (temp = recipe.description) != null
                            ? temp
                            : "(no description)";
                        }
                      ),
                    }),
                    Promise.reject("Please provide a valid recipe name."))
                  : (recipe.writeFiles(npmRoot, options),
                    abcLog(
                      `${Caf.toString(
                        pretend ? "PRETEND-" : undefined
                      )}INIT-${Caf.toString(recipeName)}: done`
                    )));
          };
        }
      ));
    }
  );
});
