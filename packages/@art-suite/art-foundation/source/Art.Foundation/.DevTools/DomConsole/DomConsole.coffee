Foundation = require 'art-foundation'
{console} = require './Console'
module.exports = [
  enable: ->
    Foundation.Log.alternativeLogger = console
    @enabled = true
    console.show()

  disable: ->
    @enabled = false
    Foundation.Log.alternativeLogger = null
    console.hide()
    console.reset()

  hide:   -> console.hide()
  show:   -> console.show()
  reset:  -> console.reset()
  increaseWidth: -> console.increaseWidth()
  decreaseWidth: -> console.decreaseWidth()

  foo: -> "foo"
  getShown: -> console?.getShown()

  logCore:  -> console.logCore.call console, arguments...
  logF:     -> console.logF.call console, arguments...
  log:      -> console.log.call console, arguments...
]
