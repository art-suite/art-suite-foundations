"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["Neptune"],
    (parentImports = [global, require("./StandardImport")]),
    (Neptune) => {
      return Caf.importInvoke(
        ["self", "test", "Div", "assert", "Span", "B", "Em"],
        [parentImports, Neptune.Art.BrowserTools.DomElementFactories],
        (self, test, Div, assert, Span, B, Em) => {
          let HTMLDivElement;
          HTMLDivElement = global.HTMLDivElement;
          return self.document
            ? (test("Div()", function () {
                let el;
                el = Div();
                return assert.eq(el.constructor, HTMLDivElement);
              }),
              test("Div class: 'foo', id: '123'", function () {
                let el;
                el = Div({ class: "foo", id: "123" });
                assert.eq(el.className, "foo");
                return assert.eq(el.id, "123");
              }),
              test("text children", function () {
                let el;
                el = Span(
                  { class: "dude" },
                  "This is some really",
                  B("bold"),
                  "text.",
                  "Also, here is some",
                  Em("emphasized"),
                  "text."
                );
                return assert.eq(
                  el.innerHTML,
                  "This is some really<b>bold</b>text.Also, here is some<em>emphasized</em>text."
                );
              }),
              test("text child with newline", function () {
                let el;
                el = Span({ class: "dude" }, "one\ntwo");
                return assert.eq(el.innerHTML, "one<br>two");
              }),
              test("Span innerHTML: ...", function () {
                let el, myInnerHTML;
                el = Span({
                  innerHTML: (myInnerHTML =
                    "This is some really<b>bold</b>text.Also, here is some<em>emphasized</em>text."),
                });
                return assert.eq(el.innerHTML, myInnerHTML);
              }),
              test("style property", function () {
                let el;
                el = Div({ style: { padding: "20px" } });
                return assert.eq(el.style.padding, "20px");
              }),
              test("multiple styles merge correctly", function () {
                let mySharedTextStyle, el;
                mySharedTextStyle = { style: { fontSize: "123pt" } };
                el = Div(mySharedTextStyle, {
                  style: { fontFamily: "MyPenguin" },
                });
                assert.eq(el.style.fontSize, "123pt");
                return assert.eq(el.style.fontFamily, "MyPenguin");
              }))
            : test("jest, silly jest, it's OK not to have a test!", function () {
                return assert.eq(1, 1);
              });
        }
      );
    }
  );
});
