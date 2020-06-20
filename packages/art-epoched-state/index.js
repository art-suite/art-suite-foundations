if (false) { // use build? - true == fase, false == good for development
  module.exports = require('./build');
} else {
  require('./register');
  module.exports = require('./index.coffee');
};