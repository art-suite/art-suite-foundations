"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "self",
      "isPlainObject",
      "Error",
      "objectDiff",
      "String",
      "parseInt",
      "Math",
      "Promise",
    ],
    [global, require("./StandardImport")],
    (
      self,
      isPlainObject,
      Error,
      objectDiff,
      String,
      parseInt,
      Math,
      Promise
    ) => {
      let document, HTMLElement, window, Dom, temp;
      temp = global;
      document = temp.document;
      HTMLElement = temp.HTMLElement;
      window = temp.window;
      return (Dom = Caf.defClass(
        class Dom extends Object {},
        function (Dom, classSuper, instanceSuper) {
          let openLink;
          this.createElementFromHtml = function (html) {
            let div;
            div = document.createElement("div");
            div.innerHTML = html;
            return div.firstChild;
          };
          this.getDevicePixelRatio = function () {
            return (
              (self.devicePixelRatio != null && self.devicePixelRatio) || 1
            );
          };
          this.setDomElementProp = (element, prop, value, oldValue) => {
            let setStyle, clearStyle, style;
            return (() => {
              switch (prop) {
                case "class":
                  return (element.className = value || "");
                case "id":
                  return (element.id = value || "");
                case "innerHTML":
                  return (element.innerHTML = value || "");
                case "on":
                  if (!isPlainObject(value)) {
                    throw new Error("object expected for 'on' property");
                  }
                  setStyle = (eventType, newEventListener) =>
                    element.addEventListener(eventType, newEventListener);
                  clearStyle = (eventType, oldEventListener) =>
                    element.removeEventListner(eventType, oldEventListener);
                  return objectDiff(
                    value,
                    oldValue,
                    setStyle,
                    clearStyle,
                    setStyle
                  );
                case "style":
                  if (!isPlainObject(value)) {
                    throw new Error("object expected for 'style' property");
                  }
                  ({ style } = element);
                  setStyle = (k, v) => (style[k] = v);
                  clearStyle = (k) => (style[k] = "");
                  return objectDiff(
                    value,
                    oldValue,
                    setStyle,
                    clearStyle,
                    setStyle
                  );
                default:
                  return element.setAttribute(prop, value);
              }
            })();
          };
          this.setDomElementProps = (element, props) =>
            Caf.each2(props, (v, k) => this.setDomElementProp(element, k, v));
          this.setDomElementChildren = function (element, children) {
            let oldChildrenLength, newChildrenLength, from, into, to, i1, temp1;
            from = element.childNodes;
            into = from;
            if (from != null) {
              to = from.length;
              i1 = 0;
              while (i1 < to) {
                let oldChild, i, newChild;
                oldChild = from[i1];
                i = i1;
                if (i >= children.length) {
                  into = undefined;
                  break;
                }
                if (
                  Caf.is(newChild, String) &&
                  newChild !== oldChild.textContent
                ) {
                  element.replaceChild(
                    document.createTextNode(newChild),
                    oldChild
                  );
                } else {
                  if (oldChild !== (newChild = children[i])) {
                    element.replaceChild(newChild, oldChild);
                  }
                }
                i1++;
              }
            }
            into;
            oldChildrenLength = element.childNodes.length;
            newChildrenLength = children.length;
            while (oldChildrenLength > newChildrenLength) {
              oldChildrenLength--;
              element.removeChild(element.lastChild);
            }
            return (() => {
              while (newChildrenLength > oldChildrenLength) {
                let newChild;
                temp1 = element.appendChild(
                  Caf.is((newChild = children[oldChildrenLength++]), String)
                    ? document.createTextNode(newChild)
                    : newChild
                );
              }
              return temp1;
            })();
          };
          this.zIndex = function (target, setZIndex) {
            let element;
            if (!(target instanceof HTMLElement)) {
              target = document.getElementById(target);
            }
            if (setZIndex !== undefined) {
              return (target.style.zIndex = setZIndex);
            }
            element = target;
            while (element && element !== document) {
              let value;
              switch (element.style.position) {
                case "absolute":
                case "relative":
                case "fixed":
                  value = parseInt(element.style.zIndex);
                  if (value < 0 || value > 0) {
                    return value;
                  }
              }
              element = element.parentElement;
            }
            return 0;
          };
          this.domElementOffset = function (element) {
            let box,
              body,
              documentElement,
              scrollTop,
              scrollLeft,
              clientTop,
              clientLeft,
              top,
              left,
              e;
            return (() => {
              try {
                box = element.getBoundingClientRect();
                body = document.body;
                documentElement = document.documentElement;
                scrollTop =
                  window.pageYOffset ||
                  documentElement.scrollTop ||
                  body.scrollTop;
                scrollLeft =
                  window.pageXOffset ||
                  documentElement.scrollLeft ||
                  body.scrollLeft;
                clientTop = documentElement.clientTop || body.clientTop || 0;
                clientLeft = documentElement.clientLeft || body.clientLeft || 0;
                top = box.top + scrollTop - clientTop;
                left = box.left + scrollLeft - clientLeft;
                return { top: Math.round(top), left: Math.round(left) };
              } catch (error) {
                e = error;
                return { top: 0, left: 0 };
              }
            })();
          };
          this.getDomReadyPromise = function () {
            return new Promise((resolvePromise) =>
              !document || document.readyState !== "loading"
                ? resolvePromise()
                : document.addEventListener("readystatechange", () =>
                    document.readyState === "interactive"
                      ? resolvePromise()
                      : undefined
                  )
            );
          };
          this.openLink = openLink = function (link) {
            return global.open(link, "_blank");
          };
        }
      ));
    }
  );
});
