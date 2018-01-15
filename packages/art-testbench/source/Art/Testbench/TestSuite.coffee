{defineModule, log} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

module.exports = class TestSuite extends BaseClass
  @abstractClass()

  @postCreate: ->
    for key in Object.keys @ when /^(test|setup)/.test key
      do (key) =>
        tester = @[key]
        wrappedTester = @[key] = -> @["_"+key] ||= tester()
        test key, -> wrappedTester()
    "do not use"
