"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactories", "w"],
    [global, require("art-standard-lib"), require("art-object-tree-factory")],
    (createObjectTreeFactories, w) => {
      return createObjectTreeFactories(
        {
          mergePropsInto: function(dest, source) {
            return Caf.object(
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
            );
          }
        },
        require("./HtmlElementNames"),
        require("./HtmlTextNode")
      );
    }
  );
});
