"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactories", "mergeInto"],
    [global, require("art-standard-lib"), require("art-object-tree-factory")],
    (createObjectTreeFactories, mergeInto) => {
      let HtmlTextNode;
      HtmlTextNode = require("./HtmlTextNode");
      return createObjectTreeFactories(
        {
          mergePropsInto: function(dest, source) {
            return Caf.object(
              source,
              (v, k) => (k === "style" ? mergeInto(dest.style, v) : v),
              null,
              dest
            );
          }
        },
        require("./HtmlElementNames"),
        (tagName, tagProps, children) =>
          new HtmlTextNode(tagName, tagProps, children)
      );
    }
  );
});
