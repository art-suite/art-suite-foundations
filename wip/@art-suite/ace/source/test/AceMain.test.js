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
      "aceUpdate",
      "assert",
    ],
    [global, require("./StandardImport")],
    (
      beforeAll,
      mockAceForTesting,
      afterEach,
      test,
      mockFs,
      aceUpdate,
      assert
    ) => {
      beforeAll(mockAceForTesting);
      afterEach(function () {
        return mockFs.restore();
      });
      return test("aceUpdate", function () {
        mockFs({});
        return aceUpdate().then((aceConfig) => assert.eq(aceConfig, {}));
      });
    }
  );
});
