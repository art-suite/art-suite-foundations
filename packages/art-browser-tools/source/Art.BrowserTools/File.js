"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Promise", "createElementFromHtml"],
    [global, require("./StandardImport"), require("./Dom")],
    (Promise, createElementFromHtml) => {
      let File;
      return (File = Caf.defClass(
        class File extends Object {},
        function (File, classSuper, instanceSuper) {
          this.request = (options = {}) =>
            new Promise((resolvePromise, reject) => {
              let accept, multiple, onChange, body, fileInput, base;
              accept = options.accept;
              multiple = options.multiple;
              onChange = options.onChange;
              Caf.exists((base = this.hiddenDivForFileInput)) &&
                base.parentNode.removeChild(this.hiddenDivForFileInput);
              this.hiddenDivForFileInput = createElementFromHtml(
                "<div style='height: 0px;width: 0px; overflow:hidden; position:absolute;'/>"
              );
              body = global.document.body;
              fileInput = createElementFromHtml(
                `<input type='file' ${Caf.toString(
                  accept ? "accept=" + accept : undefined
                )} ${Caf.toString(multiple ? "multiple=true" : undefined)} />`
              );
              this.hiddenDivForFileInput.appendChild(fileInput);
              body.appendChild(this.hiddenDivForFileInput);
              fileInput.onchange = (e) => {
                let fileList, from, into, to, i, temp;
                fileList =
                  ((from = fileInput.files),
                  (into = []),
                  from != null
                    ? ((to = from.length),
                      (i = 0),
                      (() => {
                        while (i < to) {
                          let v;
                          v = from[i];
                          into.push(v);
                          temp = i++;
                        }
                        return temp;
                      })())
                    : undefined,
                  into);
                return fileList.length > 0 && fileList[0]
                  ? (onChange && onChange(fileList), resolvePromise(fileList))
                  : reject("no files returned");
              };
              return fileInput.click();
            });
        }
      ));
    }
  );
});
