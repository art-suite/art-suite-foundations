StandardLib = require 'art-standard-lib'
{isPlainObject, currentSecond, log} = StandardLib

# for debugging - a quick way to count things
module.exports = class GlobalCounts

  @globalCounts = {}

  globalTime = null
  @resetGlobalCounts: =>
    globalTime = currentSecond()
    @globalCounts = {}

  @globalCount: (name, amount = 1) =>
    if isPlainObject amount
      if last = @globalCounts[name]
        for k, v of amount
          last[k] += v
      else
        @globalCounts[name] = amount
    else
      @globalCounts[name] = (@globalCounts[name]||0) + amount

  @countStep: =>
    nextTime = currentSecond()
    log.error "GlobalCounts gap" if nextTime - globalTime > .002
    globalTime = nextTime
    @globalCount "step"
