"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "SourceRootFinder",
      "beforeEach",
      "afterEach",
      "describe",
      "test",
      "assert",
    ],
    [global, require("./StandardImport")],
    (SourceRootFinder, beforeEach, afterEach, describe, test, assert) => {
      let defaultSourceRootFinder,
        customSourceRootFinder,
        cwd,
        stripTrailingSlash,
        testOne,
        tester;
      defaultSourceRootFinder = new SourceRootFinder();
      customSourceRootFinder = new SourceRootFinder({
        indicatorFiles: ["README.txt"],
      });
      cwd = require("process").cwd();
      stripTrailingSlash = function (s) {
        return s.replace(/[\/\\]$/, "");
      };
      beforeEach(function () {
        return require("mock-fs")({
          "package.json": "{}",
          myRoot: {
            "package.json": "{}",
            subPackages: { funnel: { "package.json": "{}" } },
            source: { Widgets: { "Button.caf": "..." }, "Main.caf": "..." },
          },
          gitRooted: { ".git": { config: "..." }, source: { foo: "..." } },
          noRoot: { foo: "..." },
          customRoot: {
            "README.txt": "hello",
            notReallyRoot: { "package.json": "{}" },
          },
        });
      });
      afterEach(function () {
        return require("mock-fs").restore();
      });
      testOne = function (
        input,
        output,
        sourceRootFinder = defaultSourceRootFinder
      ) {
        if (output) {
          output = stripTrailingSlash(require("path").join(cwd, output));
        }
        test(`sync: ${Caf.toString(input)}`, () => {
          let first, second;
          sourceRootFinder.resetKnownSourceRoots();
          first = sourceRootFinder.findSourceRootSync(input);
          second = sourceRootFinder.findSourceRootSync(input);
          assert.eq(first, second);
          return assert.eq(first, output);
        });
        return test(`async: ${Caf.toString(input)}`, () => {
          sourceRootFinder.resetKnownSourceRoots();
          return sourceRootFinder.findSourceRoot(input).then((first) =>
            sourceRootFinder.findSourceRoot(input).then((second) => {
              assert.eq(first, second);
              return assert.eq(first, output);
            })
          );
        });
      };
      tester = function (sourceRootFinder, tests) {
        return Caf.each2(tests, (output, input) =>
          testOne(input, output, sourceRootFinder)
        );
      };
      return describe({
        defaults: function () {
          return testOne(null, "./");
        },
        defaultIndicatorFiles: function () {
          return tester(defaultSourceRootFinder, {
            "myRoot/source": "myRoot",
            "myRoot/source/": "myRoot",
            "myRoot/source/Main.caf": "myRoot",
            "myRoot/source/Widgets": "myRoot",
            "myRoot/subPackages": "myRoot",
            "myRoot/subPackages/funnel": "myRoot/subPackages/funnel",
            gitRooted: "gitRooted",
            "gitRooted/source": "gitRooted",
            "../": false,
            noRoot: "./",
            customRoot: "./",
            "customRoot/notReallyRoot": "customRoot/notReallyRoot",
          });
        },
        customIndicatorFiles: function () {
          return tester(customSourceRootFinder, {
            noRoot: false,
            customRoot: "customRoot",
            "customRoot/notReallyRoot": "customRoot",
          });
        },
      });
    }
  );
});
