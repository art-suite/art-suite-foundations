if (false) { // use build
  module.exports = require("./build/generator");
} else {
  require('./register');
  module.exports = require("./generator.coffee");
}