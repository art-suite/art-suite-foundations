
{StandardLib} = Neptune.Art
clone = StandardLib.Clone.clone
inspect = StandardLib.Inspect.inspect
Inspector2 = StandardLib.Inspect.Inspector2

inspector = () -> new Inspector2

suite "Art.StandardLib.Inspect.Inspector2", ->
  test "inspect 123", -> assert.equal inspector().inspect(123).toString(), "123"
  test "inspect []]", -> assert.equal inspector().inspect([]).toString(), "[]"
  test "inspect [1, 2, 3]]", -> assert.equal inspector().inspect([1, 2, 3]).toString(), "[1, 2, 3]"
  test "inspect {foo:1, bar:2}", -> assert.equal inspector().inspect(foo:1, bar:2).toString(), "{foo: 1, bar: 2}"
  # test "inspect point(1, 2)", -> assert.equal inspector().inspect(new Art.Atomic.Point 1, 2).toString(), "point(1, 2)"
