"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "describe",
      "test",
      "assert",
      "getArtConfig",
      "merge",
      "beforeAll",
      "configure",
      "Neptune",
      "getArtConfigName",
      "afterAll",
      "ConfigRegistry",
    ],
    [global, require("./StandardImport")],
    (
      describe,
      test,
      assert,
      getArtConfig,
      merge,
      beforeAll,
      configure,
      Neptune,
      getArtConfigName,
      afterAll,
      ConfigRegistry
    ) => {
      let resetGlobals, testArtConfigGlobalConfig;
      resetGlobals = function () {
        global.artConfig = null;
        return (global.artConfigName = null);
      };
      testArtConfigGlobalConfig = function (name, f) {
        return test(name, () => {
          let value;
          value = f();
          return assert.eq(
            getArtConfig(),
            merge(
              {
                Test: { Art: { Config: { name: "TestName", verbose: false } } },
              },
              value
            )
          );
        });
      };
      return describe({
        globalArtConfig: function () {
          beforeAll(() => configure({ configName: "Test" }));
          test("Art.Config.config", () => {
            assert.isObject(getArtConfig());
            return assert.eq(Neptune.Art.Config.config, getArtConfig());
          });
          return test("Art.Config.configName", () => {
            assert.isString(getArtConfigName());
            return assert.eq(Neptune.Art.Config.configName, getArtConfigName());
          });
        },
        artConfigSources: function () {
          beforeAll(resetGlobals);
          testArtConfigGlobalConfig("args", () => {
            configure({ artConfigName: "Test", artConfig: { foo: "argsBar" } });
            return { foo: "argsBar" };
          });
          testArtConfigGlobalConfig("global.artConfig", () => {
            global.artConfig = { foo: "globalBar" };
            configure({ artConfigName: "Test" });
            return { foo: "globalBar" };
          });
          return testArtConfigGlobalConfig("env", () => {
            configure({
              artConfigName: "Test",
              artConfig: {},
              __testEnv: { artConfig: { foo: "envBar" } },
            });
            return { foo: "envBar" };
          });
        },
        pathedConfigProps: function () {
          beforeAll(resetGlobals);
          afterAll(resetGlobals);
          return testArtConfigGlobalConfig("foo.bar: 'globalBar'", () => {
            global.artConfig = { "foo.bar": "globalBar" };
            configure({ artConfigName: "Test" });
            return { foo: { bar: "globalBar" } };
          });
        },
        artConfigNameSources: function () {
          beforeAll(resetGlobals);
          afterAll(resetGlobals);
          testArtConfigGlobalConfig("baseline", () => {
            configure();
            assert.eq(getArtConfigName(), "Development");
            return {};
          });
          testArtConfigGlobalConfig("args", () => {
            configure({ artConfigName: "TestConfig" });
            assert.eq(getArtConfigName(), "TestConfig");
            return {
              propA: "propAFromTestConfig",
              MyGrouping: { propB: "foo", propC: "bar" },
            };
          });
          testArtConfigGlobalConfig("global", () => {
            global.artConfigName = "TestConfig";
            configure();
            assert.eq(getArtConfigName(), "TestConfig");
            return {
              propA: "propAFromTestConfig",
              MyGrouping: { propB: "foo", propC: "bar" },
            };
          });
          return testArtConfigGlobalConfig("env", () => {
            configure({
              artConfig: {},
              __testEnv: { artConfigName: "TestConfig" },
            });
            assert.eq(getArtConfigName(), "TestConfig");
            return {
              propA: "propAFromTestConfig",
              MyGrouping: { propB: "foo", propC: "bar" },
            };
          });
        },
        configs: function () {
          return test("TestConfig got registered", () =>
            assert.selectedEq(
              {
                propA: "propAFromTestConfig",
                MyGrouping: { propB: "foo", propC: "bar" },
              },
              ConfigRegistry.configs.TestConfig
            ));
        },
      });
    }
  );
});
