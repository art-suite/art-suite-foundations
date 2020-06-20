"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert", "Promise"],
    [global, require("../ArtChai"), global],
    (test, assert, Promise) => {
      test("assert.within built-in inequality", function() {
        assert.within(5, 0, 10);
        return Promise.all([
          assert.rejects(() => assert.within(-1, 0, 10)),
          assert.rejects(() => assert.within(11, 0, 10))
        ]);
      });
      test("assert.within built-in inequality", function() {
        return assert.within(5, 0, 10);
      });
      return test("assert.within custom inequality", function() {
        let Point, point, p5, p0, p10;
        Point = Caf.defClass(
          class Point extends Object {
            constructor(x, y) {
              super(...arguments);
              this.x = x;
              this.y = y;
            }
          },
          function(Point, classSuper, instanceSuper) {
            this.prototype.lte = function({ x, y }) {
              return this.x <= x && this.y <= y;
            };
            this.prototype.gte = function({ x, y }) {
              return this.x >= x && this.y >= y;
            };
          }
        );
        point = (x, y) => new Point(x, y);
        assert.within(
          (p5 = point(5, 5)),
          (p0 = point(0, 0)),
          (p10 = point(10, 10))
        );
        return Promise.all([
          assert.rejects(() => assert.within(p10, p0, p5)),
          assert.rejects(() => assert.within(p0, p5, p10))
        ]);
      });
    }
  );
});
