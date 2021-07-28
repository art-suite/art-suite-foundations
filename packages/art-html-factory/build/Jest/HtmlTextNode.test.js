"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["describe", "test", "HtmlTextNode", "assert", "Div", "P", "merge"],
    [global, require("./StandardImport")],
    (describe, test, HtmlTextNode, assert, Div, P, merge) => {
      return describe({
        basics: function () {
          test("new", () => {
            let node;
            node = new HtmlTextNode("div", { class: "fooClass" }, [
              "string child",
            ]);
            return assert.eq(
              node.toString({ indent: "", tagWrap: 1 }),
              '<div class="fooClass">\n  string child\n</div>'
            );
          });
          return test("style is stringified", () => {
            let node;
            node = new HtmlTextNode("div", {
              style: { "font-size": "10pt", color: "#f00" },
            });
            return assert.eq(
              node.toString(),
              '<div style="color: #f00; font-size: 10pt"></div>'
            );
          });
        },
        styleString: function () {
          return test("styleString with no style should be undefined", () =>
            assert.equal(Div().styleString, undefined));
        },
        inspect: function () {
          return test("indect", () =>
            assert.eq(
              Div({ class: "colored" }, "hi", P("About-me"), P("Details"))
                .inspectedObjects,
              {
                div: {
                  props: { class: "colored" },
                  children: [
                    "hi",
                    { p: { children: ["About-me"] } },
                    { p: { children: ["Details"] } },
                  ],
                },
              }
            ));
        },
        clone: function () {
          test("just clone", () =>
            assert.eq(Div().clone().inspectedObjects, { div: {} }));
          test("update style", () => {
            let node, node2;
            node = Div({ style: { "font-size": "10pt", color: "#f00" } });
            node2 = node.clone({
              props: merge(node.props, {
                style: merge(node.style, { "font-size": "5pt" }),
              }),
            });
            assert.eq(
              node.toString(),
              '<div style="color: #f00; font-size: 10pt"></div>'
            );
            assert.eq(
              node2.toString(),
              '<div style="color: #f00; font-size: 5pt"></div>'
            );
            return assert.eq(
              node.toString(),
              '<div style="color: #f00; font-size: 10pt"></div>'
            );
          });
          test("clone understands empty props and children", () => {
            let node;
            node = Div().clone({ props: {}, children: [] });
            assert.equal(node.props, undefined);
            return assert.equal(node.children, undefined);
          });
          test("clone clears props and children when null passed", () => {
            let node;
            node = Div({ foo: "bar" }, P("hi")).clone({
              props: null,
              children: null,
            });
            assert.equal(node.props, undefined);
            return assert.equal(node.children, undefined);
          });
          test("clone makes full clone when undefined passed", () => {
            let node, rawProps, node2;
            node = Div((rawProps = { foo: "bar" }), P("hi"));
            node2 = node.clone({ props: undefined, children: undefined });
            assert.equal(node2.props, rawProps);
            assert.equal(node2.props, node.props);
            return assert.equal(node2.children, node.children);
          });
          test("update children", () => {
            let node, node2;
            node = Div(P("some text"), P("some other text"));
            node2 = node.clone({
              children: Caf.array(node.children, (child) =>
                child.clone({
                  props: merge(child.props, {
                    style: merge(child.style, { "font-size": "5pt" }),
                  }),
                })
              ),
            });
            assert.notSame(node.children, node2.children);
            assert.eq(
              node.toString(),
              "<div>\n  <p>some text</p>\n  <p>some other text</p>\n</div>"
            );
            return assert.eq(
              node2.toString(),
              '<div>\n  <p style="font-size: 5pt">some text</p>\n  <p style="font-size: 5pt">some other text</p>\n</div>'
            );
          });
          test("with", () =>
            assert.eq(
              Div().with({ props: { class: "myClass" } }).inspectedObjects,
              { div: { props: { class: "myClass" } } }
            ));
          test("withProps", () =>
            assert.eq(
              Div().withProps({ class: "myClass" }, { class: "foo" })
                .inspectedObjects,
              { div: { props: { class: "myClass foo" } } }
            ));
          test("withProps replaces", () =>
            assert.eq(
              Div({ class: "myClass" }).withProps({ class: "foo" })
                .inspectedObjects,
              { div: { props: { class: "foo" } } }
            ));
          test("withMergedProps merges", () =>
            assert.eq(
              Div({ class: "myClass" }).withMergedProps({ class: "foo" })
                .inspectedObjects,
              { div: { props: { class: "myClass foo" } } }
            ));
          test("withChildren replaces", () =>
            assert.eq(
              Div("wasBefore").withChildren("wasAfter", "andMore")
                .inspectedObjects,
              { div: { children: ["wasAfter", "andMore"] } }
            ));
          return test("withAppendedChildren concats", () =>
            assert.eq(
              Div("wasBefore").withAppendedChildren("wasAfter", "andMore")
                .inspectedObjects,
              { div: { children: ["wasBefore", "wasAfter", "andMore"] } }
            ));
        },
      });
    }
  );
});
