"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "testFactoryToString",
      "describe",
      "Div",
      "Script",
      "Header",
      "H1",
      "H2",
      "P",
      "Body",
      "RawHtml",
      "Br",
      "Html",
      "Head",
      "Style",
      "Img",
      "Meta",
      "Link",
      "Pre",
      "test",
      "assert",
      "B",
      "createHtmlFactories",
      "A"
    ],
    [global, require("./StandardImport"), require("./Lib")],
    (
      testFactoryToString,
      describe,
      Div,
      Script,
      Header,
      H1,
      H2,
      P,
      Body,
      RawHtml,
      Br,
      Html,
      Head,
      Style,
      Img,
      Meta,
      Link,
      Pre,
      test,
      assert,
      B,
      createHtmlFactories,
      A
    ) => {
      testFactoryToString(
        function() {
          return Div({ class: "fooClass" }, "string child");
        },
        '<div class="fooClass">string child</div>',
        function() {
          return Div({ class: "fooClass" }, { id: "barId" });
        },
        '<div class="fooClass" id="barId"></div>',
        function() {
          return Div(
            { style: { "font-size": "10pt" } },
            { style: { color: "#f00" } }
          );
        },
        '<div style="color: #f00; font-size: 10pt"></div>',
        function() {
          return Div([null, Div(), undefined]);
        },
        "<div><div></div></div>",
        function() {
          return Script({ async: true }, "alert(1);");
        },
        "<script async>alert(1);</script>",
        function() {
          return Header(
            H1("The most Amazing Page Ever"),
            H2("You simply have to read it.")
          );
        },
        "<header>\n  <h1>The most Amazing Page Ever</h1>\n  <h2>You simply have to read it.</h2>\n</header>",
        function() {
          return P(
            "Sweet donut biscuit tiramisu tart. Chocolate powder lollipop. Candy canes donut gummi bears marshmallow tiramisu. Sesame snaps fruitcake danish bonbon cupcake cheesecake soufflé cupcake. Tiramisu jelly-o cotton candy fruitcake. Gingerbread icing macaroon sesame snaps cotton candy chocolate. Pudding cookie gummies marshmallow jelly beans cheesecake. Marshmallow jelly beans liquorice gummi bears carrot cake pastry cake tootsie roll donut. Caramels cotton candy lemon drops marshmallow danish. Lollipop sugar plum gummies. Jelly-o carrot cake sugar plum icing brownie sesame snaps lollipop brownie. Apple pie gummi bears pudding liquorice."
          );
        },
        "<p>\n  Sweet donut biscuit tiramisu tart. Chocolate powder lollipop. Candy canes donut\n  gummi bears marshmallow tiramisu. Sesame snaps fruitcake danish bonbon cupcake\n  cheesecake soufflé cupcake. Tiramisu jelly-o cotton candy fruitcake. Gingerbread\n  icing macaroon sesame snaps cotton candy chocolate. Pudding cookie gummies\n  marshmallow jelly beans cheesecake. Marshmallow jelly beans liquorice gummi\n  bears carrot cake pastry cake tootsie roll donut. Caramels cotton candy lemon\n  drops marshmallow danish. Lollipop sugar plum gummies. Jelly-o carrot cake sugar\n  plum icing brownie sesame snaps lollipop brownie. Apple pie gummi bears pudding\n  liquorice.\n</p>"
      );
      return describe({
        escaping: function() {
          return testFactoryToString(
            () => Div({ prop: "<foo>" }),
            '<div prop="&lt;foo&gt;"></div>'
          );
        },
        merging: {
          caseSensativity: function() {
            return testFactoryToString(
              () => Div({ style: { Color: "#abc123" } }),
              '<div style="Color: #abc123"></div>',
              () => Div({ class: "FooBar" }),
              '<div class="FooBar"></div>'
            );
          },
          style: function() {
            return testFactoryToString(
              () =>
                Div(
                  { style: { color: "#abc123" } },
                  { style: { height: "100px" } }
                ),
              '<div style="color: #abc123; height: 100px"></div>'
            );
          },
          "style-reset": function() {
            return testFactoryToString(
              () =>
                Div(
                  { style: { color: "#abc123" } },
                  { style: null },
                  { style: { height: "100px" } }
                ),
              '<div style="height: 100px"></div>'
            );
          },
          class: function() {
            return testFactoryToString(
              () => Div({ class: "ROW" }, { class: "border-1px" }),
              '<div class="ROW border-1px"></div>'
            );
          },
          "class-reset": function() {
            return testFactoryToString(
              () =>
                Div({ class: "row" }, { class: null }, { class: "border-1px" }),
              '<div class="border-1px"></div>'
            );
          }
        },
        textWordWrappingDefaultBehavior: function() {
          return testFactoryToString(
            () => Div("one line\ntwo line"),
            "<div>one line two line</div>",
            () => Div("one line\n\ntwo line"),
            "<div>\n  one line\n\n  two line\n</div>",
            () => Body(Div("one line\n\ntwo line")),
            "<body>\n  <div>\n    one line\n\n    two line\n  </div>\n</body>",
            () => Div("one", "line"),
            "<div>\n  one\n  line\n</div>"
          );
        },
        escape: function() {
          return testFactoryToString(
            () => Div("one<br>&nbsp;line"),
            "<div>one<br>&nbsp;line</div>"
          );
        },
        specialTags: {
          rawHtml: function() {
            return testFactoryToString(
              () =>
                RawHtml(
                  "<!-- RawHtml is here to escape in whatever you want -->\n<html>",
                  Body("With some children"),
                  "</html>"
                ),
              "<!-- RawHtml is here to escape in whatever you want -->\n<html>\n<body>\n  With some children\n</body>\n</html>"
            );
          },
          br: function() {
            return testFactoryToString(
              () => Div("one", Br(), "line"),
              "<div>\n  one\n  <br>\n  line\n</div>"
            );
          },
          script: function() {
            return testFactoryToString(
              () => Html(Head(Script('var tag = "<something>";'))),
              '<html><head><script>var tag = "<something>";</script></head></html>'
            );
          },
          style: function() {
            return testFactoryToString(
              () =>
                Html(
                  Head(
                    Style(
                      "@font-face {\n  font-family: proxima nova light;\n  font-style: normal;\n  font-weight: 400;\n}"
                    )
                  )
                ),
              "<html>\n  <head>\n    <style>\n      @font-face {\n        font-family: proxima nova light;\n        font-style: normal;\n        font-weight: 400;\n      }\n    </style>\n  </head>\n</html>"
            );
          },
          img: function() {
            return testFactoryToString(
              () => Div(Img({ src: "https://my.url.com/wonder_woman.jpg" })),
              '<div><img src="https://my.url.com/wonder_woman.jpg"></div>'
            );
          },
          meta: function() {
            return testFactoryToString(
              () => Html(Head(Meta({ myProp: "fine" }))),
              '<html><head><meta myProp="fine"></head></html>'
            );
          },
          link: function() {
            return testFactoryToString(
              () => Html(Head(Link({ myProp: "fine" }))),
              '<html><head><link myProp="fine"></head></html>'
            );
          },
          pre: function() {
            return testFactoryToString(
              () =>
                Div(
                  Pre(
                    "Pre tags can have HTML in them:\n\n<html><body>\n  Hello, world!\n</body></html>"
                  )
                ),
              "<div>\n  <pre>\nPre tags can have HTML in them:\n\n<html><body>\n  Hello, world!\n</body></html>\n  </pre>\n</div>"
            );
          }
        },
        length: function() {
          let testLength;
          testLength = (name, f) =>
            test(name, () => {
              let node;
              return assert.eq(
                (node = f()).length,
                node.toCompactString().length,
                node.toCompactString()
              );
            });
          testLength("P", () => P());
          testLength("P width: 10", () => P({ width: 10 }));
          testLength("P :hello", () => P("hello"));
          return testLength("P :hello B :bye", () => P("hello", B("bye")));
        },
        toString: function() {
          return test("with options", () =>
            assert.eq(
              Div(
                "Sweet donut biscuit tiramisu tart. Chocolate powder lollipop."
              ).toString({ indent: true, tagWrap: 20, textWordWrap: 20 }),
              "<div>\n  Sweet donut biscuit\n  tiramisu tart.\n  Chocolate powder\n  lollipop.\n</div>"
            ));
        },
        createHtmlFactories: function() {
          return test("custom Svg tags", () => {
            let Svg, Path;
            ({ Svg, Path } = createHtmlFactories("svg", "path"));
            return assert.eq(
              Svg(
                {
                  version: "1.1",
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "64",
                  height: "64",
                  viewBox: "0 0 64 64"
                },
                Path({ d: "M4 12h56v12h-56zM4 28h56v12h-56zM4 44h56v12h-56z" })
              ).toString(),
              '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">\n  <path d="M4 12h56v12h-56zM4 28h56v12h-56zM4 44h56v12h-56z"></path>\n</svg>'
            );
          });
        },
        regressions: function() {
          return test("merging styles", () => {
            let style;
            style = { color: "#ffbbcc" };
            return assert.eq(
              Div(
                { style },
                Div({ style }, { style: { "font-weight": 300 } })
              ).toString(),
              '<div style="color: #ffbbcc">\n  <div style="color: #ffbbcc; font-weight: 300"></div>\n</div>'
            );
          });
        },
        regressions: function() {},
        spanning: function() {
          return testFactoryToString(
            () =>
              Div(
                A("This is some text, right", Img({ src: "with-source-image" }))
              ),
            '<div>\n  <a>\n    This is some text, right\n    <img src="with-source-image"></a>\n</div>',
            () =>
              Div(
                A(
                  "This is some text, right, This is some text, right. This is some text, right! This is some text, right!!!"
                )
              ),
            "<div>\n  <a>\n    This is some text, right, This is some text, right. This is some text, right!\n    This is some text, right!!!</a>\n</div>"
          );
        }
      });
    }
  );
});
