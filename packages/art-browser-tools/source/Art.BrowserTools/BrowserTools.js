"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return (() => {
    return [
      require("./Download"),
      require("./Dom"),
      require("./EmailBrowserTools"),
      require("./UriBrowserTools"),
      require("./BrowserDetection"),
      require("./UseragentRegExp"),
      { iPhoneDeviceInformation: require("./iPhoneDeviceInformation") }
    ];
  })();
});
