{commaize} = require "./MathExtensions"

# NOTE: performance.now may be slow on iOS 8.0. It's not supported on 8.1+, supposadly due to poor performacne:
# https://developer.apple.com/library/ios/releasenotes/Miscellaneous/RN-iOSSDK-8.1/index.html
# "The Navigation Timing API has been disabled only on iOS due to performance issues."
self.performance ||= {}
self.performance.now ||=
  self.performance.mozNow    ||
  self.performance.msNow     ||
  self.performance.oNow      ||
  self.performance.webkitNow ||
  -> new Date().getTime()

initPerformanceSecond = self.performance.now() / 1000
initDateSecond = new Date().getTime() / 1000
dateSecondMinusPerformanceSecond = initDateSecond - initPerformanceSecond

module.exports = class Time
  multiples = [
    ["mo", 30 * 24 * 60 * 60]
    ["d", 24 * 60 * 60]
    ["h", 60 * 60]
    ["m", 60]
    ["s", 1]
    ["ms", .001]
    ["μs", .000001]
    ["ns", .000000001]
  ]
  @dateSecondToPerformanceSecond: (dateSecond)        -> dateSecond - dateSecondMinusPerformanceSecond
  @performanceSecondToDateSecond: (performanceSecond) -> performanceSecond + dateSecondMinusPerformanceSecond
  @timeStampToPerformanceSecond: (htmlEventTimeStamp) -> htmlEventTimeStamp / 1000 - dateSecondMinusPerformanceSecond

  @durationString: (seconds, levels = 1, divider = ' ', recursing = false) =>
    for [name, multiplier] in multiples
      if seconds >= multiplier
        result = if levels > 1
          "#{(seconds / multiplier) | 0}#{name}#{@durationString seconds % multiplier, levels - 1, divider, true}"
        else "#{(.5 + seconds / multiplier) | 0}#{name}"
        result = divider + result if recursing
        return result
    if recursing then '' else "0"

  @dateAgeInSeconds: (date) -> ((new Date) - date) * .001
  @dateToSeconds: (date) -> post.getTime() * .001

  @perTimeString: (secondsPerRun) =>
    perTime = 1 / secondsPerRun
    if perTime > 100
      "#{commaize perTime | 0}/s"
    else if perTime*60 > 100
      "#{commaize perTime*60 | 0}/m"
    else #if perTime*3600 > 10
      "#{commaize perTime*3600 | 0}/h"

  @currentMillisecond: -> self.performance.now()

  # on most platforms, accurate to the microsecond
  # roughly the number of seconds since startup
  # returns 'performanceSecond'
  @currentSecond: currentSecond = -> self.performance.now() / 1000

  # accurate to the millisecond
  # comparable with HTML event timeStamps
  # roughly the number of seconds since some fixed date, UTC
  # Time 0:
  #    Chrome:  Wed Dec 31 1969 18:00:00 GMT-0600 (CST)
  #    Firefox: Wed Dec 31 1969 18:00:00 GMT-0600 (CST)
  @currentDateSecond: -> new Date().getTime() / 1000

  # time f() => seconds elapsed
  # time consoleLogName, f() => log to console && result of f()
  @time: (a, b) =>
    f = b || a
    start = currentSecond()
    fResult = f()
    timeResult = currentSecond() - start
    if b
      Neptune.Art.StandardLib.log "time: #{a} took #{@durationString timeResult}"
      fResult
    else
      timeResult

  timerStack = []
  @stackTime: (f) ->
    start = currentSecond()
    timerStack.push 0
    f()
    subTimeTotal = timerStack.pop()
    timeResult = currentSecond() - start
    if (tsl = timerStack.length) > 0
      timerStack[tsl-1] += timeResult
    count: 1 # when passed into globalCount, this will get incremented for each count
    total: timeResult
    subTimeTotal: subTimeTotal
    remainder: timeResult - subTimeTotal

  @logTimeSinceLast: (a) =>
    time = @currentSecond()
    console.log "#{a} (#{@durationString time - @lastTime if @lastTime})"
    @lastTime = time
