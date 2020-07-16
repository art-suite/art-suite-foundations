"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["compactFlatten", "isString", "hasProperties", "present", "peek"],
    [global, require("art-standard-lib")],
    (compactFlatten, isString, hasProperties, present, peek) => {
      let HtmlTextNode;
      return (HtmlTextNode = Caf.defClass(
        class HtmlTextNode extends require("art-class-system").BaseClass {
          constructor(name, props, children) {
            let src;
            super(...arguments);
            this.name = name;
            this.props = props;
            this.children = children;
            this.name = this.name.toLocaleLowerCase();
            if (hasProperties(this.props)) {
              if (this.props.style) {
                this.style = this.props.style;
                this.props.style = Caf.array(
                  this.style,
                  (value, name) =>
                    `${Caf.toString(name)}: ${Caf.toString(value)}`
                ).join("; ");
              }
              if (
                this.name === "img" &&
                !present(this.props.alt) &&
                present((src = this.props.src))
              ) {
                this.props.alt = peek(src.split("/")).split("?")[0];
              }
            } else {
              this.props = null;
            }
          }
        },
        function(HtmlTextNode, classSuper, instanceSuper) {
          let escapeHtmlString, applyIndent;
          this.escapeHtmlString = escapeHtmlString = function(string = "") {
            return `${Caf.toString(string)}`.replace(/["<>&]/, match =>
              (() => {
                switch (match) {
                  case '"':
                    return "&quot;";
                  case "&":
                    return "&amp;";
                  case "<":
                    return "&lt;";
                  case ">":
                    return "&gt;";
                }
              })()
            );
          };
          this.getter({
            propsString: function() {
              return this.props
                ? " " +
                    Caf.array(this.props, (propValue, propName) =>
                      propValue === true
                        ? propName
                        : `${Caf.toString(propName)}="${Caf.toString(
                            escapeHtmlString(propValue)
                          )}"`
                    ).join(" ")
                : undefined;
            }
          });
          this.prototype.compile = function(indent) {
            return compactFlatten(this._compile(indent));
          };
          this.prototype.toString = function() {
            return this.compile("").join("\n");
          };
          applyIndent = function(indent, line) {
            return indent ? indent + line : line;
          };
          this.prototype._compile = function(indent) {
            let compiledChildren;
            return (() => {
              switch (this.name) {
                case "a":
                case "b":
                  return [
                    `<${Caf.toString(this.name)}${Caf.toString(
                      this.propsString
                    )}>`,
                    this._getCompiledChildren(),
                    `</${Caf.toString(this.name)}>`
                  ].join("");
                case "barehtml":
                  return this._getCompiledChildren(indent);
                default:
                  return (compiledChildren = this._getCompiledChildren(indent))
                    ? [
                        applyIndent(
                          indent,
                          `<${Caf.toString(this.name)}${Caf.toString(
                            this.propsString
                          )}>`
                        ),
                        compiledChildren,
                        applyIndent(indent, `</${Caf.toString(this.name)}>`)
                      ]
                    : this.name === "link" ||
                      this.name === "meta" ||
                      this.name === "img"
                    ? applyIndent(
                        indent,
                        `<${Caf.toString(this.name)}${Caf.toString(
                          this.propsString
                        )}>`
                      )
                    : applyIndent(
                        indent,
                        `<${Caf.toString(this.name)}${Caf.toString(
                          this.propsString
                        )}></${Caf.toString(this.name)}>`
                      );
              }
            })();
          };
          this.prototype._getCompiledChildren = function(indent) {
            let base;
            return (Caf.exists((base = this.children)) && base.length) > 0
              ? (indent != null && this.name !== "barehtml"
                  ? (indent = indent + "  ")
                  : undefined,
                Caf.array(this.children, child =>
                  isString(child)
                    ? indent != null && this.name !== "pre"
                      ? `${Caf.toString(indent)}${Caf.toString(
                          child.replace(/\n/g, `\n${Caf.toString(indent)}`)
                        )}`
                      : child
                    : child._compile(indent)
                ))
              : undefined;
          };
        }
      ));
    }
  );
});
