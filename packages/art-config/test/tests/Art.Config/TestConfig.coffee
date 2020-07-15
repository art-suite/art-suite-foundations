{Configuration, defineModule, log} = require '../../StandardImport'

# Used by ConfigRegistry tests
defineModule module, class TestConfig extends Configuration
  propA:    "propAFromTestConfig"
  MyGrouping:
    propB:  "foo"
  @deepMergeInConfig
    MyGrouping:
      propC:  "bar"
