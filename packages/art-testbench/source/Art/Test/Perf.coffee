###
Perf works within Mocha. It extends mocha's timeouts and runs as mocha tests.

Benchmark results are logged to the DomConsole and normal Console. They are not displayed
in the Mocha browser output.

Usage:

{Perf} = require 'art-foundation/dev_tools/test'
{benchmark} = Perf

suite 'my suite', ->
  benchmark 'My Benchmark', -> 1 + 2 + 3
###

Foundation = require 'art-foundation'
{
  inspect, log
  time, nextTick, currentSecond, requestAnimationFrame
  BaseObject
  isFunction
  commaize
  rightAlign
  isPromise
  defineModule
} = Foundation

targetCycleDuration = .02
defaultTestDuration = 1
defaultWarmUpRatio = .1

defineModule module, ->
  class Perf

    @benchmark: global.benchmark ||= (name, benchmarkF, options) =>
      test name, (done) =>
        f = if @_isAsyncBenchmark benchmarkF
          @_getAsyncBenchmarkFunction name, benchmarkF, options
        else
          @_getSyncBenchmarkFunction name, benchmarkF, options

        f done

    ########################
    # PRIVATE
    ########################
    @_isAsyncBenchmark: (f) ->
      f.length > 0 || isPromise f() # uses 'done' callback
      # isFunction f()?.then # returns promise - not supported yet (TODO)

    @_getSyncBenchmarkFunction: (name, benchmarkF, options) ->

      unless isFunction benchmarkF
        options = benchmarkF
        benchmarkF = options.test

      if options
        {
          testDuration
          warmUpDuration
          loopUnrolling
          setup
          postProcessesResults
          queueNextCycle
          logTestOutput
        } = options

      testDuration ||= defaultTestDuration
      warmUpDuration ||= testDuration * defaultWarmUpRatio
      queueNextCycle ||= nextTick

      (done) =>
        duration = 0
        totalTests = 0
        cycles = 0
        startTime = 0

        if logTestOutput
          log benchmarkF(), benchmark:name

        loopUnrolling = 1
        setup?()

        runTest = (targetEndTime, runDone) ->
          cycleStartTime = currentSecond()
          targetCycleEndTime = cycleStartTime + targetCycleDuration
          cycles++
          testsThisCycle = 0
          switch loopUnrolling
            when 1
              while (latestTime = currentSecond()) < targetCycleEndTime
                benchmarkF()
                testsThisCycle++
            when 4
              while (latestTime = currentSecond()) < targetCycleEndTime
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                testsThisCycle += 4
            when 16
              while (latestTime = currentSecond()) < targetCycleEndTime
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                testsThisCycle += 16
            else
              while (latestTime = currentSecond()) < targetCycleEndTime
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();

                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();

                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();

                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                benchmarkF(); benchmarkF(); benchmarkF(); benchmarkF();
                testsThisCycle += 64

          totalTests += testsThisCycle

          if testsThisCycle >= 4 * loopUnrolling
            loopUnrolling *= 4
            # log "#{name}: unrolling: #{loopUnrolling}"

          duration += latestTime - cycleStartTime

          if latestTime < targetEndTime
            queueNextCycle -> runTest targetEndTime, runDone
          else
            queueNextCycle ->
              runDone()

        queueNextCycle =>
          duration = 0
          totalTests = 0
          cycles = 0
          startTime = currentSecond()
          log "#{name}: warmup #{warmUpDuration} seconds" if warmUpDuration >= 1

          runTest startTime + warmUpDuration, =>
            if warmUpDuration >= 1
              @_showResults
                name: "#{name}-warmup"
                totalTests: totalTests
                duration: duration
                startTime: startTime
                postProcessesResults: postProcessesResults
                warmUpDuration: warmUpDuration

            duration = 0
            totalTests = 0
            cycles = 0
            startTime = currentSecond()

            setup?()

            log "#{name}: test #{testDuration} seconds" if warmUpDuration > 1
            runTest startTime + testDuration, =>
              @_showResults
                name: name
                totalTests: totalTests
                duration: duration
                startTime: startTime
                postProcessesResults: postProcessesResults
                warmUpDuration: warmUpDuration

              done()

    @_getAsyncBenchmarkFunction: (name, benchmarkF, options) ->
      {postProcessesResults, warmUpDuration, testDuration} = options if options
      testDuration ||= defaultTestDuration
      warmUpDuration ||= testDuration * defaultWarmUpRatio

      (done) =>

        runTestsForDuration = (isWarmup, done) ->
          targetDuration = if isWarmup then warmUpDuration else testDuration
          totalTests = 0
          endTime = startTime = currentSecond()
          duration = 0
          doneCount = 0
          finish = =>
            if !isWarmup || targetDuration >= 1
              @_showResults
                name: name
                totalTests: totalTests
                duration: duration
                startTime: startTime
                postProcessesResults: postProcessesResults
                warmUpDuration: isWarmup && targetDuration
            done?()


          runTest = if benchmarkF.length > 0
            ->
              benchmarkF ->
                totalTests++
                endTime = currentSecond()
                duration = endTime - startTime
                if duration < targetDuration
                  runTest()
                else
                  finish()
          else
            ->
              benchmarkF()
              .then ->
                totalTests++
                endTime = currentSecond()
                duration = endTime - startTime
                if duration < targetDuration
                  runTest()
                else
                  finish()
          runTest()
        runTestsForDuration true, ->
          runTestsForDuration false, done

    ###
    postProcessesResults should either turn the object passed to it, possibly altered, OR null.
    If null, then postProcessesResults is responsible for outputting any results. Otherwise,
    the post-processed data will be run through the normal output.
    ###
    @_showResults: (params) ->
      {name, totalTests, duration, startTime, postProcessesResults, warmUpDuration} = params
      gcIncludedDuration = currentSecond() - startTime
      shouldShowResults = true
      testUnits = "tests"
      if postProcessesResults
        processedResults = postProcessesResults
          name:       name
          testUnits:   testUnits
          totalTests: totalTests
          duration:   duration
          gcIncludedDuration: gcIncludedDuration

        if processedResults?.name
          {name, testUnits, totalTests, duration, gcIncludedDuration} = processedResults
        else
          shouldShowResults = false

      if shouldShowResults
        testsPerSecond = totalTests / duration | 0
        testsPerSecondGc = totalTests / gcIncludedDuration | 0

        pre = if warmUpDuration > 1
          "  "
        else
          ""
        log "#{rightAlign commaize(testsPerSecond),11} (#{rightAlign commaize(testsPerSecondGc),11} #{(100 * testsPerSecond/testsPerSecondGc)|0}%) #{testUnits}/s: #{name}"
