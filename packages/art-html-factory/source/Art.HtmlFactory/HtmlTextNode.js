"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "objectHasKeys",
      "String",
      "log",
      "merge",
      "Object",
      "hasProperties",
      "rawHtmlTags",
      "escapeHtmlString",
      "compactFlatten",
      "compactFlattenJoin",
      "wrapAnsi",
      "noCloseTags",
      "isString"
    ],
    [
      global,
      require("art-standard-lib"),
      require("./HtmlLib"),
      { wrapAnsi: require("wrap-ansi") }
    ],
    (
      objectHasKeys,
      String,
      log,
      merge,
      Object,
      hasProperties,
      rawHtmlTags,
      escapeHtmlString,
      compactFlatten,
      compactFlattenJoin,
      wrapAnsi,
      noCloseTags,
      isString
    ) => {
      let HtmlTextNode;
      return (HtmlTextNode = Caf.defClass(
        class HtmlTextNode extends require("art-class-system").BaseClass {
          constructor(_name, _props, _children) {
            super(...arguments);
            this._name = _name;
            this._props = _props;
            this._children = _children;
            this._name = this._name.toLocaleLowerCase();
            this._normalizeChildren();
          }
        },
        function(HtmlTextNode, classSuper, instanceSuper) {
          let reformatTextForNiceHtmlSource,
            emptyString,
            emptyOptions,
            htmlFriendlyTextWrap,
            applyIndent;
          this.prototype.clone = function(withNewValues) {
            let name, props, children;
            if (Caf.exists(withNewValues)) {
              name = withNewValues.name;
              props = withNewValues.props;
              children = withNewValues.children;
            }
            if (!(props === null)) {
              props != null ? props : (props = this._props);
            }
            if (!(children === null)) {
              children != null ? children : (children = this._children);
            }
            return new this.class(
              name != null ? name : this._name,
              props != null && objectHasKeys(props) ? props : undefined,
              (Caf.exists(children) && children.length) > 0
                ? children
                : undefined
            );
          };
          this.prototype._normalizeChildren = function() {
            let temp;
            this._haveStringChildrenWithNewLines = false;
            return this._children != null
              ? (this._children =
                  (temp = Caf.find(
                    this._children,
                    child =>
                      Caf.array(this._children, child => {
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
                    : this._children)
              : undefined;
          };
          reformatTextForNiceHtmlSource = function(text) {
            return /\n *\n/.test(text)
              ? Caf.array(
                  text.replace(/\ *\n( *\n)+/g, "\n\n").split("\n\n"),
                  p => p.replace(/\ *\n\ */g, " ")
                ).join("\n\n")
              : text.replace(/\n/, " ");
          };
          this.prototype._getNormalizedText = function(text) {
            return this.preserveRawText
              ? text
              : reformatTextForNiceHtmlSource(text);
          };
          this.setter({
            style: function(style) {
              log.warn(
                "HtmlTextNode#style setter is DEPRICATED - use @clone to create a new object with new style"
              );
              return (this._props = merge(this._props, { style }));
            },
            props: function(props) {
              let style;
              return (this._props = [
                log.warn(
                  "HtmlTextNode#props setter is DEPRICATED - use @clone to create a new object with new props"
                ),
                (this._style = Caf.exists(props)
                  ? (style = props.style)
                  : undefined)
                  ? (props = merge(props, {
                      style: Caf.array(
                        Object.keys(style).sort(),
                        name =>
                          `${Caf.toString(name)}: ${Caf.toString(style[name])}`
                      ).join("; ")
                    }))
                  : hasProperties(props)
                  ? props
                  : null
              ]);
            }
          });
          emptyString = "";
          this.getter("props", "name", "children", {
            inspectedObjects: function() {
              return {
                [this.name]: merge({
                  props: this.props,
                  children: this.children
                    ? Caf.array(this.children, child => {
                        let temp;
                        return (temp = child.inspectedObjects) != null
                          ? temp
                          : child;
                      })
                    : undefined
                })
              };
            },
            style: function() {
              let base;
              return Caf.exists((base = this._props)) && base.style;
            },
            preserveRawText: function() {
              return rawHtmlTags[this._name];
            },
            isRawHtml: function() {
              return this._name === "rawhtml";
            },
            isPre: function() {
              return this._name === "pre";
            },
            childRequireMultipleLines: function() {
              return (
                !!this._children &&
                (this._children.length > 1 ||
                  this._children[0].onelinerOk === false)
              );
            },
            onelinerOk: function() {
              return (
                !this._haveStringChildrenWithNewLines &&
                !this.childRequireMultipleLines
              );
            },
            length: function() {
              let temp;
              return (temp = this._length) != null
                ? temp
                : (this._length =
                    5 +
                    this._name.length * 2 +
                    this.propsString.length +
                    Caf.reduce(
                      this._children,
                      (total, v) => total + v.length,
                      null,
                      0
                    ));
            },
            styleString: function() {
              let style, temp, from, into, to, i, temp1;
              style = this.style;
              return (temp = this._styleString) != null
                ? temp
                : (this._styleString = ((from = Object.keys(style).sort()),
                  (into = []),
                  from != null
                    ? ((to = from.length),
                      (i = 0),
                      (() => {
                        while (i < to) {
                          let name;
                          name = from[i];
                          into.push(
                            `${Caf.toString(name)}: ${Caf.toString(
                              style[name]
                            )}`
                          );
                          temp1 = i++;
                        }
                        return temp1;
                      })())
                    : undefined,
                  into).join("; "));
            },
            propsString: function() {
              let temp, temp1;
              return (temp = this._propsString) != null
                ? temp
                : (this._propsString =
                    (temp1 = this._props
                      ? " " +
                        Caf.array(this._props, (propValue, propName) => {
                          if (propName === "style") {
                            propValue = this.styleString;
                          }
                          return propValue === true
                            ? propName
                            : `${Caf.toString(propName)}="${Caf.toString(
                                escapeHtmlString(propValue)
                              )}"`;
                        }).join(" ")
                      : undefined) != null
                      ? temp1
                      : emptyString);
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
            return this.isRawHtml && this._children
              ? this._getCompiledChildren(indent, emptyOptions)
              : indent != null &&
                indent.length + this.length <= options.tagWrap &&
                this.onelinerOk
              ? indent + this.toCompactString()
              : (compiledChildren = this._getCompiledChildren(indent, options))
              ? [
                  applyIndent(
                    indent,
                    `<${Caf.toString(this._name)}${Caf.toString(
                      this.propsString
                    )}>`
                  ),
                  compiledChildren,
                  applyIndent(indent, `</${Caf.toString(this._name)}>`)
                ]
              : noCloseTags[this._name]
              ? applyIndent(
                  indent,
                  `<${Caf.toString(this._name)}${Caf.toString(
                    this.propsString
                  )}>`
                )
              : applyIndent(
                  indent,
                  `<${Caf.toString(this._name)}${Caf.toString(
                    this.propsString
                  )}></${Caf.toString(this._name)}>`
                );
          };
          this.prototype._getCompiledChildren = function(indent, options) {
            return this._children
              ? (indent != null && !this.isRawHtml
                  ? (indent = indent + "  ")
                  : undefined,
                Caf.array(this._children, child =>
                  isString(child)
                    ? this._name !== "pre"
                      ? applyIndent(
                          indent,
                          child,
                          !this.preserveRawText
                            ? options.textWordWrap
                            : undefined
                        )
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
