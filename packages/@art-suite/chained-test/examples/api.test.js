let { chainedTest } = require("@art-suite/chained-test");
let { getJson } = require("art-rest-client");
let { assert } = require("@art-suite/assert");

chainedTest("setup", () => {
  return getJson("https://world.openfoodfacts.org/api/v0/product/737628064502.json")
})

  .thenTest("food facts should have a code", (_, foodFacts) => {
    expect(foodFacts.code).toBe("0737628064502");
  })

  .thenTest("food facts should have product details", (_, foodFacts) => {
    assert.selectedEq(
      { unique_scans_n: 1, traces: "en:peanuts" },
      foodFacts.product,
    )
  })
