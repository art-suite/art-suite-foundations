"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactories", "compactFlatten", "w"],
    [global, require("art-standard-lib"), require("art-object-tree-factory")],
    (createObjectTreeFactories, compactFlatten, w) => {
      let createHtmlFactories;
      return (createHtmlFactories = function(...elementNames) {
        return createObjectTreeFactories(
          {
            mergePropsInto: (dest, source) =>
              Caf.object(
                source,
                (v, k) => {
                  let temp;
                  return v === null
                    ? v
                    : (() => {
                        switch (k) {
                          case "style":
                            return Caf.object(
                              v,
                              null,
                              null,
                              (temp = dest.style) != null ? temp : {}
                            );
                          case "class":
                            return w(
                              `${Caf.toString(dest.class)} ${Caf.toString(v)}`
                            ).join(" ");
                          default:
                            return v;
                        }
                      })();
                },
                null,
                dest
              )
          },
          compactFlatten(elementNames),
          require("./HtmlTextNode")
        );
      });
    }
  );
});
