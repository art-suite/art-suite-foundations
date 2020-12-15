ArtStandardLib = require 'art-standard-lib'
module.exports = ArtStandardLib.mergeWithSelf(
  require 'art-class-system'
  require 'art-testbench'
  require '../source'
)