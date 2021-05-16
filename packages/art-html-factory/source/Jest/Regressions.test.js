"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert", "Html", "Head", "Meta", "Body", "H1", "P"],
    [global, require("./StandardImport")],
    (test, assert, Html, Head, Meta, Body, H1, P) => {
      test("should be no prop named Object eported", function () {
        return assert.doesNotExist(require("../Art.HtmlFactory").Object);
      });
      return test("demo", function () {
        return assert.eq(
          Html(
            Head(
              Meta({
                name: "viewport",
                content:
                  "user-scalable=no, width=device-width, initial-scale=1.0, viewport-fit=cover",
              }),
              Meta({ name: "apple-mobile-web-app-capable", content: "yes" }),
              Meta({
                name: "apple-mobile-web-app-status-bar-style",
                content: "black",
              }),
              Meta({ name: "format-detection", content: "telephone=no" })
            ),
            Body(
              H1("Art.ObjectTreeFactory"),
              P("simple, elegant, fast declarative tree generation library")
            )
          ).toString(),
          '<html>\n  <head>\n    <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, viewport-fit=cover">\n    <meta name="apple-mobile-web-app-capable" content="yes">\n    <meta name="apple-mobile-web-app-status-bar-style" content="black">\n    <meta name="format-detection" content="telephone=no">\n  </head>\n  <body>\n    <h1>Art.ObjectTreeFactory</h1>\n    <p>simple, elegant, fast declarative tree generation library</p>\n  </body>\n</html>'
        );
      });
    }
  );
});
