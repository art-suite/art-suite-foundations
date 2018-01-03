{w, configure, merge, getArtConfig, defineModule, Configurable} = require '../../StandardImport'

expectedPath = w "Tests Art Config"

configPath = "Tests.Art.Config"
pathedConfig = "#{configPath}": foo: 1
expanededPathedConfig = Tests: Art: Config: foo: 1

defineModule module, class TestConfigurable extends Configurable
  @defaults defaultConfig =
    name:     "TestName"
    verbose:  false

  @suite:
    ConfigurableApi: ->
      test "getDefaults", ->
        assert.eq TestConfigurable.getDefaults(), defaultConfig

      test "getPathedDefaultConfig", ->
        assert.eq TestConfigurable.getPathedDefaultConfig(), "#{configPath}": defaultConfig

    Configuring: ->
      test "TestConfigurable.getConfigurationPath", ->
        assert.eq TestConfigurable.getConfigurationPath(), expectedPath

      test "TestConfigurable.getConfigurationFromPath - not found", ->
        assert.eq undefined,
          TestConfigurable.getConfigurationFromPath
            Tests: foo: 1

      test "TestConfigurable.getConfigurationFromPath - found", ->
        assert.eq
          foo: 1
          TestConfigurable.getConfigurationFromPath expanededPathedConfig

      test "TestConfigurable.reset()", ->
        configBefore = TestConfigurable.config
        TestConfigurable.config.shouldBeDeleted = "bam!"
        TestConfigurable.reset()
        assert.eq TestConfigurable.config,
          name: "TestName"
          verbose: false

        # same object
        assert.equal configBefore, TestConfigurable.config

      test "configure", ->
        TestConfigurable.reset()

        configure artConfig: merge
          # verbose: true
          novelProp: "cool"
          pathedConfig

        assert.eq TestConfigurable.config,
          getArtConfig().Tests.Art.Config

        assert.eq TestConfigurable.config,
          name: "TestName"
          foo: 1
          verbose: false

      test "event", ->
        # assert.isFunction TestConfigurable.on
        new Promise (resolve) ->
          TestConfigurable.on configured: ->
            resolve()

        TestConfigurable.reset()

        configure artConfig: merge
          # verbose: true
          novelProp: "cool"
          pathedConfig
