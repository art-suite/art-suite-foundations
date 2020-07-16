"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "hasProperties",
      "String",
      "Object",
      "merge",
      "compactFlatten",
      "compactFlattenJoin",
      "wrapAnsi",
      "isString"
    ],
    [global, require("art-standard-lib"), { wrapAnsi: require("wrap-ansi") }],
    (
      hasProperties,
      String,
      Object,
      merge,
      compactFlatten,
      compactFlattenJoin,
      wrapAnsi,
      isString
    ) => {
      let noCloseTag, HtmlTextNode;
      noCloseTag = { link: true, meta: true, img: true, br: true };
      return (HtmlTextNode = Caf.defClass(
        class HtmlTextNode extends require("art-class-system").BaseClass {
          constructor(name, props, children) {
            super(...arguments);
            this.name = name;
            this.props = props;
            this.children = children;
            this.name = this.name.toLocaleLowerCase();
            this._normalizeProps();
            this._normalizeChildren();
          }
        },
        function(HtmlTextNode, classSuper, instanceSuper) {
          let htmlEscapes,
            getHtmlEscape,
            escapeHtmlString,
            emptyOptions,
            htmlFriendlyTextWrap,
            applyIndent;
          this.prototype._normalizeProps = function() {
            return hasProperties(this.props)
              ? this.props.style
                ? ((this.style = this.props.style),
                  (this.props.style = Caf.array(
                    this.style,
                    (value, name) =>
                      `${Caf.toString(name)}: ${Caf.toString(value)}`
                  ).join("; ")))
                : undefined
              : (this.props = null);
          };
          this.prototype._normalizeChildren = function() {
            let temp;
            this._haveStringChildrenWithNewLines = false;
            return this.children != null
              ? (this.children =
                  (temp = Caf.find(
                    this.children,
                    child =>
                      Caf.array(this.children, child => {
                        if (Caf.is(child, String)) {
                          child = this._getNormalizedText(child);
                          if (/\n/.test(child)) {
                            this._haveStringChildrenWithNewLines = true;
                          }
                        }
                        return child;
                      }),
                    child => Caf.is(child, String)
                  )) != null
                    ? temp
                    : this.children)
              : undefined;
          };
          this.prototype._getNormalizedText = function(text) {
            return !(this.isPre || this.isRawHtml)
              ? escapeHtmlString(
                  /\n *\n/.test(text)
                    ? Caf.array(
                        text.replace(/\ *\n( *\n)+/g, "\n\n").split("\n\n"),
                        p => p.replace(/\ *\n\ */g, " ")
                      ).join("\n\n")
                    : text.replace(/\n/, " ")
                )
              : text;
          };
          this.htmlEscapes = htmlEscapes = {
            '"': "&quot;",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;"
          };
          getHtmlEscape = function(e) {
            return htmlEscapes[e];
          };
          this.escapeHtmlString = escapeHtmlString = function(string) {
            string = `${Caf.toString(string)}`;
            return /["<>&]/.test(string)
              ? string.replace(/["<>&]/g, getHtmlEscape)
              : string;
          };
          this.getter({
            isRawHtml: function() {
              return this.name === "rawhtml";
            },
            isPre: function() {
              return this.name === "pre";
            },
            childRequiresMultipleLines: function() {
              return (
                !!this.children &&
                (this.children.length > 1 ||
                  this.children[0].onelinerOk === false)
              );
            },
            onelinerOk: function() {
              return (
                !this._haveStringChildrenWithNewLines &&
                !this.childRequiresMultipleLines
              );
            },
            length: function() {
              return (
                5 +
                this.name.length * 2 +
                Caf.reduce(
                  this.props,
                  (total, v, k) =>
                    total + 4 + k.length + `${Caf.toString(v)}`.length,
                  null,
                  0
                ) +
                Caf.reduce(
                  this.children,
                  (total, v) => total + v.length,
                  null,
                  0
                )
              );
            },
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
          this.defaultCompileOptions = { tagWrap: 80, textWordWrap: 80 };
          this.prototype.compile = function(indentOrOptions) {
            let indent, options;
            if (Caf.is(indentOrOptions, String)) {
              indent = indentOrOptions;
              options = HtmlTextNode.defaultCompileOptions;
            } else {
              if (Caf.is(indentOrOptions, Object)) {
                indent = indentOrOptions.indent;
                ({ indent } = options = merge(
                  HtmlTextNode.defaultCompileOptions,
                  indentOrOptions
                ));
              }
            }
            if (indent === true) {
              indent = "";
            }
            return compactFlatten(this._compile(indent, options));
          };
          this.prototype.toString = function(options = "") {
            return this.compile(options).join("\n");
          };
          emptyOptions = {};
          this.prototype.toCompactString = function() {
            return compactFlattenJoin("", this._compile(null, emptyOptions));
          };
          htmlFriendlyTextWrap = function(line, columns) {
            return wrapAnsi(line.replace(/\ *\n( *\n)/g, "\n\n"), columns);
          };
          applyIndent = function(indent, line, columns) {
            if (columns > 0) {
              line = htmlFriendlyTextWrap(line, columns);
            }
            return indent != null
              ? indent + line.replace(/\n(?!\n)/g, `\n${Caf.toString(indent)}`)
              : line;
          };
          this.prototype._compile = function(indent, options) {
            let compiledChildren;
            return this.isRawHtml && this.children
              ? this._getCompiledChildren(indent, emptyOptions)
              : indent != null &&
                indent.length + this.length <= options.tagWrap &&
                this.onelinerOk
              ? indent + this.toCompactString()
              : (compiledChildren = this._getCompiledChildren(indent, options))
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
              : noCloseTag[this.name]
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
          };
          this.prototype._getCompiledChildren = function(indent, options) {
            return this.children
              ? (indent != null && !this.isRawHtml
                  ? (indent = indent + "  ")
                  : undefined,
                Caf.array(this.children, child =>
                  isString(child)
                    ? this.name !== "pre"
                      ? applyIndent(indent, child, options.textWordWrap)
                      : child
                    : child._compile(indent, options)
                ))
              : undefined;
          };
        }
      ));
    }
  );
});
