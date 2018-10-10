RegExpExtensions     = require './RegExpExtensions'
{numberRegexp} = RegExpExtensions

float64Precision = 4e-16 # > 52 bits: 1 / 2**52 == 2.220446049250313e-16
float32Precision = 4e-7  # > 23 bits: 1 / 2**23 == 1.1920928955078125e-7
inverseFloat64Precision = 1 / float64Precision
inverstFloat32Precision = 1 / float32Precision

{abs, min, max, ceil, floor, round, random, pow} = self.Math

Math.log2 ?= (x) -> Math.log(x) / Math.LOG2E
log10 = Math.log10 ?= (x) -> Math.log(x) / Math.log 10

module.exports = class MathExtensions
  @nearInfinity:        pow 10, 100
  @nearInfinityResult:  pow 10, 50
  @float32Precision: float32Precision
  @float64Precision: float64Precision
  @modulo: (a, b) -> r = a % b; if r < 0 then r + b else r

  @stringToNumberArray: (string) ->
    a = string.split ","
    for v, i in a
      match = v.match(numberRegexp)
      a[i] = if match? then match[0] - 0 else 0
    a

  @numberToTightString: (n, decimalPrecision = 16) ->
    v = n.toPrecision decimalPrecision
    if /e/.test v
      v.replace /([0-9]+(\.[0-9]+[1-9])?)\.?0+e/, "$1e"
    else
      v.replace /([0-9]+(\.[0-9]+[1-9])?)\.?0+$/, "$1"
    # .replace /\.0+($|e)/, "$1"

  @minMagnitude: (a, magnitude) ->
    if a < 0
      min a, -magnitude
    else
      max a, magnitude

  @maxMagnitude: (a, magnitude) -> bound -magnitude, a, magnitude

  @maxChange: (newValue, oldValue, maxChangeV) ->
    bound oldValue - maxChangeV, newValue, oldValue + maxChangeV

  @bound: bound = (a, b, c) ->
    return a if isNaN b
    if b < a then a
    else if b > c then c
    else b

  @absGt:         (a, b) -> abs(a) > abs b
  @absLt:         (a, b) -> abs(a) < abs b
  @absGte:        (a, b) -> abs(a) >= abs b
  @absLte:        (a, b) -> abs(a) <= abs b
  @abs:           abs
  @min:           min #(a, b, c) -> if c? and c <= a and c <= b then c else if a <= b then a else b
  @max:           max #(a, b, c) -> if c? and c >= a and c >= b then c else if a >= b then a else b
  @round:         round

  @ceil:  (v, m = 1) ->  ceil(v / m) * m
  @floor: (v, m = 1) ->  floor(v / m) * m
  @round: (v, m = 1) ->  round(v / m) * m

  @simplifyNum:   (num) -> round(num  * inverseFloat64Precision) * float64Precision

  @floatEq:       (n1, n2) -> n1 == n2 || float64Precision > abs n1 - n2
  @float32Eq:     (n1, n2) -> n1 == n2 || float32Precision > abs n1 - n2
  @floatEq0:      (n)      -> n  == 0  || float64Precision > abs n
  @float32Eq0:    (n)      -> n  == 0  || float32Precision > abs n

  # OUT: 0 if n is floatEq0/float32Eq0, else n
  @floatTrue0:    (n) -> if n == 0  || float64Precision > abs n then 0 else n
  @float32True0:  (n) -> if n == 0  || float32Precision > abs n then 0 else n

  # return intenger between [0, max)
  @random:  random
  @intRand: (max) -> random() * max | 0

  @iPart: (v) -> v - (v % 1)
  @fPart: (v) -> v % 1

  @commaize:      (x) -> x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  # use: a predictable random function for testing
  # ex: Math.cyclingSequenceFunction [0.3206, 0.9062, 0.9956, 0.7878]
  @cyclingSequenceFunction: (sequence) ->
    sequencePos = sequence.length
    ->
      sequencePos++
      sequencePos = 0 if sequencePos >= sequence.length
      sequence[sequencePos]
