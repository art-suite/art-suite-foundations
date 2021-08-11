StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'
{BaseObject} = ClassSystem
{min, max, round, inspect} = StandardLib

module.exports = class Stat extends BaseObject
  constructor: ->
    @reset()

  reset: ->
    @values = []
    @sum = 0
    @max = @min = null

  @getter
    length: -> @values.length
    average: -> @sum / @values.length
    median: -> @values.slice().sort()[@length/2 | 0]

  percential: (zeroToOneHundred) ->
    i = ((@length-1)*(zeroToOneHundred)/100) | 0
    sorted = @values.slice().sort (v1, v2) -> v2 - v1
    sorted[i]

  histogram: (divisions, min, max) ->
    min = @min unless min?
    max = @max unless max?
    delta = max - min
    mul = divisions / delta
    hist = {}
    for v in [0...divisions] by 1
      hist[min + v / mul] = 0
    for v in @values
      bin = (v - min) * mul | 0
      bin = 0 if bin < 0
      bin = divisions-1 if bin >= divisions
      hist[min + bin / mul]++
    hist


  toString: ->
    inspect
      length:  @length
      average:@average
      median: @median
      min:    @min
      max:    @max

  toInfoMap: ->
    length: @length
    average:@average
    median: @median
    min:    @min
    max:    @max
    p90:    @percential 90
    p95:    @percential 95
    p99:    @percential 99

  toIntInfoMap: ->
    length: @length
    average:round @average
    median: round @median
    min:    round @min
    max:    round @max
    p90:    round @percential 90
    p95:    round @percential 95
    p99:    round @percential 99

  toIntString: ->
    inspect @toIntInfoMap()

  add: (v) ->
    @values.push v
    @sum += v
    if @values.length == 1
      @max = @min = v
    else
      @max = max @max, v
      @min = min @min, v
