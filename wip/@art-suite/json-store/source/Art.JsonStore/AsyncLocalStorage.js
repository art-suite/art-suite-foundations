"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["Object", "objectKeyCount", "Promise"],
    [global, require("./StandardImport")],
    (Object, objectKeyCount, Promise) => {
      let isWebWorker,
        workerRpc,
        localStorage,
        LocalStorageShimForNode,
        AsyncLocalStorage;
      ({ isWebWorker } = require("./WebWorker"));
      ({ workerRpc } = require("./WorkerRpc"));
      ({ localStorage } = global);
      localStorage != null
        ? localStorage
        : (localStorage = LocalStorageShimForNode =
            Caf.defClass(
              class LocalStorageShimForNode extends Object {},
              function (LocalStorageShimForNode, classSuper, instanceSuper) {
                this.store = {};
                this.getItem = (k) => this.store[k];
                this.setItem = (k, v) => (this.store[k] = v);
                this.removeItem = (k) => delete this.store[k];
                this.clear = () => (this.store = {});
                this.key = (i) => Object.keys(this.store)[i];
                this.getLength = () => objectKeyCount(this.store);
              }
            ));
      return isWebWorker
        ? workerRpc.bindWithPromises({
            localStorage: ["getItem", "setItem", "removeItem", "clear", "key"],
          })
        : (workerRpc.register({ localStorage }),
          (AsyncLocalStorage = Caf.defClass(
            class AsyncLocalStorage extends Object {},
            function (AsyncLocalStorage, classSuper, instanceSuper) {
              this.getItem = function (path) {
                return Promise.then(() => localStorage.getItem(path));
              };
              this.setItem = function (path, value) {
                return Promise.then(() => localStorage.setItem(path, value));
              };
              this.removeItem = function (path) {
                return Promise.then(() => localStorage.removeItem(path));
              };
              this.clear = function () {
                return Promise.then(() => localStorage.clear());
              };
              this.key = function (index) {
                return Promise.then(() => localStorage.key(index));
              };
              this.getLength = function () {
                return Promise.then(() => localStorage.length);
              };
            }
          )));
    }
  );
});
