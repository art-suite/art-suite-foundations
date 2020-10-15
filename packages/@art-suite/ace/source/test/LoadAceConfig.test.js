"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "beforeAll",
      "mockAceForTesting",
      "afterEach",
      "test",
      "mockFs",
      "LoadAceConfig",
      "assert",
    ],
    [global, require("./StandardImport")],
    (
      beforeAll,
      mockAceForTesting,
      afterEach,
      test,
      mockFs,
      LoadAceConfig,
      assert
    ) => {
      beforeAll(mockAceForTesting);
      afterEach(function () {
        return mockFs.restore();
      });
      test("loadAceConfig", function () {
        mockFs({});
        return LoadAceConfig.loadAceConfig(".").then((aceConfig) =>
          assert.eq(aceConfig, {})
        );
      });
      return test("loadAceConfig with config", function () {
        mockFs({ "ace.config.caf": '{"files": {"foo": "bar"}}' });
        return LoadAceConfig.loadAceConfig(".").then((aceConfig) =>
          assert.eq(aceConfig, { files: { foo: "bar" } })
        );
      });
    }
  );
});
