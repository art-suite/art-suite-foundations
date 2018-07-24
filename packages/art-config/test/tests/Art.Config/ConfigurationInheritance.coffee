{w, configure, merge, getArtConfig, defineModule, Configuration} = require '../../StandardImport'

expectedPath = w "Tests Art Config"

configPath = "Tests.Art.Config"
pathedConfig = "#{configPath}": foo: 1
expanededPathedConfig = Tests: Art: Config: foo: 1

class MyBaseConfiguration extends Configuration
    baseConfigValue:      "food"
    overiddenBaseValue:   "foo"

defineModule module, class ConfigurationInheritance extends MyBaseConfiguration
  overiddenBaseValue:   "bar"

  @suite: ->
    test "inheritance works", ->
      assert.eq ConfigurationInheritance.prototype.baseConfigValue, "food"

  #     test "getPathedDefaultConfig", ->
  #       assert.eq TestConfiguration.getPathedDefaultConfig(), "#{configPath}": defaultConfig

  #   Configuring: ->
  #     test "TestConfiguration.getConfigurationPath", ->
  #       assert.eq TestConfiguration.getConfigurationPath(), expectedPath

  #     test "TestConfiguration.getConfigurationFromPath - not found", ->
  #       assert.eq undefined,
  #         TestConfiguration.getConfigurationFromPath
  #           Tests: foo: 1

  #     test "TestConfiguration.getConfigurationFromPath - found", ->
  #       assert.eq
  #         foo: 1
  #         TestConfiguration.getConfigurationFromPath expanededPathedConfig

  #     test "TestConfiguration.reset()", ->
  #       configBefore = TestConfiguration.config
  #       TestConfiguration.config.shouldBeDeleted = "bam!"
  #       TestConfiguration.reset()
  #       assert.eq TestConfiguration.config,
  #         name: "TestName"
  #         verbose: false

  #       # same object
  #       assert.equal configBefore, TestConfiguration.config

  #     test "configure", ->
  #       TestConfiguration.reset()

  #       configure artConfig: merge
  #         # verbose: true
  #         novelProp: "cool"
  #         pathedConfig

  #       assert.eq TestConfiguration.config,
  #         getArtConfig().Tests.Art.Config

  #       assert.eq TestConfiguration.config,
  #         name: "TestName"
  #         foo: 1
  #         verbose: false

  #     test "event", ->
  #       # assert.isFunction TestConfiguration.on
  #       new Promise (resolve) ->
  #         TestConfiguration.on configured: ->
  #           resolve()

  #       TestConfiguration.reset()

  #       configure artConfig: merge
  #         # verbose: true
  #         novelProp: "cool"
  #         pathedConfig
