"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["createObjectTreeFactory", "BaseClass", "merge"],
    [global, require("./StandardImport")],
    (createObjectTreeFactory, BaseClass, merge) => {
      let Path, DirClass;
      Path = require("path");
      return createObjectTreeFactory(
        (DirClass = Caf.defClass(
          class DirClass extends BaseClass {
            constructor(props = {}, children = []) {
              let dirname;
              super(...arguments);
              this.props = props;
              this.children = children;
              [dirname, ...children] = this.children;
              this.props.dirname = dirname;
              this.children = children;
            }
          },
          function (DirClass, classSuper, instanceSuper) {
            this.getter({
              plainObjects: function () {
                return {
                  [this.props.dirname]: merge(
                    ...Caf.array(
                      this.children,
                      (child) => child.plainObjects || child
                    )
                  ),
                };
              },
            });
            this.prototype.write = function (options = {}) {
              let path;
              path = Path.join(options.path || ".", this.props.dirname);
              return Caf.array(this.children, (child) =>
                child.write(merge(options, { path }))
              );
            };
          }
        ))
      );
    }
  );
});
