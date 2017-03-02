
{Foundation} = Neptune.Art
{
  eq, clone, inspect, capitalize, upperCamelCase, lowerCamelCase
  snakeCase, pluralize, allIndexes, randomString
  consistentJsonStringify
  splitRuns
  humanFriendlyShorten
  formattedInspect
  getLowerCaseCodeWords
  w
} = Foundation

suite "Art.Foundation.StandardLib.String.Case", ->

  test "capitalize", ->
    assert.eq "Foo", capitalize "foo"
    assert.eq "Foo", capitalize "Foo"
    assert.eq "Foo bar", capitalize "foo bar"


testCodeCase = (testIn) ->
  suite "Art.Foundation.StandardLib.String.Case.getLowerCaseCodeWords", ->
    test "getLowerCaseCodeWords #{formattedInspect testIn} >> ['foo', 'bar', 'baz']", ->
      assert.eq getLowerCaseCodeWords(testIn), w 'foo bar baz'

  suite "Art.Foundation.StandardLib.String.Case.upperCamelCase", ->
    test "upperCamelCase #{formattedInspect testIn} >> 'FooBarBaz'", ->
      assert.eq upperCamelCase(testIn), 'FooBarBaz'

  suite "Art.Foundation.StandardLib.String.Case.lowerCamelCase", ->
    test "lowerCamelCase #{formattedInspect testIn} >> 'fooBarBaz'", ->
      assert.eq lowerCamelCase(testIn), 'fooBarBaz'

  suite "Art.Foundation.StandardLib.String.Case.snakeCase", ->
    test "snaleCase #{formattedInspect testIn} >> 'foo_bar_baz'", ->
      assert.eq snakeCase(testIn), 'foo_bar_baz'

testCodeCase "foo_bar_baz"
testCodeCase "foo-bar-baz"
testCodeCase "-foo-bar-baz"
testCodeCase "FooBarBaz"
testCodeCase "FooBar_baz"
testCodeCase "fooBarBaz"
testCodeCase "FOO_BAR_BAZ"
testCodeCase "  ??foo !bar_ baz- "

testReflexivity = (string, codeWords) ->
  suite "Art.Foundation.StandardLib.String.Case.reflexivity", ->
    test string, ->
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
