// Generated by CoffeeScript 1.12.7

/*
Perf works within Mocha. It extends mocha's timeouts and runs as mocha tests.

Benchmark results are logged to the DomConsole and normal Console. They are not displayed
in the Mocha browser output.


suite 'my suite', ->
  benchmark 'My Benchmark', -> 1 + 2 + 3
 */

(function() {
  var BaseObject, Promise, commaize, currentSecond, defaultTestDuration, defaultWarmUpRatio, defineModule, floatEq, getPadding, inspect, isFunction, isNode, isPromise, log, nextTick, ref, requestAnimationFrame, rightAlign, targetCycleDuration, time;

  ref = require('art-standard-lib'), inspect = ref.inspect, log = ref.log, time = ref.time, nextTick = ref.nextTick, currentSecond = ref.currentSecond, requestAnimationFrame = ref.requestAnimationFrame, BaseObject = ref.BaseObject, isFunction = ref.isFunction, commaize = ref.commaize, rightAlign = ref.rightAlign, isPromise = ref.isPromise, defineModule = ref.defineModule, isFunction = ref.isFunction, floatEq = ref.floatEq, isNode = ref.isNode, getPadding = ref.getPadding, Promise = ref.Promise;

  targetCycleDuration = .02;

  defaultTestDuration = 1;

  defaultWarmUpRatio = .1;

  defineModule(module, function() {
    var Perf;
    return Perf = (function() {
      function Perf() {}


      /*
      IN:
        options:
          testDuration:     [1]   seconds
          warmUpDuration:   [.1]  seconds
          loopUnrolling:    [1]   number of times to run the test in the body of the test-loop
          setup:
          postProcessesResults:
          queueNextCycle:
          logTestOutput:
       */

      Perf.benchmark = global.benchmark || (global.benchmark = function(name, benchmarkF, options) {
        if (isNode) {
          name = name.replace(/[\n\s]+/g, ' ');
          name = name.slice(0, 70);
        }
        return test(name, function() {
          return new Promise(function(resolve) {
            var done, doneCalled, f, ret;
            doneCalled = false;
            done = function() {
              if (!doneCalled) {
                resolve();
              }
              return doneCalled = true;
            };
            f = Perf._isAsyncBenchmark(benchmarkF) ? Perf._getAsyncBenchmarkFunction(name, benchmarkF, options) : Perf._getSyncBenchmarkFunction(name, benchmarkF, options);
            ret = f(done);
            if (isFunction(ret.then)) {
              ret.then(done);
            }
            return null;
          });
        });
      });

      Perf._isAsyncBenchmark = function(f) {
        return f.length > 0 || isPromise(f());
      };

      Perf._getSyncBenchmarkFunction = function(name, benchmarkF, options) {
        var _targetCycleDuration, logTestOutput, loopUnrolling, postProcessesResults, queueNextCycle, setup, testDuration, warmUpDuration;
        if (options) {
          testDuration = options.testDuration, warmUpDuration = options.warmUpDuration, loopUnrolling = options.loopUnrolling, setup = options.setup, postProcessesResults = options.postProcessesResults, queueNextCycle = options.queueNextCycle, logTestOutput = options.logTestOutput;
        }
        testDuration || (testDuration = defaultTestDuration);
        warmUpDuration || (warmUpDuration = testDuration * defaultWarmUpRatio);
        queueNextCycle || (queueNextCycle = nextTick);
        if (loopUnrolling == null) {
          loopUnrolling = 16;
        }
        _targetCycleDuration = targetCycleDuration * testDuration;
        return (function(_this) {
          return function(done) {
            var cycles, duration, runTest, startTime, totalTests;
            duration = 0;
            totalTests = 0;
            cycles = 0;
            startTime = 0;
            if (logTestOutput) {
              log(benchmarkF(), {
                benchmark: name
              });
            }
            if (typeof setup === "function") {
              setup();
            }
            runTest = function(targetEndTime, runDone) {
              var cycleStartTime, i, latestTime, subUnrolling, targetCycleEndTime, testsThisCycle;
              cycleStartTime = currentSecond();
              targetCycleEndTime = cycleStartTime + _targetCycleDuration;
              cycles++;
              testsThisCycle = 0;
              switch (loopUnrolling) {
                case 1:
                  while ((latestTime = currentSecond()) < targetCycleEndTime) {
                    benchmarkF();
                    testsThisCycle++;
                  }
                  break;
                case 4:
                  while ((latestTime = currentSecond()) < targetCycleEndTime) {
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    testsThisCycle += 4;
                  }
                  break;
                case 16:
                  while ((latestTime = currentSecond()) < targetCycleEndTime) {
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    benchmarkF();
                    testsThisCycle += 16;
                  }
                  break;
                default:
                  subUnrolling = loopUnrolling / 64;
                  while ((latestTime = currentSecond()) < targetCycleEndTime) {
                    i = 0;
                    while (i++ < subUnrolling) {
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      benchmarkF();
                      testsThisCycle += 64;
                    }
                  }
              }
              totalTests += testsThisCycle;
              if (testsThisCycle >= 4 * loopUnrolling) {
                loopUnrolling *= 4;
              }
              duration += latestTime - cycleStartTime;
              if (latestTime < targetEndTime) {
                return queueNextCycle(function() {
                  return runTest(targetEndTime, runDone);
                });
              } else {
                return queueNextCycle(function() {
                  return runDone();
                });
              }
            };
            return queueNextCycle(function() {
              duration = 0;
              totalTests = 0;
              cycles = 0;
              startTime = currentSecond();
              return runTest(startTime + warmUpDuration, function() {
                duration = 0;
                totalTests = 0;
                cycles = 0;
                startTime = currentSecond();
                if (typeof setup === "function") {
                  setup();
                }
                return runTest(startTime + testDuration, function() {
                  _this._showResults({
                    name: name,
                    totalTests: totalTests,
                    duration: duration,
                    startTime: startTime,
                    postProcessesResults: postProcessesResults,
                    warmUpDuration: warmUpDuration
                  });
                  return done();
                });
              });
            });
          };
        })(this);
      };

      Perf._getAsyncBenchmarkFunction = function(name, benchmarkF, options) {
        var postProcessesResults, testDuration, warmUpDuration;
        if (options) {
          postProcessesResults = options.postProcessesResults, warmUpDuration = options.warmUpDuration, testDuration = options.testDuration;
        }
        testDuration || (testDuration = defaultTestDuration);
        warmUpDuration || (warmUpDuration = testDuration * defaultWarmUpRatio);
        return (function(_this) {
          return function(done) {
            var runTestsForDuration;
            runTestsForDuration = function(isWarmup, done) {
              var doneCount, duration, endTime, finish, runTest, startTime, targetDuration, totalTests;
              targetDuration = isWarmup ? warmUpDuration : testDuration;
              totalTests = 0;
              endTime = startTime = currentSecond();
              duration = 0;
              doneCount = 0;
              finish = function() {
                if (!isWarmup || targetDuration >= 1) {
                  _this._showResults({
                    name: name,
                    totalTests: totalTests,
                    duration: duration,
                    startTime: startTime,
                    postProcessesResults: postProcessesResults,
                    warmUpDuration: isWarmup && targetDuration
                  });
                }
                return typeof done === "function" ? done() : void 0;
              };
              runTest = benchmarkF.length > 0 ? function() {
                return benchmarkF(function() {
                  totalTests++;
                  endTime = currentSecond();
                  duration = endTime - startTime;
                  if (duration < targetDuration) {
                    return runTest();
                  } else {
                    return finish();
                  }
                });
              } : function() {
                return benchmarkF().then(function() {
                  totalTests++;
                  endTime = currentSecond();
                  duration = endTime - startTime;
                  if (duration < targetDuration) {
                    return runTest();
                  } else {
                    return finish();
                  }
                });
              };
              return runTest();
            };
            return runTestsForDuration(true, function() {
              return runTestsForDuration(false, done);
            });
          };
        })(this);
      };


      /*
      postProcessesResults should either turn the object passed to it, possibly altered, OR null.
      If null, then postProcessesResults is responsible for outputting any results. Otherwise,
      the post-processed data will be run through the normal output.
       */

      Perf._showResults = function(params) {
        var duration, gcIncludedDuration, name, postProcessesResults, pre, processedResults, result, shouldShowResults, startTime, testUnits, testsPerSecond, testsPerSecondGc, totalTests, warmUpDuration;
        name = params.name, totalTests = params.totalTests, duration = params.duration, startTime = params.startTime, postProcessesResults = params.postProcessesResults, warmUpDuration = params.warmUpDuration;
        gcIncludedDuration = currentSecond() - startTime;
        shouldShowResults = true;
        testUnits = "tests";
        if (postProcessesResults) {
          processedResults = postProcessesResults({
            name: name,
            testUnits: testUnits,
            totalTests: totalTests,
            duration: duration,
            gcIncludedDuration: gcIncludedDuration
          });
          if (processedResults != null ? processedResults.name : void 0) {
            name = processedResults.name, testUnits = processedResults.testUnits, totalTests = processedResults.totalTests, duration = processedResults.duration, gcIncludedDuration = processedResults.gcIncludedDuration;
          } else {
            shouldShowResults = false;
          }
        }
        if (shouldShowResults) {
          testsPerSecond = Math.floor(totalTests / duration);
          testsPerSecondGc = Math.floor(totalTests / gcIncludedDuration);
          pre = warmUpDuration > 1 ? "  " : "";
          result = Math.abs((testsPerSecond / testsPerSecondGc) - 1) < .01 ? (rightAlign(commaize(testsPerSecond), 11)) + " " + testUnits + "/s" : (rightAlign(commaize(testsPerSecond), 11)) + " (" + (rightAlign(commaize(testsPerSecondGc), 11)) + " " + ((100 * testsPerSecond / testsPerSecondGc) | 0) + "%) " + testUnits + "/s";
          if (isNode) {
            return log("" + (getPadding(process.stdout.columns / 2 - name.length | 0)) + name.grey + ": " + result.green);
          } else {
            return log(result + ": " + name);
          }
        }
      };

      return Perf;

    })();
  });

}).call(this);

//# sourceMappingURL=Perf.js.map
