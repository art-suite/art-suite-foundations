module.exports = [
  createWithPostCreate: require("./BaseObject").createWithPostCreate

  # all these are DEPRICATED. Leaving them in until we are sure they aren't used anywhere.
  [require("./BaseObject"), "mixInto createAllClass  createHotWithPostCreate"]
]
