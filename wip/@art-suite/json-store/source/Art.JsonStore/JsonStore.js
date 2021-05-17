"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["ClassSystem", "JSON", "log", "Promise", "json", "isNumber"],
    [global, require("art-standard-lib"), require("art-class-system")],
    (ClassSystem, JSON, log, Promise, json, isNumber) => {
      let AsyncLocalStorage, BaseObject, JsonStore;
      AsyncLocalStorage = require("./AsyncLocalStorage");
      ({ BaseObject } = ClassSystem);
      return (module.exports = JsonStore =
        Caf.defClass(
          class JsonStore extends BaseObject {
            constructor(store = AsyncLocalStorage) {
              super(...arguments);
              this.store = store;
            }
          },
          function (JsonStore, classSuper, instanceSuper) {
            this.singletonClass();
            this.prototype.setItem = function (key, value) {
              let json;
              json = null;
              return this.store
                .getItem(key)
                .then((oldJson) =>
                  oldJson !== (json = JSON.stringify(value))
                    ? this.store.setItem(key, json).then(() => json)
                    : null
                )
                .catch((error) => {
                  log.error({ JsonStore_setItem: { key, value, json, error } });
                  return (() => {
                    throw error;
                  })();
                });
            };
            this.prototype.getItem = function (key) {
              return Promise.then(() => this.store.getItem(key))
                .then((json) => json && JSON.parse(json))
                .catch((error) => {
                  log.error({ JsonStore_getItem: { key, json, error } });
                  return (() => {
                    throw error;
                  })();
                });
            };
            this.prototype.removeItem = function (k) {
              return Promise.then(() => this.store.removeItem(k));
            };
            this.prototype.clear = function () {
              return Promise.then(() => this.store.clear());
            };
            this.prototype.key = function (i) {
              return Promise.then(() => this.store.key(i));
            };
            this.prototype.getLength = function () {
              return Promise.then(() =>
                isNumber(this.store.length)
                  ? this.store.length
                  : this.store.getLength()
              );
            };
          }
        ));
    }
  );
});
