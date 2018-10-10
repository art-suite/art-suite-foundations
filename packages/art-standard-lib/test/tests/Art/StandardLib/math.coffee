{
  float64Precision, floatTrue0
  float32Precision, float32True0
  MathExtensions
  each
  numberToTightString
} = Neptune.Art.StandardLib

# 'lib/art'
# point = Art.Atomic.Point.point
# rect = Art.Atomic.Rectangle.rect
# Rectangle = Art.Atomic.Rectangle

module.exports = suite:
  numberToTightString: ->
    testMap = [
      ["2",         1.9999999, 2]
      ["2",         1.9999999, 7]
      ["1.9999999", 1.9999999, 8]
      ["2",         2, 2]

      ["2e+50",         1.9999999e50, 2]
      ["2e+50",         1.9999999e50, 7]
      ["1.9999999e+50", 1.9999999e50, 8]

      ["2e-50",         1.9999999e-50, 2]
      ["2e-50",         1.9999999e-50, 7]
      ["1.9999999e-50", 1.9999999e-50, 8]
    ]

    each testMap, ([k, num, precision]) ->
      test "'#{k}' == numberToTightString #{num}, #{precision}", ->
        assert.eq k, numberToTightString num, precision

  intRand: ->
    test "intRand", ->
      for i in [0..1000]
        v = MathExtensions.intRand 10
        assert.ok typeof v is "number"
        assert.eq v | 0, v
        assert.ok v >= 0
        assert.ok v < 10

  modulo: ->
    test "modulo", ->
      assert.eq MathExtensions.modulo(1.25, 1), 0.25
      assert.eq MathExtensions.modulo(5, 3), 2

      assert.eq MathExtensions.modulo(4.25, 1), 0.25
      assert.eq MathExtensions.modulo(11, 3), 2

    test "modulo of negative numbers should be positive", ->
      assert.eq MathExtensions.modulo(-1.25, 1), 0.75
      assert.eq MathExtensions.modulo(-5, 3), 1

      assert.eq MathExtensions.modulo(-4.25, 1), 0.75
      assert.eq MathExtensions.modulo(-11, 3), 1

  floatEq: ->
    test "floatEq", ->
      smallestDifferent = 1 + MathExtensions.float64Precision
      largestSame = 1 + MathExtensions.float64Precision/2
      assert.ok 1 != largestSame
      assert.ok 1 != smallestDifferent

      assert.equal true, MathExtensions.floatEq(1, largestSame)
      assert.equal false, MathExtensions.floatEq(1, smallestDifferent)

    test "float32Eq", ->
      smallestDifferent = 1 + MathExtensions.float32Precision
      largestSame = 1 + MathExtensions.float32Precision/2
      assert.ok 1 != largestSame
      assert.ok 1 != smallestDifferent

      assert.equal true,  MathExtensions.float32Eq(1, largestSame), "should be same"
      assert.equal false, MathExtensions.float32Eq(1, smallestDifferent), "should be different"

    test "floatEq and Infinity", ->
      assert.equal true, MathExtensions.floatEq Infinity, Infinity
      assert.equal false, MathExtensions.floatEq Infinity, 1
      assert.equal false, MathExtensions.floatEq 1, Infinity

    test "float32Eq and Infinity", ->
      assert.equal true, MathExtensions.float32Eq Infinity, Infinity
      assert.equal false, MathExtensions.float32Eq Infinity, 1
      assert.equal false, MathExtensions.float32Eq 1, Infinity

    test "float32Eq0", ->
      assert.equal true, MathExtensions.float32Eq0 0
      assert.equal false, MathExtensions.float32Eq0 1
      assert.equal false, MathExtensions.float32Eq0 -1

    test "floatEq0", ->
      assert.equal true,  MathExtensions.floatEq0 0
      assert.equal false, MathExtensions.floatEq0 1
      assert.equal false, MathExtensions.floatEq0 -1

    test "floatTrue0", ->
      assert.equal 100, floatTrue0 100
      assert.equal 0, floatTrue0 0
      assert.equal 0.00001, floatTrue0 0.00001
      assert.equal float64Precision, floatTrue0 float64Precision
      assert.ok 0 != float64Precision / 2
      assert.equal 0, floatTrue0 float64Precision / 2

    test "float32True0", ->
      assert.equal 100, float32True0 100
      assert.equal 0, float32True0 0
      assert.equal 0.00001, float32True0 0.00001
      assert.equal float32Precision, float32True0 float32Precision
      assert.ok 0 != float32Precision / 2
      assert.equal 0, float32True0 float32Precision / 2
