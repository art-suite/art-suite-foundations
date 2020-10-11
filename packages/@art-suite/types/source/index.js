
/*
Set: global.ArtSuiteTypesMultiContextSupport = true
Before the first time you require this file if you need to be able to test objects
from multiple contexts.

When do you need this?
  - when working with iFrames
  - when working with Node's 'repl' or 'vm'

What is the differences?
  With: slower, but other-wise the same
  Without: plain-arrays and plain-objects from other contexts
    are not detected with isArray, isPlainArray, isPlainObject
*/
require("@art-suite/global")

module.exports = {
  ...require('./BuiltInTypes'),
  ...require('./DuckTypes'),
  ...require('./MiscTypes'),
  ...require('./PrototypeInheritance'),
  ...require('./Json')
}