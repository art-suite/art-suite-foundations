require("./index")

test("sets global", () => {
  expect(global).toEqual(global.global);
})