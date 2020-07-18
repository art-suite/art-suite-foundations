"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "createObjectTreeFactory", "assert"],
    [global, require("./StandardImport")],
    (test, createObjectTreeFactory, assert) => {
      return test("README createObjectTreeFactory example", function() {
        let TreeNode, Node, commonProps;
        TreeNode = Caf.defClass(
          class TreeNode extends Object {
            constructor(props, children) {
              super(...arguments);
              this.props = props;
              this.children = children;
            }
          },
          function(TreeNode, classSuper, instanceSuper) {
            this.prototype.toObjects = function() {
              return {
                TreeNode: {
                  props: this.props,
                  children:
                    this.children &&
                    Caf.array(
                      this.children,
                      child =>
                        (Caf.isF(child.toObjects) && child.toObjects()) || child
                    )
                }
              };
            };
          }
        );
        Node = createObjectTreeFactory(
          (props, children) => new TreeNode(props, children)
        );
        commonProps = { color: "black" };
        return assert.eq(
          Node(
            commonProps,
            { height: "100", width: "200" },
            "Does this work for you?",
            Node(commonProps, { source: "images/piglet.png" }),
            "This works for me!",
            Node("Ka-blam!")
          ).toObjects(),
          {
            TreeNode: {
              props: { color: "black", height: "100", width: "200" },
              children: [
                "Does this work for you?",
                {
                  TreeNode: {
                    props: { color: "black", source: "images/piglet.png" },
                    children: undefined
                  }
                },
                "This works for me!",
                { TreeNode: { props: undefined, children: ["Ka-blam!"] } }
              ]
            }
          }
        );
      });
    }
  );
});
