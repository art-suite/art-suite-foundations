"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return function(superClass) {
    let ExtendableEventedMixin;
    return (ExtendableEventedMixin = Caf.defClass(
      class ExtendableEventedMixin extends superClass {},
      function(ExtendableEventedMixin, classSuper, instanceSuper) {
        this.declarable(
          { eventHandlers: {} },
          {
            extend: function(extendable, handlers) {
              Caf.each2(handlers, (v, k) => {
                let temp;
                return ((temp = extendable[k]) != null
                  ? temp
                  : (extendable[k] = [])
                ).push(v);
              });
              return extendable;
            }
          }
        );
        this.on = this.eventHandlers;
        this.handleEvent = function(type, event) {
          return Caf.each2(this.getEventHandlers()[type], handler =>
            handler(event)
          );
        };
      }
    ));
  };
});
