{Promise, defineModule, log} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

module.exports = class TestSuite extends BaseClass
  @abstractClass()

  @postCreate: ->
    suite @getName(), =>
      for key in Object.keys @ when /^(test|setup)/.test key
        do (key) =>
          tester = @[key]
          wrappedTester = @[key] = => @["_"+key] ||= if true
            # log "test: #{@getName()}.#{key}"
            Promise.then -> tester()
            .tap => log "pass: #{@getName()}.#{key}"
            .catch (e)=>
              log "fail: #{@getName()}.#{key}"
              throw e
          test key, -> wrappedTester()
    "do not use"
