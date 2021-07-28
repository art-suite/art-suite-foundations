module.exports =
  require("art-standard-lib")
    .merge(
      require("art-testbench"),
      require("./build/Art.Testbench/_Node")
    );