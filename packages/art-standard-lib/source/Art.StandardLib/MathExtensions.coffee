RegExpExtensions     = require './RegExpExtensions'
{numberRegexp} = RegExpExtensions

# Picked smallest simple number > EPSILON for single an double-precision numbers
# that passes test suite.
float64Precision = 4e-16  # > 52 bits: 1 / 2**52 == 2.220446049250313e-16
float32Precision = 4e-7   # > 23 bits: 1 / 2**23 == 1.1920928955078125e-7
onePlusFloat64Precision = 1 + float64Precision
onePlusFloat32Precision = 1 + float32Precision

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
  # @round:         round

  @ceil:  (v, m = 1) ->  ceil(v / m) * m
  @floor: (v, m = 1) ->  floor(v / m) * m
  @round: (v, m = 1) ->  round(v / m) * m

  @simplifyNum:   (num) -> round(num  * inverseFloat64Precision) * float64Precision

  # See float32Eq for notes
  @floatEq: floatEq = (n1, n2) ->
    if n1 == n2 || abs(n1 - n2) < float64Precision
      true
    else if n1 * n2 > 0
      n1 = abs n1
      n2 = abs n2
      (n1 * onePlusFloat64Precision > n2) && (n2 * onePlusFloat64Precision > n1)
    else
      false

  @floatGte: (a, b) -> a >= b || floatEq a, b
  @floatLte: (a, b) -> a <= b || floatEq a, b

  @floatGt: (a, b) -> a > b && !floatEq a, b
  @floatLt: (a, b) -> a < b && !floatEq a, b

  ###
  WARNING: if you are working with very small, near-zero numbers, and
    don't want them be be considered actually 0, don't use this!

  OUT:
    true if two floating point numbers are within
    'floating-point error' of each other.

  What does that mean?

  For exponents > 0
    They are the same if their exponent is the same and their mantisssas
    are very close.

  For exponents < 0
    HOWEVER, negative-exponent numbers are compared using their
    full value. That means theit exponents could be very different.

    return true iff abs(a - b) < float32Precision

  NOTES
    The problem is comparing against 0. Since "0" has no magnitude, we
    have to define how we compare when one of the two numbers is 0 and
    the other isn't.

    Option 1: always not-equal
    Option 2: equal if the mantissa is near-zero
    Option 3: equal if the value, including exponent, is near-zero
      i.e. - use float32Eq0

    I've basically chosen Option #3.

    To maintain maximum consistency, I've decided ALL numbers with
    exponents < 0 will be compared without compensating for their magnitudes.
  ###
  @float32Eq: float32Eq = (n1, n2) ->
    # handle exact equality fast
    if n1 == n2 || abs(n1 - n2) < float32Precision
      true
    else
      n1 = Math.abs n1
      n2 = Math.abs n2
      (n1 * onePlusFloat32Precision > n2) && (n2 * onePlusFloat32Precision > n1)

  @float32Gte: (a, b) -> a >= b || float32Eq a, b
  @float32Lte: (a, b) -> a <= b || float32Eq a, b

  @float32Gt:  (a, b) -> a > b && !float32Eq a, b
  @float32Lt:  (a, b) -> a < b && !float32Eq a, b



  @floatEq0:      floatEq0   = (n) -> n  == 0  || float64Precision > abs n
  @float32Eq0:    float32Eq0 = (n) -> n  == 0  || float32Precision > abs n

  # Purpose: if n is floatEq0, make it actually 0, otherwise leave it alone.
  @floatTrue0:    (n) -> if n == 0 || float64Precision > abs n then 0 else n
  @float32True0:  (n) -> if n == 0 || float32Precision > abs n then 0 else n

  # return intenger between [0, max)
  @random:  random
  @intRand: (max) -> random() * max | 0
  @boolRand: -> random() < .5

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

# https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
# module.exports = function Alea(seed) {
#     if(seed == undefined) {seed = +new Date() + Math.random();}
#     function Mash() {
#         var n = 4022871197;
#         return function(r) {
#             for(var t, s, u = 0, e = 0.02519603282416938; u < r.length; u++)
#             s = r.charCodeAt(u), f = (e * (n += s) - (n*e|0)),
#             n = 4294967296 * ((t = f * (e*n|0)) - (t|0)) + (t|0);
#             return (n|0) * 2.3283064365386963e-10;
#         }
#     }
#     return function() {
#         var m = Mash(), a = m(" "), b = m(" "), c = m(" "), x = 1, y;
#         seed = seed.toString(), a -= m(seed), b -= m(seed), c -= m(seed);
#         a < 0 && a++, b < 0 && b++, c < 0 && c++;
#         return function() {
#             var y = x * 2.3283064365386963e-10 + a * 2091639; a = b, b = c;
#             return c = y - (x = y|0);
#         };
#     }();
# }

  @seededRandomNumberGenerator: (seed = Math.random()) ->
    _rngSeed = Math.floor 48271 * 48271 * Math.abs(seed) + 1
    ->
      (_rngSeed = _rngSeed * 48271 % 2147483647) / 2147483648
