"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["describe", "test", "HtmlTextNode", "assert", "merge"],
    [global, require("./StandardImport")],
    (describe, test, HtmlTextNode, assert, merge) => {
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
          return test("style is stringified", () => {
            let node;
            node = new HtmlTextNode("div", {
              style: { fontSize: "10pt", color: "#f00" }
            });
            return assert.eq(
              node.toString(),
              '<div style="color: #f00; fontSize: 10pt"></div>'
            );
          });
        },
        updateProps: function() {
          return test("update style", () => {
            let node;
            node = new HtmlTextNode("div", {
              style: { fontSize: "10pt", color: "#f00" }
            });
            node.style = merge(node.style, { fontSize: "5pt" });
            return assert.eq(
              node.toString(),
              '<div style="color: #f00; fontSize: 5pt"></div>'
            );
          });
        }
      });
    }
  );
});
