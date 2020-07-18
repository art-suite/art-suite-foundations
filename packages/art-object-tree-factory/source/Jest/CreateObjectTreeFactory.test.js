"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "BaseObject",
      "describe",
      "lowerCamelCase",
      "merge",
      "toInspectedObjects",
      "test",
      "Object",
      "createObjectTreeFactories",
      "assert",
      "createObjectTreeFactory",
      "BaseClass"
    ],
    [global, require("./StandardImport")],
    (
      BaseObject,
      describe,
      lowerCamelCase,
      merge,
      toInspectedObjects,
      test,
      Object,
      createObjectTreeFactories,
      assert,
      createObjectTreeFactory,
      BaseClass
    ) => {
      let testNames, testNamesLowerCamelCased, TestClass;
      testNames = ["Alice", "Bill", "John", "SallyMae"];
      testNamesLowerCamelCased = Caf.array(testNames, name =>
        lowerCamelCase(name)
      );
      TestClass = Caf.defClass(
        class TestClass extends BaseObject {
          constructor(name, props, children) {
            super(...arguments);
            this.name = name;
            this.props = props;
            this.children = children;
          }
        },
        function(TestClass, classSuper, instanceSuper) {
          this.getter({
            inspectedObjects: function() {
              return merge({
                name: this.name,
                props: this.props,
                children: this.children
                  ? toInspectedObjects(this.children)
                  : undefined
              });
            }
          });
        }
      );
      return describe({
        createCorrectFactories: function() {
          test("createObjectTreeFactories testNamesString", () => {
            let keys;
            keys = Object.keys(
              createObjectTreeFactories(testNames.join(" "), () => {})
            );
            return assert.eq(keys, testNames);
          });
          test("createObjectTreeFactories testNames", () => {
            let keys;
            keys = Object.keys(createObjectTreeFactories(testNames, () => {}));
            return assert.eq(keys, testNames);
          });
          test("createObjectTreeFactories testNamesLowerCamelCased", () => {
            let keys;
            keys = Object.keys(
              createObjectTreeFactories(testNamesLowerCamelCased, () => {})
            );
            return assert.eq(keys, testNames);
          });
          return test('createObjectTreeFactories ["Alice", "Bill John", ["SallyMae"]]', () => {
            let keys;
            keys = Object.keys(
              createObjectTreeFactories(
                ["Alice", "Bill John", ["SallyMae"]],
                () => {}
              )
            );
            return assert.eq(keys, testNames);
          });
        },
        fullTests: function() {
          TestClass = Caf.defClass(
            class TestClass extends BaseObject {
              constructor(name, props, children) {
                super(...arguments);
                this.name = name;
                this.props = props;
                this.children = children;
              }
            },
            function(TestClass, classSuper, instanceSuper) {
              this.getter({
                inspectedObjects: function() {
                  return merge({
                    name: this.name,
                    props: this.props,
                    children: this.children && toInspectedObjects(this.children)
                  });
                }
              });
            }
          );
          test("createObjectTreeFactories :Alice", () => {
            let Alice;
            ({ Alice } = createObjectTreeFactories(
              "Alice",
              (nodeName, props, children) =>
                new TestClass(nodeName, props, children)
            ));
            return assert.eq(
              Alice({ myProp: "myPropValue" }, Alice()).inspectedObjects,
              {
                name: "Alice",
                props: { myProp: "myPropValue" },
                children: [{ name: "Alice" }]
              }
            );
          });
          return test("createObjectTreeFactoriesFromFactoryFactories :Alice", () => {
            let Alice;
            ({ Alice } = createObjectTreeFactories(
              "Alice",
              nodeName => (props, children) =>
                new TestClass(nodeName, props, children)
            ));
            return assert.eq(
              Alice({ myProp: "myPropValue" }, Alice()).inspectedObjects,
              {
                name: "Alice",
                props: { myProp: "myPropValue" },
                children: [{ name: "Alice" }]
              }
            );
          });
        },
        more: function() {
          test("function", () => {
            let f;
            f = createObjectTreeFactory((props, children) =>
              merge({ props, children })
            );
            assert.eq(f({ foo: 123 }), { props: { foo: 123 } });
            return assert.eq(f({ foo: 123 }, f({ bar: 456 })), {
              props: { foo: 123, props: { bar: 456 } }
            });
          });
          test("class basic", () => {
            let f, MyTestClass;
            f = createObjectTreeFactory(
              (MyTestClass = Caf.defClass(
                class MyTestClass extends BaseClass {
                  constructor(props, children) {
                    super(...arguments);
                    this.props = props;
                    this.children = children;
                  }
                },
                function(MyTestClass, classSuper, instanceSuper) {
                  this.getter({
                    inspectedObjects: function() {
                      return merge({
                        props: this.props,
                        children: this.children
                          ? toInspectedObjects(this.children)
                          : undefined
                      });
                    }
                  });
                }
              ))
            );
            assert.eq(f.class, MyTestClass);
            assert.eq(f({ foo: 123 }).inspectedObjects, {
              props: { foo: 123 }
            });
            return assert.eq(
              f({ foo: 123 }, f({ bar: 456 })).inspectedObjects,
              { props: { foo: 123 }, children: [{ props: { bar: 456 } }] }
            );
          });
          return test("auto bind class methods to factory", () => {
            let MyTestClass, f;
            MyTestClass = Caf.defClass(
              class MyTestClass extends TestClass {},
              function(MyTestClass, classSuper, instanceSuper) {
                this.myClassFunction = function() {
                  return this.getName();
                };
              }
            );
            f = createObjectTreeFactory({ class: MyTestClass });
            assert.eq(f.class, MyTestClass);
            return assert.eq(f.myClassFunction(), "MyTestClass");
          });
        }
      });
    }
  );
});
