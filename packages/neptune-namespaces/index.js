if (false) { // use build
  module.exports = require("./build");
} else {
  require('coffee-script/register');
  module.exports = require("./index.coffee");
}