let mockFs = require("./index.js");
let fs = require('fs');
let { assert } = require('art-testbench');

let initFs = {
  'README.md': "# My Markdown",
  'empty-dir': {} // empty directory
};

test("getTree returns deep-eq as initialized", () => {
  try {
    mockFs(initFs);
    assert.eq(mockFs.getTree(), initFs)
  } finally {
    mockFs.restore();
  }
})

test("getTree returns current tree", () => {
  try {
    mockFs(initFs);
    fs.writeFileSync("fun", "franky");
  } finally {
    mockFs.restore();
  }
})
