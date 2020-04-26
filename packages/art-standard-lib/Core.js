if (require('./use-build')) {
  module.exports = require("./build/Core");
} else {
  require('coffee-script/register');
  module.exports = require('./Core.coffee');
}
