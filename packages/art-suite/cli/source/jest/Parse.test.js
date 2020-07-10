"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  let parentImports;
  return Caf.importInvoke(
    ["ArtCli"],
    (parentImports = [global, require("./StandardImport")]),
    ArtCli => {
      return Caf.importInvoke(
        ["describe", "test", "assert", "parseArgs", "JSON", "selectCommand"],
        [parentImports, ArtCli.Parse],
        (describe, test, assert, parseArgs, JSON, selectCommand) => {
          return describe({
            parseArgs: {
              options: function() {
                return test("empty args", () =>
                  assert.eq(parseArgs([]), { commands: [], options: {} }));
              },
              dataTypes: {
                boolean: function() {
                  test("boolean value", () =>
                    assert.eq(parseArgs(["--verbose"]), {
                      commands: [],
                      options: { verbose: true }
                    }));
                  test('boolean true from "true"', () =>
                    assert.eq(parseArgs(["--verbose", "true"]), {
                      commands: [],
                      options: { verbose: true }
                    }));
                  return test('boolean true from "true"', () =>
                    assert.eq(parseArgs(["--verbose", "false"]), {
                      commands: [],
                      options: { verbose: false }
                    }));
                },
                number: function() {
                  return test("number value", () =>
                    assert.eq(parseArgs(["--num", "123"]), {
                      commands: [],
                      options: { num: 123 }
                    }));
                },
                string: function() {
                  test("simple string", () =>
                    assert.eq(parseArgs(["--foo", "bar"]), {
                      commands: [],
                      options: { foo: "bar" }
                    }));
                  test("string:true", () =>
                    assert.eq(parseArgs(["--foo", "string:true"]), {
                      commands: [],
                      options: { foo: "true" }
                    }));
                  test("string:false", () =>
                    assert.eq(parseArgs(["--foo", "string:false"]), {
                      commands: [],
                      options: { foo: "false" }
                    }));
                  return test("string:10", () =>
                    assert.eq(parseArgs(["--foo", "string:10"]), {
                      commands: [],
                      options: { foo: "10" }
                    }));
                },
                lists: function() {
                  return test("list", () =>
                    assert.eq(parseArgs(["--foo", "bar", "baz"]), {
                      commands: [],
                      options: { foo: ["bar", "baz"] }
                    }));
                },
                json: function() {
                  return test("regexp", () => {
                    let data;
                    data = {
                      alpha: null,
                      beta: true,
                      gamma: ["a", "b", "c"],
                      delta: "foo"
                    };
                    return assert.eq(
                      parseArgs([
                        "--my-json",
                        `json:${Caf.toString(JSON.stringify(data))}`
                      ]).options.myJson,
                      data
                    );
                  });
                },
                js: function() {
                  test("regexp", () =>
                    assert.eq(
                      parseArgs(["--regex", "js:/[a-z]+/"]).options.regex.exec(
                        "123 frank %"
                      ),
                      ["frank"]
                    ));
                  return test("function", () => {
                    let f;
                    f = v => v * 123;
                    return assert.eq(
                      parseArgs(["--f", `js:${Caf.toString(f)}`]).options.f(10),
                      1230
                    );
                  });
                }
              },
              commands: function() {
                test("one command", () =>
                  assert.eq(parseArgs(["myCommand"]), {
                    commands: ["myCommand"],
                    options: {}
                  }));
                return test("multiple command", () =>
                  assert.eq(parseArgs(["myCommand1", "myCommand2"]), {
                    commands: ["myCommand1", "myCommand2"],
                    options: {}
                  }));
              },
              mixed: function() {
                return test("multiple commands and options", () =>
                  assert.eq(
                    parseArgs([
                      "myCommand1",
                      "myCommand2",
                      "--files",
                      "one.json",
                      "two.json",
                      "--output",
                      "out.json"
                    ]),
                    {
                      commands: ["myCommand1", "myCommand2"],
                      options: {
                        files: ["one.json", "two.json"],
                        output: "out.json"
                      }
                    }
                  ));
              }
            },
            selectCommand: {
              defaults: function() {
                test("no commandNames with default", () => {
                  let commandFunctions;
                  return assert.eq(
                    selectCommand(
                      (commandFunctions = { default: "foo", foo: () => {} }),
                      []
                    ),
                    {
                      commandFunction: commandFunctions.foo,
                      commandName: "foo"
                    }
                  );
                });
                return test("one commandNames which isnt a command with default", () => {
                  let commandFunctions;
                  return assert.eq(
                    selectCommand(
                      (commandFunctions = { default: "foo", foo: () => {} }),
                      ["bar"]
                    ),
                    {
                      commandFunction: commandFunctions.foo,
                      commandName: "foo",
                      args: ["bar"]
                    }
                  );
                });
              },
              basics: function() {
                test("foo is a command", () => {
                  let commandFunctions;
                  return assert.eq(
                    selectCommand((commandFunctions = { foo: () => {} }), [
                      "foo"
                    ]),
                    {
                      commandFunction: commandFunctions.foo,
                      commandName: "foo"
                    }
                  );
                });
                test("foo-bar is a command", () => {
                  let commandFunctions;
                  return assert.eq(
                    selectCommand(
                      (commandFunctions = { "foo-bar": () => {} }),
                      ["foo-bar"]
                    ),
                    {
                      commandFunction: commandFunctions["foo-bar"],
                      commandName: "foo-bar"
                    }
                  );
                });
                return test("foo is not a command", () => {
                  let commandFunctions;
                  return assert.eq(
                    selectCommand((commandFunctions = { bar: () => {} }), [
                      "foo"
                    ]),
                    { args: ["foo"] }
                  );
                });
              }
            }
          });
        }
      );
    }
  );
});
