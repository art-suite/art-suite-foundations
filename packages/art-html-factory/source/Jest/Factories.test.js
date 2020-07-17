"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "describe",
      "String",
      "Error",
      "test",
      "assert",
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
      "B"
    ],
    [global, require("./StandardImport")],
    (
      describe,
      String,
      Error,
      test,
      assert,
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
      B
    ) => {
      let testFactoryToString;
      testFactoryToString = function(...args) {
        let from, into, to, i1, temp;
        return (
          (from = args),
          (into = from),
          from != null
            ? ((to = from.length),
              (i1 = 0),
              (() => {
                while (i1 < to) {
                  let nodeF, i, expectedOutput;
                  nodeF = from[i1];
                  i = i1;
                  expectedOutput = args[i + 1];
                  if (!Caf.is(expectedOutput, String)) {
                    throw new Error(
                      `Expecting a string at index ${Caf.toString(
                        i + 1
                      )}! Make sure to pass an even number of pairs alternating between nodes and strings`
                    );
                  }
                  test(expectedOutput.replace(/\n/g, "\\n"), () =>
                    assert.eq(nodeF().toString(), expectedOutput, {
                      FactoryToStringTestNumber: 1 + i / 2
                    })
                  );
                  temp = i1 += 2;
                }
                return temp;
              })())
            : undefined,
          into
        );
      };
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
            { style: { fontSize: "10pt" } },
            { style: { color: "#f00" } }
          );
        },
        '<div style="color: #f00; fontSize: 10pt"></div>',
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
            () => Div("one<br>line"),
            "<div>one&lt;br&gt;line</div>"
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
        }
      });
    }
  );
});
