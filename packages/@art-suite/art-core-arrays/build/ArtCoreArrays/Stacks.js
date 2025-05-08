"use strict"
let Caf = require('caffeine-script-runtime');
Caf.defMod(module, () => {return {push: function(inputArray, element) {return inputArray ? (inputArray.push(element), inputArray) : [element];}, peek: function(inputArray, offset = -1) {return (inputArray != null) ? inputArray[inputArray.length + offset] : undefined;}, pop: function(inputArray) {return (inputArray != null) ? inputArray.pop() : undefined;}};});
//# sourceMappingURL=Stacks.js.map
