module.exports = [
  createWithPostCreate: require("./BaseClass").createWithPostCreate

  # all these are DEPRICATED. Leaving them in until we are sure they aren't used anywhere.
  [require("./BaseClass"), "mixInto createAllClass  createHotWithPostCreate"]
]
