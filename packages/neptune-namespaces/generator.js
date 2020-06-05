if (require("./use-build")) { // use build
  module.exports = require("./build/generator");
} else {
  require('./register');
  module.exports = require("./source/NeptuneNamespaces/Generator");
}