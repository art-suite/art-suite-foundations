{Promise, defineModule, log} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

module.exports = class ChainedTest extends BaseClass

  ###
  IN:
    PATTERN 1:
      (setupFunciton) ->

    PATTERN 2:
      (setupTestName, setupFunction) ->

    setupTestName
      String
      If present, appended to the Mocha setup-test's name
    setupFunction
      Result: any arbitrary function.
      Result is resolved if it's a promise before passing to tests.
      The result is passed to every test as the test's 2nd argument.
      The result is ALSO passed to the very first test as the test's 1st argument.
  ###
  @setup: (a, b) ->
    setupFunction = b ? a
    setupName = a if b?

    setupOncePromise = null
    setupOnceFunction = ->
      setupOncePromise ?= Promise.then setupFunction ? ->

    if setupFunction
      setupName = if setupName
        "ChainedTest setup: #{setupName}"
      else
        "ChainedTest setup"
      test setupName, setupOnceFunction

    new ChainedTest setupOnceFunction, setupOnceFunction

  @test:  (testName, testFunction) -> new ChainedTest null, null, testName, testFunction

  ###
  IN:
    setupOnceFunction: [optional] ->
      OUT: promise result will be resolved and passed to every @testFunction
        as the second argument
        AND, as the first argument for the first test
      REQUIREMENT: should be re-invokable without additional side-effects
        and should always return the same thing

    testName: [optional] string
      if present, a mocha test is created

    testFunction: [optional] (setupOnceFunctionResult) ->
      IN: resolved result from @setupOnceFunction
      OUT: result will be resolved and passed to any thenTest tests

  ###
  constructor: (
      @setupOnceFunction = ->
      @previousTestFunction = ->
      @testName
      @testFunction
    ) ->
    test @testName, @testFunction && @setupAndTestOnceFunction if @testName

  @getter
    resolvedSetup: -> Promise.then @setupOnceFunction
    setupAndTestOnceFunction: ->
      @_setupAndTestOnceFunction ?= =>
        @_testOncePromise ?=
          if @testFunction
            Promise.then @previousTestFunction
            .then (previousTestResult) =>
              @resolvedSetup.then (setupResult) =>
                @testFunction previousTestResult, setupResult
          else
            @resolvedSetup

    setupAndTestOnceFunctionForChain: ->
      =>
        @setupAndTestOnceFunction()
        .catch (error) =>
          unless /failed in/.test error.message
            error.message = "(ChainedTest failed in: " + if @testName
              @testName
            else
              "setup"
            error.message += ")\n\n"
          throw error

  thenTest: (nextTestName, nextTestFunction)->
    new ChainedTest @setupOnceFunction, @setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction
