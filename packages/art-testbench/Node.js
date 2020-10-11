module.exports =
  require("art-standard-lib")
    .merge(
      require("art-testbench"),
      require("./source/Art.Testbench/_Node")
    );