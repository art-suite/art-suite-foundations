if global.document
  {log, fastBind, Promise, findSourceReferenceUrlRegexp} = require 'art-foundation'

  # {mapStackTrace} = require 'sourcemapped-stacktrace'

  # promisedMapStackTrace = (stack) ->
  #   deQueriedStack = stack.replace(/\?[a-zA-Z0-9]+=[^:]*/,"")
  #   new Promise (resolve)-> mapStackTrace deQueriedStack, resolve

  class SuiteReporter
    constructor: (@suite)->
      @failedTests = []
      @passedTests = []
      @tests = []

    addTest: (test) ->
      @tests.push test

    addFailure: (test, err) ->
      @failedTests.push (
        Promise.resolve [test, err, err.stack]
        # p = if stack = err.stack
        #   promisedMapStackTrace stack
        # else Promise.resolve()
        # p.then (mappedStack) ->
        #   [test, err, mappedStack]
      )

    addPass: (test) ->
      @passedTests.push test

    mergeStackTraces: (normalStackTrace, mappedStackTrace) ->
      normalStackTraceArray = normalStackTrace.split '\n'
      output = normalStackTraceArray.slice 0,1
      rest = normalStackTraceArray.slice 1

      sourceRefRegex = /\([^)]+\:\d+\:\d+\)/
      if rest.length == mappedStackTrace?.length # good mappedStackTrace
        for line, i in rest
          mappedLine = mappedStackTrace[i]
          url = mappedLine.match(sourceRefRegex)?[0]
          rest[i] = line.replace sourceRefRegex, url if url

      "#{normalStackTraceArray[0]}\n#{rest.join "\n"}"

    outputFailedTests: (failedTests)->
      console.group "Failures"
      for [test, err, mappedStackTrace] in failedTests
        # console.error test.err.stack
        # console.error test.err.stack
        console.error @mergeStackTraces test.err.stack, mappedStackTrace
        console.log Expected: err.expected, Actual: err.actual
      console.groupEnd()

    outputPassedTest: (passedTests)->
      console.groupCollapsed "Passes"
      for test in passedTests
        console.log test.title
      console.groupEnd()

    output: ->
      title = "#{@suite.title} (#{@tests.length - @failedTests.length}/#{@tests.length} passed)"
      {passedTests} = @
      Promise.all @failedTests
      .then (failedTests)=>
        if failedTests.length == 0
          console.groupCollapsed title
        else
          console.group title
          @outputFailedTests failedTests

        @outputPassedTest passedTests
        console.groupEnd()
      , (err) ->
        console.err "promise error", err

  module.exports = class Reporter
    constructor: (@runner, options)->
      new Mocha.reporters.HTML @runner
      # for fName in "onPass onPending onStart onTest onFail onSuite onSuiteEnd onTestEnd onEnd".split(" ")
      #   @[fName] = fastBind @[fName], @
      @registerHandlers()

    registerHandlers: ->
      @runner.on 'pass'        , (test) => @suiteReporter.addPass test
      @runner.on 'test'        , (test) => @suiteReporter.addTest test
      @runner.on 'fail'        , (test, err) => @suiteReporter.addFailure test, err
      @runner.on 'suite'       , (suite) => @suiteReporter = new SuiteReporter suite
      @runner.on 'suite end'   , (suite) =>
        @suiteReporter?.output()
        @suiteReporter = null
