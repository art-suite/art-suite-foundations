"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return (() => {let EventEpoch; return EventEpoch = Caf.defClass(class EventEpoch extends require('art-epoched-state').EpochClass {}, function(EventEpoch, classSuper, instanceSuper) {this.singletonClass(); this.prototype.queue = function(event) {return this.queueItem(event);}; this.prototype.logEvent = function(name, id) {};});})();});
//# sourceMappingURL=EventEpoch.js.map
