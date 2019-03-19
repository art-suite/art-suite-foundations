
{StandardLib} = Neptune.Art
{
  eq, clone, inspect, capitalize, upperCamelCase, lowerCamelCase
  snakeCase, pluralize, allIndexes, randomString
  consistentJsonStringify
  jsStringify
  splitRuns
  humanFriendlyShorten
  cryptoRandomString
  compactFlattenJoin
  getPadding
} = StandardLib


hfsStest = (input, maxLength, output) ->
  test "'#{input}', #{maxLength} == '#{output}'", ->
    assert.eq output, actualOutput = humanFriendlyShorten input, maxLength
    assert.eq input, actualOutput if input.length <= maxLength
    assert.eq true, actualOutput.length <= maxLength
    assert.eq true, actualOutput.length >= maxLength / 2


module.exports = suite:
  misc: ->
    test "getPadding", ->
      assert.eq '', getPadding 0
      assert.eq ' ', getPadding 1
      assert.eq '  ', getPadding 2
      assert.eq '--', getPadding 2, '-'

    test "randomString", ->
      assert.eq 32, randomString(32).length
      assert.neq randomString(32), randomString(32)

    test "allIndexes", ->
      str = "hi there mom. How are    you?"
      assert.eq allIndexes(str, /\s+/g), [2, 8, 13, 17, 21]

    test "compactFlattenJoin", ->
      assert.eq "a messy mess", compactFlattenJoin " ", [["a"], null, undefined, [], "messy", [[["mess"]]]]

  pluralize:
    basic: ->

      test "pluralize 'user'",      -> assert.eq "users", pluralize "user"
      test "pluralize 'users'",     -> assert.eq "users", pluralize "users"
      test "pluralize 'person'",    -> assert.eq "people", pluralize "person"
      test "pluralize 'person_'",   -> assert.eq "people_", pluralize "person_"
      test "pluralize 'people'",    -> assert.eq "people", pluralize "people"
      test "pluralize 0, 'user'",   -> assert.eq "0 users",   pluralize 0, "user"
      test "pluralize 1, 'user'",   -> assert.eq "1 user",    pluralize 1, "user"
      test "pluralize -1, 'user'",  -> assert.eq "-1 users",    pluralize -1, "user"
      test "pluralize 2, 'user'",   -> assert.eq "2 users",   pluralize 2, "user"
      test "pluralize 1, 'people'", -> assert.eq "1 person",  pluralize 1, "person"
      test "pluralize 3, 'people'", -> assert.eq "3 people",  pluralize 3, "people"


      test "pluralize 3, 'dragon', 'toads'", ->
        assert.eq "3 toads",  pluralize 3, 'dragon', 'toads'

      test "pluralize 1, 'dragon', 'toads'", ->
        assert.eq "1 dragon",  pluralize 1, 'dragon', 'toads'

    regressions: ->
      test "pluralize null, 'user'",      -> assert.eq "users",    pluralize null, "user"
      test "pluralize undefined, 'user'", -> assert.eq "users",    pluralize undefined, "user"
      test "pluralize '', 'user'", ->       assert.eq "users",    pluralize '', "user"

  jsStringify: ->
    list = [
      null
      true
      false
      0
      -123
      123
      123.456
      'hi'
      'hi\nthere'
      []
      [1]
      [1,2,3]
      {}
      {a:1}
      {a:1, b:2}
      {
        number: 1
        string: "hi"
        null: null
        true: true
        false: false
        object: foo:1, bar:2
        array: [1, 2, 3]
      }
      [
        1, "hi", null, true, false, {bar:1, foo:2}, [1, 2, 3]
      ]

    ]
    for o in list
      test "#{jsStringify o}", ->
        assert.eq o, eval jsStringify o

  consistentJsonStringify:
    basic: ->
      test "consistentJsonStringify null, true, false", ->
        assert.eq "null", consistentJsonStringify null
        assert.eq "true", consistentJsonStringify true
        assert.eq "false", consistentJsonStringify false

      test "consistentJsonStringify numbers", ->
        assert.eq "0", consistentJsonStringify 0
        assert.eq "-123", consistentJsonStringify -123
        assert.eq "123", consistentJsonStringify 123
        assert.eq "123.456", consistentJsonStringify 123.456

      test "consistentJsonStringify string", ->
        assert.eq '"hi"', consistentJsonStringify "hi"
        assert.eq "\"hi\\nthere\"", consistentJsonStringify "hi\nthere"

      test "consistentJsonStringify array", ->
        assert.eq "[]", consistentJsonStringify []
        assert.eq "[1]", consistentJsonStringify [1]
        assert.eq "[1, 2, 3]", consistentJsonStringify [1, 2, 3]

      test "consistentJsonStringify objects", ->
        assert.eq "{}", consistentJsonStringify {}
        assert.eq '{"a": 1}', consistentJsonStringify a:1
        assert.eq '{"a": 1, "b": 2}', consistentJsonStringify a:1, b:2

      test "consistentJsonStringify objects consistently", ->
        o1 = a:1, b:2
        o2 = b:2, a:1
        assert.eq '{"a": 1, "b": 2}', consistentJsonStringify o1
        assert.eq '{"a": 1, "b": 2}', consistentJsonStringify o2
        assert.neq JSON.stringify(o1), JSON.stringify(o2)

      test "consistentJsonStringify compound object", ->
        o =
          number: 1
          string: "hi"
          null: null
          true: true
          false: false
          object: foo:1, bar:2
          array: [1, 2, 3]

        assert.eq '{"array": [1, 2, 3], "false": false, "null": null, "number": 1, "object": {"bar": 2, "foo": 1}, "string": "hi", "true": true}'
        , consistentJsonStringify o

      test "consistentJsonStringify compound array", ->
        a = [
          1, "hi", null, true, false, {foo:1, bar:2}, [1, 2, 3]
        ]

        assert.eq '[1, "hi", null, true, false, {"bar": 2, "foo": 1}, [1, 2, 3]]'
        , consistentJsonStringify a

    indent: ->
      test "basic object", ->
        obj =
          foo: 123
          bar: 456

        assert.eq """
          {
            "bar": 456,
            "foo": 123
          }
          """
        , consistentJsonStringify obj, '  '

      test "nested objects", ->
        obj =
          foo: one: 1, two: 2
          bar: three: 3, four: 4

        assert.eq """
          {
            "bar": {
              "four": 4,
              "three": 3
            },
            "foo": {
              "one": 1,
              "two": 2
            }
          }
          """
        , consistentJsonStringify obj, '  '

      test "basic array", ->
        obj = [
          123
          456
        ]

        assert.eq """
          [
            123,
            456
          ]
          """
        , consistentJsonStringify obj, '  '

      test "nested arrays", ->
        obj = [
          [1, 2]
          [3, 4]
        ]

        assert.eq """
          [
            [
              1,
              2
            ],
            [
              3,
              4
            ]
          ]
          """
        , consistentJsonStringify obj, '  '

  splitRuns: ->
    test "splitRuns ''", -> assert.eq [], splitRuns ''
    test "splitRuns ' '", -> assert.eq [[' ', 1]], splitRuns ' '
    test "splitRuns ' a'", -> assert.eq [[' ', 1], ['a', 1]], splitRuns ' a'
    test "splitRuns ' a '", -> assert.eq [[' ', 1], ['a', 1], [' ', 1]], splitRuns ' a '
    test "splitRuns '  a'", -> assert.eq [[' ', 2], ['a', 1]], splitRuns '  a'
    test "splitRuns 'ab'", -> assert.eq [['a', 1], ['b', 1]], splitRuns 'ab'
    test "splitRuns 'aA'", -> assert.eq [['a', 1], ['A', 1]], splitRuns 'aA'
    test "splitRuns 'aa'", -> assert.eq [['a', 2]          ], splitRuns 'aa'
    test "splitRuns 'aaabbb'", -> assert.eq [['a', 3], ['b', 3]], splitRuns 'aaabbb'

  humanFriendlyShorten:
    noWhitespace: ->
      test "'foobar', 0 throws error", -> assert.throw -> humanFriendlyShorten "foobar", 0

      hfsStest 'foobar', 1 , '…'
      hfsStest 'foobar', 4 , 'foo…'
      hfsStest 'foobar', 5 , 'foob…'
      hfsStest 'foobar', 6 , 'foobar'
      hfsStest 'foobar', 10, 'foobar'

    untrimmedWhitespace: ->
      test "'  foobar  ', 6 == 'foobar'",  -> assert.eq "foobar", humanFriendlyShorten "  foobar  ", 6

    multiWord: ->
      hfsStest 'foo bar', 1 , '…'
      hfsStest 'foo bar', 5 , 'foo…'
      hfsStest 'foo bar', 6 , 'foo…'
      hfsStest 'foo bar', 7 , 'foo bar'
      hfsStest 'foo bar', 10, 'foo bar'

    "multiWord ensure at least half maxLength": ->
      hfsStest 'f bartender', 3, 'f…'
      hfsStest 'f bartender', 4, 'f b…'

      hfsStest 'fo bartender', 4, 'fo…'
      hfsStest 'fo bartender', 5, 'fo b…'

      hfsStest 'foo bartender', 6, 'foo…'
      hfsStest 'foo bartender', 7, 'foo ba…'

      hfsStest 'food bartender', 8, 'food…'
      hfsStest 'food bartender', 9, 'food bar…'

      hfsStest 'food prep bartenders', 18, 'food prep…'
      hfsStest 'food prep bartenders', 19, 'food prep bartende…'
      hfsStest 'food prep bartenders', 20, 'food prep bartenders'
  cryptoRandomString: ->
    test "basic", ->
      assert.eq 10, (cryptoRandomString 10).length
      assert.neq (cryptoRandomString 10), (cryptoRandomString 10)