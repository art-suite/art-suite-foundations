{w, configure, merge, getArtConfig, defineModule, Configuration} = require '../../StandardImport'

class MyBaseConfiguration extends Configuration
    baseConfigValue:      "food"
    overiddenBaseValue:   "foo"

defineModule module, class ConfigurationInheritance extends MyBaseConfiguration
  overiddenBaseValue:   "bar"

  @suite: ->
    test "inherit value", ->
      assert.eq ConfigurationInheritance.prototype.baseConfigValue, "food"

    test "override value", ->
      assert.eq ConfigurationInheritance.prototype.overiddenBaseValue, "bar"
