"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseObject",
      "describe",
      "lowerCamelCase",
      "merge",
      "toPlainObjects",
      "createObjectTreeFactories",
      "test",
      "assert",
      "isPlainObject",
      "mergeInto",
      "isString",
    ],
    [global, require("./StandardImport")],
    (
      BaseObject,
      describe,
      lowerCamelCase,
      merge,
      toPlainObjects,
      createObjectTreeFactories,
      test,
      assert,
      isPlainObject,
      mergeInto,
      isString
    ) => {
      let testNames, testNamesLowerCamelCased, MyObject;
      testNames = ["Alice", "Bill", "John", "SallyMae"];
      testNamesLowerCamelCased = Caf.array(testNames, (name) =>
        lowerCamelCase(name)
      );
      MyObject = Caf.defClass(
        class MyObject extends BaseObject {
          constructor(name, props, children) {
            super(...arguments);
            this.name = name;
            this.props = props;
            this.children = children;
          }
        },
        function (MyObject, classSuper, instanceSuper) {
          this.getter({
            plainObjects: function () {
              return merge({
                name: this.name,
                props: this.props,
                children: this.children
                  ? Caf.array(this.children, (child) => toPlainObjects(child))
                  : undefined,
              });
            },
          });
        }
      );
      return describe({
        basics: function () {
          let Alice, Bill, John, SallyMae;
          ({ Alice, Bill, John, SallyMae } = createObjectTreeFactories(
            testNamesLowerCamelCased,
            (name, props, children) => new MyObject(name, props, children)
          ));
          test("Alice()", () =>
            assert.eq(Alice().plainObjects, { name: "alice" }));
          test("Alice age:12", () =>
            assert.eq(Alice({ age: 12 }).plainObjects, {
              name: "alice",
              props: { age: 12 },
            }));
          test("Alice (age: 25), (name: :alice)", () =>
            assert.eq(Alice({ age: 25 }, { name: "alice" }).plainObjects, {
              name: "alice",
              props: { age: 25, name: "alice" },
            }));
          test("Alice (age: 12), Bill(), gender: :female", () =>
            assert.eq(
              Alice({ age: 12 }, Bill(), { gender: "female" }).plainObjects,
              {
                name: "alice",
                props: { age: 12, gender: "female" },
                children: [{ name: "bill" }],
              }
            ));
          test("Alice Bill()", () =>
            assert.eq(Alice(Bill()).plainObjects, {
              name: "alice",
              children: [{ name: "bill" }],
            }));
          return test("Alice Bill(), SallyMae()", () =>
            assert.eq(Alice(Bill(), SallyMae()).plainObjects, {
              name: "alice",
              children: [{ name: "bill" }, { name: "sallyMae" }],
            }));
        },
        incompleteParts: function () {
          let Alice, Bill, John, SallyMae;
          ({
            Alice,
            Bill,
            John,
            SallyMae,
          } = createObjectTreeFactories(
            testNamesLowerCamelCased,
            (name, props, children) => merge({ props, children })
          ));
          test("Alice()", () => assert.eq(Alice(), {}));
          test("Alice false", () => assert.eq(Alice(false), {}));
          test("Alice {}", () => assert.eq(Alice({}), { props: {} }));
          test("Alice []", () => assert.eq(Alice([]), {}));
          test("Alice [{}]", () => assert.eq(Alice([{}]), { props: {} }));
          test("Alice '' 0 true", () =>
            assert.eq(Alice("", 0, true), { children: ["", 0, true] }));
          return test("Alice [null, undefined, false, [], [false, [undefined, null]]]", () =>
            assert.eq(
              Alice(null, undefined, false, [], [false, [undefined, null]]),
              {}
            ));
        },
        customMergeAndPreprocess: {
          baseline: function () {
            let Alice, Bill, John, SallyMae;
            ({ Alice, Bill, John, SallyMae } = createObjectTreeFactories(
              testNamesLowerCamelCased,
              (name, props, children) => new MyObject(name, props, children)
            ));
            test("Alice info:{a:123}, Bill(), info:{b:456}", () => {
              let tree;
              return (tree = assert.eq(
                Alice({ info: { a: 123 } }, Bill(), { info: { b: 456 } })
                  .plainObjects,
                {
                  name: "alice",
                  props: { info: { b: 456 } },
                  children: [{ name: "bill" }],
                }
              ));
            });
            return test("Alice (info: a: 123), 'hi'", () =>
              assert.eq(Alice({ info: { a: 123 } }, "hi").plainObjects, {
                name: "alice",
                props: { info: { a: 123 } },
                children: ["hi"],
              }));
          },
          customMergePropsInto: function () {
            let Alice, Bill, John, SallyMae;
            ({ Alice, Bill, John, SallyMae } = createObjectTreeFactories(
              {
                mergePropsInto: (_into, source) =>
                  Caf.array(
                    source,
                    (v, k) =>
                      (_into[k] = isPlainObject(v) ? mergeInto(_into[k], v) : v)
                  ),
              },
              testNamesLowerCamelCased,
              (name, props, children) => new MyObject(name, props, children)
            ));
            return test("Alice info:{a:123}, Bill(), info:{b:456}", () => {
              let tree;
              return (tree = assert.eq(
                Alice({ info: { a: 123 } }, Bill(), { info: { b: 456 } })
                  .plainObjects,
                {
                  name: "alice",
                  props: { info: { a: 123, b: 456 } },
                  children: [{ name: "bill" }],
                }
              ));
            });
          },
          customPreprocessElement: function () {
            let Alice, Bill, John, SallyMae;
            ({ Alice, Bill, John, SallyMae } = createObjectTreeFactories(
              {
                preprocessElement: (element) =>
                  isString(element) ? { text: element } : element,
              },
              testNamesLowerCamelCased,
              (name, props, children) => new MyObject(name, props, children)
            ));
            return test("Alice (info: a: 123), 'hi'", () =>
              assert.eq(Alice({ info: { a: 123 } }, "hi").plainObjects, {
                name: "alice",
                props: { info: { a: 123 }, text: "hi" },
              }));
          },
        },
      });
    }
  );
});
