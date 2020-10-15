"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return [
    require("./HtmlFactoryLib"),
    require("./HtmlFactoryLib").createHtmlFactories(
      require("./HtmlLib").supportedTagsList
    )
  ];
});
