"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return [
    { createHtmlFactories: require("./createHtmlFactories") },
    require("./createHtmlFactories")(require("./HtmlLib").supportedTagsList)
  ];
});
