require('caffeine-script/register');
require("art-testbench")
.initTesting({
  synchronous: true,
  defineTests: () => require("./tests")
})
