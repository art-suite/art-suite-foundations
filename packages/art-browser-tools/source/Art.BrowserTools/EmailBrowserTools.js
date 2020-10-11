"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["encodeUri", "openLink"],
    [
      global,
      require("./StandardImport"),
      require("./UriBrowserTools"),
      require("./Dom")
    ],
    (encodeUri, openLink) => {
      let EmailBrowserTools;
      return (EmailBrowserTools = Caf.defClass(
        class EmailBrowserTools extends Object {},
        function(EmailBrowserTools, classSuper, instanceSuper) {
          let encodeMailto;
          this.encodeMailto = encodeMailto = function(options) {
            let cc, bcc, subject, body, toField, temp;
            cc = options.cc;
            bcc = options.bcc;
            subject = options.subject;
            body = options.body;
            toField = undefined !== (temp = options.to) ? temp : "";
            return encodeUri({
              protocol: "mailto",
              path: toField,
              query: { cc, bcc, subject, body }
            });
          };
          this.sendEmail = function(options) {
            return openLink(encodeMailto(options));
          };
        }
      ));
    }
  );
});
