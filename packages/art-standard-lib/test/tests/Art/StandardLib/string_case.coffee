
{StandardLib} = Neptune.Art
{
  getCodeWords
  eq, clone, inspect, capitalize, upperCamelCase, lowerCamelCase
  snakeCase, pluralize, allIndexes, randomString
  consistentJsonStringify
  splitRuns
  humanFriendlyShorten
  formattedInspect
  getLowerCaseCodeWords
  w
  capitalizedDashCase
} = StandardLib

suite "Art.StandardLib.StandardLib.String.Case", ->

  test "capitalize", ->
    assert.eq "Foo", capitalize "foo"
    assert.eq "Foo", capitalize "Foo"
    assert.eq "Foo bar", capitalize "foo bar"


testCodeCase = (testIn) ->
  suite "Art.StandardLib.StandardLib.String.Case.getLowerCaseCodeWords", ->
    test "getLowerCaseCodeWords #{formattedInspect testIn} >> ['foo', 'bar', 'baz']", ->
      assert.eq getLowerCaseCodeWords(testIn), w 'foo bar baz'

  suite "Art.StandardLib.StandardLib.String.Case.upperCamelCase", ->
    test "upperCamelCase #{formattedInspect testIn} >> 'FooBarBaz'", ->
      assert.eq upperCamelCase(testIn), 'FooBarBaz'

  suite "Art.StandardLib.StandardLib.String.Case.lowerCamelCase", ->
    test "lowerCamelCase #{formattedInspect testIn} >> 'fooBarBaz'", ->
      assert.eq lowerCamelCase(testIn), 'fooBarBaz'

  suite "Art.StandardLib.StandardLib.String.Case.snakeCase", ->
    test "snakeCase #{formattedInspect testIn} >> 'foo_bar_baz'", ->
      assert.eq snakeCase(testIn), 'foo_bar_baz'

  suite "Art.StandardLib.StandardLib.String.Case.capitalizedDashCase", ->
    test "capitalizedDashCase #{formattedInspect testIn} >> 'foo_bar_baz'", ->
      assert.eq capitalizedDashCase(testIn), 'Foo-Bar-Baz'

testCodeCase "foo_bar_baz"
testCodeCase "foo-bar-baz"
testCodeCase "-foo-bar-baz"
testCodeCase "FooBarBaz"
testCodeCase "FooBar_baz"
testCodeCase "fooBarBaz"
testCodeCase "FOO_BAR_BAZ"
testCodeCase "  ??foo !bar_ baz- "

testCodeWords = (testIn, codeWords) ->
  suite "Art.StandardLib.StandardLib.String.Case.getLowerCaseCodeWords", ->
    test "getLowerCaseCodeWords #{formattedInspect testIn} >> #{inspect codeWords}", ->
      assert.eq getLowerCaseCodeWords(testIn), codeWords

testCodeWords "foo 123 bar", ["foo", "123", "bar"]
testCodeWords "foo-123-bar", ["foo", "123", "bar"]
testCodeWords "foo_123_bar", ["foo", "123", "bar"]
testCodeWords "foo 123bar", ["foo", "123", "bar"]
testCodeWords "foo123 bar", ["foo123", "bar"]
testCodeWords "foo123bar", ["foo123bar"]
testCodeWords "foo123Bar", ["foo123", "bar"]
testCodeWords "hiFoo123byBar", ["hi", "foo123by", "bar"]

testReflexivity = (string, codeWords) ->
  suite "Art.StandardLib.StandardLib.String.Case.reflexivity", ->
    test string ? 'null', ->
      ucc = upperCamelCase string
      lcc = lowerCamelCase string
      sc  = snakeCase string
      base = codeWords || getLowerCaseCodeWords string
      assert.eq base, getLowerCaseCodeWords ucc
      assert.eq base, getLowerCaseCodeWords lcc
      assert.eq base, getLowerCaseCodeWords sc

testReflexivity "foo"
testReflexivity "iFrame", w "i frame"
testReflexivity "ISSFrame", w "iss frame"

testReflexivity null, []

test "getCodeWords works with null input", ->
  assert.eq [], getCodeWords()

