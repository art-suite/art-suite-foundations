module.exports =
  chainedTest:  require('./ChainedTest').chainedTest
  assert:       require('./ArtChai').assert
  test:         (args...) -> global.test args...
  setup:        (args...) -> global.setup args...

  initTesting: (options) -> require('./Mocha').init options