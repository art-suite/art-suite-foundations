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

    float64Tests = [
      [c = 0, float64Precision, float64Precision / 2]
      [c = 1, c + c * float64Precision, c + c * float64Precision / 2]
      [c = -1, c + c * float64Precision, c + c * float64Precision / 2]
      [c = 1e10, c + c * float64Precision, c + c * float64Precision / 2]
      [c = -1e10, c + c * float64Precision, c + c * float64Precision / 2]

      # note, all less-than-zero-magnitudes are not magnitude-compensated for comparison
      [c = 1e-10, c + 2 * float64Precision, c + c * float64Precision]
      [c = -1e-10, c - 2 * float64Precision, c + c * float64Precision]
    ]
    test "!floatEq -1, 1", ->
      assert.false MathExtensions.floatEq -1, 1
    test "!floatEq -10, 10", ->
      assert.false MathExtensions.floatEq -10, 10


    each float64Tests, ([comparisonNumber, smallestDifferent, largestSame]) ->
      test "floatEq #{comparisonNumber}, #{largestSame}", ->
        assert.ok comparisonNumber != largestSame
        assert.ok comparisonNumber != smallestDifferent

        assert.equal true,  MathExtensions.floatEq(comparisonNumber, largestSame), "should be same: #{comparisonNumber} float== #{largestSame}"
        assert.equal false, MathExtensions.floatEq(comparisonNumber, smallestDifferent), "should be different: #{comparisonNumber} float== #{smallestDifferent}"

        assert.equal true,  MathExtensions.floatGte(comparisonNumber, largestSame), "floatGte - should be true #{comparisonNumber} <> #{largestSame}"
        assert.equal true,  MathExtensions.floatLte(comparisonNumber, largestSame), "floatLte - should be true #{comparisonNumber} <> #{largestSame}"
        assert.neq(
          MathExtensions.floatGte comparisonNumber, smallestDifferent
          MathExtensions.floatLte comparisonNumber, smallestDifferent
          "floatGte <> floatLte comparisonNumber, smallestDifferent"
        )

        assert.equal false, MathExtensions.floatGt(comparisonNumber, largestSame), "floatGt - should be false #{comparisonNumber} <> #{largestSame}"
        assert.equal false, MathExtensions.floatLt(comparisonNumber, largestSame), "floatLt - should be false #{comparisonNumber} <> #{largestSame}"
        assert.neq(
          MathExtensions.floatGt comparisonNumber, smallestDifferent
          MathExtensions.floatLt comparisonNumber, smallestDifferent
          "floatGt <> floatLt comparisonNumber, smallestDifferent"
        )


    float32Tests = [
      [c = 0, float32Precision, float32Precision / 2]
      [c = 1, c + c * float32Precision, c + c * float32Precision / 2]
      [c = -1, c + c * float32Precision, c + c * float32Precision / 2]
      [c = 1e10, c + c * float32Precision, c + c * float32Precision / 2]
      [c = -1e10, c + c * float32Precision, c + c * float32Precision / 2]

      # note, all less-than-zero-magnitudes are not magnitude-compensated for comparison
      [c = 1e-10, c + float32Precision, c + c * float32Precision]
      [c = -1e-10, c - float32Precision, c + c * float32Precision]
    ]

    each float32Tests, ([comparisonNumber, smallestDifferent, largestSame]) ->
      test "float32Eq #{comparisonNumber}, #{largestSame}", ->
        assert.ok comparisonNumber != largestSame
        assert.ok comparisonNumber != smallestDifferent

        assert.equal true,  MathExtensions.float32Eq(comparisonNumber, largestSame), "should be same: #{comparisonNumber} float== #{largestSame}"
        assert.equal false, MathExtensions.float32Eq(comparisonNumber, smallestDifferent), "should be different: #{comparisonNumber} float== #{smallestDifferent}"

        assert.equal true,  MathExtensions.float32Gte(comparisonNumber, largestSame), "float32Gte - should be true #{comparisonNumber} <> #{largestSame}"
        assert.equal true,  MathExtensions.float32Lte(comparisonNumber, largestSame), "float32Lte - should be true #{comparisonNumber} <> #{largestSame}"
        assert.neq(
          MathExtensions.float32Gte comparisonNumber, smallestDifferent
          MathExtensions.float32Lte comparisonNumber, smallestDifferent
          "float32Gte <> float32Lte comparisonNumber, smallestDifferent"
        )

        assert.equal false, MathExtensions.float32Gt(comparisonNumber, largestSame), "float32Gt - should be false #{comparisonNumber} <> #{largestSame}"
        assert.equal false, MathExtensions.float32Lt(comparisonNumber, largestSame), "float32Lt - should be false #{comparisonNumber} <> #{largestSame}"
        assert.neq(
          MathExtensions.float32Gt comparisonNumber, smallestDifferent
          MathExtensions.float32Lt comparisonNumber, smallestDifferent
          "float32Gt <> float32Lt comparisonNumber, smallestDifferent"
        )

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
