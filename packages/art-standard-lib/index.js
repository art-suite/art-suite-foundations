if (true) {
  module.exports = require("./build");
} else {
  require('./register');
  require('./index.coffee');
}
