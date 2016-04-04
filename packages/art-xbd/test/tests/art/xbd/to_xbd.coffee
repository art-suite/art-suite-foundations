Foundation = require 'art-foundation'
Xbd = require 'art-xbd'

{Binary, log, RestClient} = Foundation
{toXbd, fromXbd} = Xbd

suite "Art.Xbd.to xbd", ->
  test "foo", ->
    xbd = toXbd input = foo: "bar"
    output = fromXbd xbd
    assert.eq input, output, "expected input to equal output"


