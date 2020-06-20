"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    ["test", "assert", "Promise"],
    [global, require("../ArtChai"), global],
    (test, assert, Promise) => {
      test("assert.match", function() {
        assert.match("hi frank", /fr/);
        return assert.rejects(() => assert.match("hi frank", /fri/));
      });
      test("assert.notMatch", function() {
        assert.notMatch("hi frank", /fri/);
        return assert.rejects(() => assert.notMatch("hi frank", /fr/));
      });
      test("assert.same", function() {
        let a;
        assert.same(0, 0);
        a = {};
        assert.same(a, a);
        return assert.rejects(() => {
          assert.same(0, 1);
          return assert.same(a, {});
        });
      });
      test("assert.notSame", function() {
        let a;
        assert.notSame(0, 1);
        a = {};
        assert.notSame(a, {});
        return assert.rejects(() => {
          assert.notSame(0, 0);
          return assert.notSame(a, a);
        });
      });
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
