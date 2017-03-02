{merge, w, defineModule} = Neptune.Art.StandardLib
{ConfigRegistry, Configuration} = Neptune.Art.Config

defineModule module, class TestConfig extends Configuration
  propA:    "propAFromTestConfig"
