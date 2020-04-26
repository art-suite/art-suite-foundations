{compactFlatten, compact, flatten} = require './StandardImport'

suite: ->
  list = # CaffeineScript bug - 'list =' shouldn't be required
    isWebWorker:  false
    isBrowser:    !!global.window
    isNode:       !global.window
  for testName, expected of list
    global.test testName, -> assert.eq expected, Neptune.Art.StandardLib[testName]
