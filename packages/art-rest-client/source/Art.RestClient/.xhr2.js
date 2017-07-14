module.exports = global.XMLHttpRequest
  ? global.XMLHttpRequest
  : global.XMLHttpRequest = require('xhr2');