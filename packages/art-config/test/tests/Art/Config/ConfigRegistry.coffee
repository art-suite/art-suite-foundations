{w, log, defineModule} = Neptune.Art.StandardLib
{ConfigRegistry, Configurable} = Neptune.Art.Config

resetGlobals = ->
  global.artConfig = null
  global.artConfigName = null

defineModule module, suite:
  artConfigSources: ->
    setup resetGlobals
    teardown resetGlobals

    test "args", ->
      ConfigRegistry.configure foo: "argsBar"
      assert.eq ConfigRegistry.artConfig, foo: "argsBar"

    test "merged args", ->
      ConfigRegistry.configure {foo: "argsFoo"}, {bar: "argsBar"}
      assert.eq ConfigRegistry.artConfig,
        foo: "argsFoo"
        bar: "argsBar"

    test "global.artConfig", ->
      global.artConfig = foo: "globalBar"
      ConfigRegistry.configure()
      assert.eq ConfigRegistry.artConfig, foo: "globalBar"

    test "env", ->
      ConfigRegistry.configure artConfig: {}, __testEnv: artConfig: JSON.stringify foo: "envBar"
      assert.eq ConfigRegistry.artConfig, foo: "envBar"

    test "parseQuery", ->
      ConfigRegistry.configure artConfig: {}, __testQueryString: "?artConfig=#{JSON.stringify foo: "queryBar"}"
      assert.eq ConfigRegistry.artConfig, foo: "queryBar"

  pathedConfigProps: ->
    setup resetGlobals
    teardown resetGlobals

    test "foo.bar: 'globalBar'", ->
      global.artConfig = "foo.bar": "globalBar"
      ConfigRegistry.configure()
      assert.eq ConfigRegistry.artConfig, foo: bar: "globalBar"

  artConfigNameSources: ->
    setup resetGlobals
    teardown resetGlobals

    test "baseline", ->
      ConfigRegistry.configure()
      assert.eq ConfigRegistry.artConfig, {}
      assert.eq ConfigRegistry.artConfigName, "Development"

    test "args", ->
      ConfigRegistry.configure artConfigName: 'TestConfig'
      assert.eq ConfigRegistry.artConfig, propA: "propAFromTestConfig"
      assert.eq ConfigRegistry.artConfigName, 'TestConfig'

    test "global", ->
      global.artConfigName = 'TestConfig'
      ConfigRegistry.configure()
      assert.eq ConfigRegistry.artConfig, propA: "propAFromTestConfig"
      assert.eq ConfigRegistry.artConfigName, 'TestConfig'

    test "env", ->
      ConfigRegistry.configure artConfig: {}, __testEnv: artConfigName: 'TestConfig'
      assert.eq ConfigRegistry.artConfig, propA: "propAFromTestConfig"
      assert.eq ConfigRegistry.artConfigName, 'TestConfig'

    test "parseQuery", ->
      ConfigRegistry.configure artConfig: {}, __testQueryString: "?artConfigName=TestConfig"
      assert.eq ConfigRegistry.artConfig, propA: "propAFromTestConfig"
      assert.eq ConfigRegistry.artConfigName, 'TestConfig'

  configs: ->
    test "TestConfig got registered", ->
      assert.eq ConfigRegistry.configs,
        TestConfig:
          propA: "propAFromTestConfig"

  getExternalEnvironment: ->
    test "query param", ->
      assert.eq
        artConfig: foo: 1
        artConfigName: undefined
        ConfigRegistry.getExternalEnvironment null, '?artConfig={"foo":%201}'

    test "env", ->
      assert.eq
        artConfig: foo: "envBar"
        artConfigName: undefined
        ConfigRegistry.getExternalEnvironment artConfig: JSON.stringify foo: "envBar"

  normalizeArtConfigName: ->
    test "normalizeArtConfigName 'prod'", -> assert.eq "Production", ConfigRegistry.normalizeArtConfigName "prod"
    test "normalizeArtConfigName 'dev'", -> assert.eq "Development", ConfigRegistry.normalizeArtConfigName "dev"

    test "normalizeArtConfigName 'development'", -> assert.eq "Development", ConfigRegistry.normalizeArtConfigName "development"

    test "normalizeArtConfigName 'foo bar'", -> assert.eq "FooBar", ConfigRegistry.normalizeArtConfigName "foo bar"
