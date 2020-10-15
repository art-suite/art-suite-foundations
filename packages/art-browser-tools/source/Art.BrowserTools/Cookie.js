"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["isString", "isPlainArray", "isPlainObject", "Error", "JSON", "Date"],
    [global, require("./StandardImport")],
    (isString, isPlainArray, isPlainObject, Error, JSON, Date) => {
      let document, setCookie, Cookie;
      document = global.document;
      setCookie = function(cookieName, cookieValue, { expires, path }) {
        let cookieString, d;
        if (!isString(cookieValue)) {
          if (!(isPlainArray(cookieValue) || isPlainObject(cookieValue))) {
            throw new Error("cookieValue must be a string, array or object");
          }
          cookieValue = JSON.stringify(cookieValue);
        }
        cookieString = `${Caf.toString(cookieName)}=${Caf.toString(
          cookieValue
        )}`;
        if (expires) {
          d = new Date();
          d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
          cookieString += `; expires=${Caf.toString(d.toUTCString())}`;
        }
        if (path) {
          cookieString += `; path=${Caf.toString(path)}`;
        }
        return (document.cookie = cookieString);
      };
      return (Cookie = Caf.defClass(class Cookie extends Object {}, function(
        Cookie,
        classSuper,
        instanceSuper
      ) {
        this.set = function(name, value, options) {
          return setCookie(name, value, options);
        };
        this.remove = function(name, options) {
          return setCookie(name, { path: options.path, expires: -1 });
        };
        this.get = function(cookieName) {
          let name, ca, value;
          name = cookieName + "=";
          ca = document.cookie.split(";");
          value = null;
          Caf.each2(
            ca,
            c => {
              while (" " === c.charAt(0)) {
                c = c.substring(1);
              }
              return 0 === c.indexOf(name)
                ? ((value = c.substring(name.length, c.length)),
                  value.match(/^[{[]/)
                    ? (value = JSON.parse(value))
                    : undefined)
                : undefined;
            },
            c => !value
          );
          return value;
        };
      }));
    }
  );
});
