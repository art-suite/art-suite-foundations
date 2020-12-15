"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "test",
      "assert",
      "Object",
      "fromXbd",
      "XbdTag",
      "MyRootTag",
      "binary",
      "ATag",
      "BTag",
    ],
    [
      global,
      require("./StandardImport"),
      require("art-binary"),
      require("../Art.Xbd").createTagFactories("A B myRoot"),
    ],
    (test, assert, Object, fromXbd, XbdTag, MyRootTag, binary, ATag, BTag) => {
      let testXbd;
      testXbd = function (testName, tagFactory) {
        return test(testName, () => {
          let inputTag;
          inputTag = tagFactory();
          return inputTag.xbdPromise.then((xbdBinaryString) => {
            let outputTag;
            assert.eq(true, Caf.is(inputTag.inspectedObjects, Object));
            assert.eq(true, Caf.is(inputTag.plainObjects, Object));
            inputTag.inspect();
            inputTag.find("MyRootTag");
            inputTag.find("A");
            inputTag.find("B");
            outputTag = fromXbd(xbdBinaryString);
            return assert.eq(
              inputTag.xml,
              outputTag.xml,
              "expected input to equal output"
            );
          });
        });
      };
      testXbd("MyRootTag", function () {
        return new XbdTag("MyRootTag");
      });
      testXbd("MyRootTag foo: 'bar'", function () {
        return new XbdTag("MyRootTag", { foo: "bar" });
      });
      testXbd("MyRootTag binary: binary ...", function () {
        return MyRootTag({
          binary: binary([0xbe, 0xef, 0, 1, 2, 3, 0xbe, 0xef]),
        });
      });
      testXbd("MyRootTag ATag", function () {
        return MyRootTag(ATag());
      });
      testXbd("MyRootTag ATag, ATag", function () {
        return MyRootTag(ATag(), ATag());
      });
      testXbd("nested Tags", function () {
        return MyRootTag(ATag(ATag()));
      });
      testXbd("reused tag, attr and value strings", function () {
        return MyRootTag(
          { foo: "bar" },
          ATag(),
          ATag({ foo: "far" }),
          BTag({ fab: "bar" })
        );
      });
      test("eq", function () {
        return assert.eq(new XbdTag("MyRootTag"), new XbdTag("MyRootTag"));
      });
      return test("neq", function () {
        return assert.neq(new XbdTag("MyRootTag"), new XbdTag("MyRootTag2"));
      });
    }
  );
});
