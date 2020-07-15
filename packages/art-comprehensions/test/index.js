require('caffeine-script/register');
require("art-testbench/Node")
.initTesting({
  synchronous: true,
  defineTests: () => require("./tests")
})
