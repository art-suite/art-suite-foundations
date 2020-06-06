
{StandardLib} = Neptune.Art
{rubyTrue, rubyFalse, rubyOr, rubyAnd, inspect} = StandardLib

suite "Art.StandardLib.StandardLib.Ruby.rubyTrue and rubyFalse", ->
  pairs = [
    [0, true]
    ["", true]
    ["0", true]
    [0.1, true]
    [1, true]
    [{}, true]
    [[], true]
    [(->), true]
    [true, true]
    [false, false]
    [undefined, false]
    [null, false]
  ]
  for [input, output] in pairs
    test "#{output} == rubyTrue #{inspect input}", ->
      assert.equal output, rubyTrue input
      assert.equal output, !rubyFalse input

suite "Art.StandardLib.StandardLib.Ruby.rubyOr", ->

  test "rubyOr 123", -> assert.eq 123, rubyOr 123
  test "rubyOr 0", -> assert.eq 0, rubyOr 0

  test "rubyOr 123, 4", -> assert.eq 123, rubyOr 123, 4
  test "rubyOr undefined", -> assert.eq undefined, rubyOr undefined
  test "rubyOr null", -> assert.eq null, rubyOr null
  test "rubyOr false", -> assert.eq false, rubyOr false

  test "rubyOr 0, 4", -> assert.eq 0, rubyOr 0, 4
  test "rubyOr undefined, 4", -> assert.eq 4, rubyOr undefined, 4
  test "rubyOr null, 4", -> assert.eq 4, rubyOr null, 4
  test "rubyOr false, 4", -> assert.eq 4, rubyOr false, 4

  test "rubyOr undefined, false", -> assert.eq false, rubyOr undefined, false
  test "rubyOr null, false", -> assert.eq false, rubyOr null, false
  test "rubyOr false, null", -> assert.eq null, rubyOr false, null

  test "rubyOr false, 0, 4, 5", -> assert.eq 0, rubyOr false, 0, 4, 5
  test "rubyOr false, undefined, 4, 5", -> assert.eq 4, rubyOr false, undefined, 4, 5
  test "rubyOr false, null, 4, 5", -> assert.eq 4, rubyOr false, null, 4, 5
  test "rubyOr false, false, 4, 5", -> assert.eq 4, rubyOr false, false, 4, 5

suite "Art.StandardLib.StandardLib.Ruby.rubyAnd", ->

  test "rubyAnd 123", -> assert.eq 123, rubyAnd 123
  test "rubyAnd 0", -> assert.eq 0, rubyAnd 0
  test "rubyAnd undefined", -> assert.eq undefined, rubyAnd undefined
  test "rubyAnd null", -> assert.eq null, rubyAnd null
  test "rubyAnd false", -> assert.eq false, rubyAnd false

  test "rubyAnd 123, 4", -> assert.eq 4, rubyAnd 123, 4

  test "rubyAnd 0, 4", -> assert.eq 4, rubyAnd 0, 4
  test "rubyAnd 0, 0", -> assert.eq 0, rubyAnd 0, 0
  test "rubyAnd undefined, 4", -> assert.eq undefined, rubyAnd undefined, 4
  test "rubyAnd null, 4", -> assert.eq null, rubyAnd null, 4
  test "rubyAnd false, 4", -> assert.eq false, rubyAnd false, 4

  test "rubyAnd 0, 4, 5", -> assert.eq 5, rubyAnd 0, 4, 5
  test "rubyAnd 0, 4, null", -> assert.eq null, rubyAnd 0, 4, null
  test "rubyAnd 0, false, 5", -> assert.eq false, rubyAnd 0, false, 5
  test "rubyAnd undefined, 4, 5", -> assert.eq undefined, rubyAnd undefined, 4, 5
