"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["describe", "test", "HtmlTextNode", "assert"],
    [global, require("./StandardImport")],
    (describe, test, HtmlTextNode, assert) => {
      return describe({
        basics: function() {
          test("new", () => {
            let node;
            node = new HtmlTextNode("div", { class: "fooClass" }, [
              "string child"
            ]);
            return assert.eq(
              node.toString({ indent: "", tagWrap: 1 }),
              '<div class="fooClass">\n  string child\n</div>'
            );
          });
          return test("style", () => {
            let node;
            node = new HtmlTextNode("div", {
              style: { fontSize: "10pt", color: "#f00" }
            });
            return assert.eq(
              node.toString(),
              '<div style="fontSize: 10pt; color: #f00"></div>'
            );
          });
        }
      });
    }
  );
});
