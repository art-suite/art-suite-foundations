module.exports = [
  require './Core'
  [require("./Promise"), "testPromise", "containsPromises", "deepAll"]
  require "./ArrayExtensions"
  require "./AsyncExtensions"
  require "./ObjectExtensions"
  require "./StringExtensions"
  require "./Eq"
  require "./Function"
  require "./ObjectDiff"
  require "./MapExtensions"
  require "./MathExtensions"
  require "./Environment"
  require "./ParseUrl"
  require "./PromisedFileReader"
  require "./Regexp"
  require "./Ruby"
  require "./ShallowClone"
  require "./Time"
  require "./TypesExtended"
  require "./CommonJs"
  require "./Iteration"

  require "./Inspect"
  require "./Clone"
  require "./Log"
  require "./CallStack"

  # SEE: https://www.npmjs.com/package/dateformat
  dateFormat: require "dateformat"
]
