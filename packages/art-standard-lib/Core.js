if (true) {
  module.exports = require("./build/Core");
} else {
  require('coffee-script/register');
  module.exports = require('./Core.coffee');
}
