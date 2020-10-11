{configure,ConfigRegistry, getArtConfig,getArtConfigName,merge} = require '../../StandardImport'

resetGlobals = ->
  global.artConfig = null
  global.artConfigName = null

testArtConfigGlobalConfig = (name, f) ->
  test name, ->
    value = f()
    assert.eq getArtConfig(), merge
      Tests: Art: Config: name: "TestName", verbose: false
      value

module.exports = suite:
  globalArtConfig: ->
    setup ->
      configure()

    test "Art.Config.config",     ->
      assert.isObject getArtConfig()
      assert.eq Neptune.Art.Config.config, getArtConfig()

    test "Art.Config.configName", ->
      assert.isString getArtConfigName()
      assert.eq Neptune.Art.Config.configName, getArtConfigName()

  artConfigSources: ->
    setup resetGlobals
    teardown resetGlobals

    testArtConfigGlobalConfig "args", ->
      configure artConfig: foo: "argsBar"
      foo: "argsBar"

    testArtConfigGlobalConfig "global.artConfig", ->
      global.artConfig = foo: "globalBar"
      configure()
      foo: "globalBar"

    testArtConfigGlobalConfig "env", ->
      configure artConfig: {}, __testEnv: artConfig: foo: "envBar"
      foo: "envBar"

  pathedConfigProps: ->
    setup resetGlobals
    teardown resetGlobals

    testArtConfigGlobalConfig "foo.bar: 'globalBar'", ->
      global.artConfig = "foo.bar": "globalBar"
      configure()
      foo: bar: "globalBar"

  artConfigNameSources: ->
    setup resetGlobals
    teardown resetGlobals

    testArtConfigGlobalConfig "baseline", ->
      configure()
      assert.eq getArtConfigName(), "Development"
      {}

    testArtConfigGlobalConfig "args", ->
      configure artConfigName: 'TestConfig'
      assert.eq getArtConfigName(), 'TestConfig'
      propA: "propAFromTestConfig"
      MyGrouping: propB: "foo",  propC: "bar"

    testArtConfigGlobalConfig "global", ->
      global.artConfigName = 'TestConfig'
      configure()
      assert.eq getArtConfigName(), 'TestConfig'
      propA: "propAFromTestConfig"
      MyGrouping: propB: "foo",  propC: "bar"


    testArtConfigGlobalConfig "env", ->
      configure artConfig: {}, __testEnv: artConfigName: 'TestConfig'
      assert.eq getArtConfigName(), 'TestConfig'
      propA: "propAFromTestConfig"
      MyGrouping: propB: "foo",  propC: "bar"

  configs: ->
    test "TestConfig got registered", ->
      assert.selectedEq
        propA: "propAFromTestConfig"
        MyGrouping: propB: "foo",  propC: "bar"
        ConfigRegistry.configs.TestConfig
