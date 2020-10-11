"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["binary", "console"],
    [global, require("./StandardImport")],
    (binary, console) => {
      let window, document, Download, temp;
      temp = global;
      window = temp.window;
      document = temp.document;
      return (Download = Caf.defClass(
        class Download extends Object {},
        function(Download, classSuper, instanceSuper) {
          this.downloadBinaryData = function(filename, binaryData, mimeType) {
            let blob;
            binaryData = binary(binaryData);
            return global.navigator.msSaveOrOpenBlob != null
              ? ((blob = binaryData.toBlob(mimeType)),
                window.navigator.msSaveOrOpenBlob(blob, filename))
              : binaryData
                  .toDataUri(mimeType)
                  .then(uri => Download.downloadFromUrl(uri, filename));
          };
          this.downloadFromUrl = function(url, filename) {
            let e;
            e = document.createElement("a");
            e.setAttribute("href", url);
            e.setAttribute("download", filename);
            e.setAttribute("target", "_blank");
            document.body.appendChild(e);
            e.click();
            return document.body.removeChild(e);
          };
          this.startHtmlFileDownload = function(filename, url) {
            let element;
            element = document.createElement("a");
            element.setAttribute("target", "_blank");
            element.setAttribute("href", url);
            element.setAttribute("download", filename);
            element.style.display = "none";
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
            return console.log({ element });
          };
        }
      ));
    }
  );
});
