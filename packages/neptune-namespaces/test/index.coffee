Chai = require './Chai'
global.assert = Chai.assert
global.Generation = require '../source/Generation'
global.Runtime = require '../source/Runtime'
require './tests'
