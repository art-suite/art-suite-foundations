ArtStandardLib = require 'art-standard-lib'
module.exports = ArtStandardLib.merge ArtStandardLib,
  require 'art-class-system'
  require '../index.coffee'
  test: (args...) -> global.test args...