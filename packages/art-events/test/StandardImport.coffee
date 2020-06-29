ArtStandardLib = require 'art-standard-lib'
module.exports = ArtStandardLib.merge ArtStandardLib,
  require 'art-class-system'
  require '../index'
  test: (args...) -> global.test args...