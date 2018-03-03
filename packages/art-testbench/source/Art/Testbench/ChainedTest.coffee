{Promise, defineModule, log} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

module.exports = class ChainedTest extends BaseClass

  @setup: (setupFunction)          -> new ChainedTest setupFunction
  @test:  (testName, testFunction) -> new ChainedTest null, testName, testFunction

  ###
  IN:
    setupFunction: [optional] ->
      OUT: result will be resolved and passed to @testFunction
      Invoked before @testFunction
      if mission, setupFunction is set to the noop function

    testName: [optional] string
      if present, a mocha test is created

    testFunction: [optional] (setupFunctionResult) ->
      IN: resolved result from @setupFunction
      OUT: result will be resolved and passed to any thenTest tests

  ###
  constructor: (@setupFunction = (->), @testName, @testFunction) ->
    test @testName, @testFunction && @setupAndTestOnceFunction if @testName

  @getter
    setupAndTestOnceFunction: ->
      @_setupAndTestOnceFunction ?= =>
        @_testOncePromise ?=
          Promise.then @setupFunction
          .then @testFunction ? (a) -> a


  thenTest: (nextTestName, nextTestFunction)->
    new ChainedTest @setupAndTestOnceFunction, nextTestName, nextTestFunction
