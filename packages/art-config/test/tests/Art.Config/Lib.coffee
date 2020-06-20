{Lib, formattedInspect} = require '../../StandardImport'

module.exports = suite:
  getExternalEnvironment: ->
    test "artConfig with JSON string", ->
      assert.eq
        artConfig: foo: 1
        artConfigName: undefined
        Lib.getExternalEnvironment artConfig: '{"foo": 1}'

    test "artConfig.* keys - already decoded", ->
      assert.eq
        artConfig: "Art.Foo.bar": 123
        artConfigName: undefined
        Lib.getExternalEnvironment "artConfig.Art.Foo.bar": 123

    test "artConfig.* keys - json encoded", ->
      assert.eq
        artConfig: "Art.Foo.bar": 123
        artConfigName: undefined
        Lib.getExternalEnvironment "artConfig.Art.Foo.bar": "123"

    test "artConfig and artConfig.* keys", ->
      assert.eq
        artConfig: "Art.Foo.bar": 123, foo: 1
        artConfigName: undefined
        Lib.getExternalEnvironment "artConfig.Art.Foo.bar": 123, artConfig: '{"foo": 1}'

    test "normal evaluation doesn't crash", ->
      Lib.getExternalEnvironment()

  smartJsonDecode: ->
    tests =
      '123': 123
      'Hi': 'Hi'
      '"Hi"': 'Hi'
      '[1]': [1]
      '[]': []
      '{"hi":true}': hi: true
      '{}': {}
      'null': null
      'false': false
      'true': true
      'true2': "true2"

    for k, v of tests
      test(
        formattedInspect k
        ->
          assert.eq v,
            Lib.smartJsonDecode k
      )

    test "123", ->
      assert.eq 123,
        Lib.smartJsonDecode 123

    test "undefined", ->
      assert.eq null,
        Lib.smartJsonDecode undefined

  normalizeArtConfigName: ->
    test "normalizeArtConfigName 'prod'",         -> assert.eq "Production",    Lib.normalizeArtConfigName "prod"
    test "normalizeArtConfigName 'dev'",          -> assert.eq "Development",   Lib.normalizeArtConfigName "dev"
    test "normalizeArtConfigName 'development'",  -> assert.eq "Development",   Lib.normalizeArtConfigName "development"
    test "normalizeArtConfigName 'foo bar'",      -> assert.eq "FooBar",        Lib.normalizeArtConfigName "foo bar"
