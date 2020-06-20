{currentSecond, compactFlatten, isArray, isFunction, isString, isObject, present, Promise, defineModule, log, array} = require 'art-standard-lib'
{BaseClass} = require 'art-class-system'

module.exports = class ChainedTest extends BaseClass
  @chainedTest: (args...) -> ChainedTest.setup args...

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
      @shouldTap
      @shouldSkipIfNotSelected
    ) ->
    test @testName, @testFunction && @setupAndTestOnceFunction if @testName

  @getter
    resolvedSetup: -> Promise.then @setupOnceFunction
    setupAndTestOnceFunction: ->
      @_setupAndTestOnceFunction ?= =>
        # this is where we start executing with Mocha chooses the test named @testName
        @_testOncePromise ?=
          if @testFunction
            Promise.then @previousTestFunction
            .then (previousTestResult) =>
              startTime = currentSecond()
              @resolvedSetup.then (setupResult) =>
                @testFunction previousTestResult, setupResult
              .then (out) =>
                # NOTE: this spews in pure-node tests; what I really want is to log this IFF it WASN'T run by mocha
                # log "ChainedTest (#{1000 * (currentSecond() - startTime) | 0}ms): #{@testName}"
                if @shouldTap then previousTestResult else out
          else
            @resolvedSetup

    setupAndTestOnceFunctionForChain: ->
      =>
        (if @shouldSkipIfNotSelected
          Promise.then @previousTestFunction
        else
          @setupAndTestOnceFunction()
        ).catch (error) =>
          unless /failed in/.test error.message
            error.message = "(ChainedTest failed in: " + if @testName
              @testName
            else
              "setup"
            error.message += ")\n\n"
          throw error

  ### TODO:
    softTapTest:
      softTapTests don't get run at all if they aren't selected by Mocha to run.

    remove "setupOnceFunction" - there's nothing special about it, it's just the first test
      -possibly- its a tad special in that it gets the name 'setup' automatically
  ###

  _thenTest: (nextTestName, nextTestFunction)->
    new ChainedTest @setupOnceFunction, @setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction

  _tapTest: (nextTestName, nextTestFunction)->
    new ChainedTest @setupOnceFunction, @setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction, true

  _softTapTest: (nextTestName, nextTestFunction)->
    new ChainedTest @setupOnceFunction, @setupAndTestOnceFunctionForChain, nextTestName, nextTestFunction, true, true

  thenTest:     (args...)-> @_applySequence "_thenTest",    compactFlatten args
  tapTest:      (args...)-> @_applySequence "_tapTest",     compactFlatten args
  softTapTest:  (args...)-> @_applySequence "_softTapTest", compactFlatten args

  _applySequence: (applyMemberName, sequence) ->
    i = 0
    ct = @
    while i < sequence.length
      if isString v = sequence[i++]
        unless isFunction f = sequence[i++]
          log.error ChainedTestError: name: v, shouldBeFunction: f
          throw new Error "expecting <Function> after <String> got: #{f}"

        ct = ct[applyMemberName] v, f

      else
        log.error ChainedTestError: name: shouldBeString: v
        throw new Error "expecting <String> got: #{v}"

    ct
