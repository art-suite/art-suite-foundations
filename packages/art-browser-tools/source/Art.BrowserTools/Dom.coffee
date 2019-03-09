# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input
DomElementFactories = require "./DomElementFactories"

{isString} = require 'art-standard-lib'

module.exports = class Dom
  @createElementFromHtml: (html) ->
    div = document.createElement 'div'
    div.innerHTML = html
    div.firstChild

  @createDomElementFactories: DomElementFactories.createDomElementFactories

  @getDevicePixelRatio: -> (self.devicePixelRatio? && self.devicePixelRatio) || 1
  @zIndex: ( target, setZIndex ) ->
    target = document.getElementById target unless target instanceof HTMLElement
    return target.style.zIndex = setZIndex if setZIndex != undefined

    element = target
    while element && element != document
      # Ignore z-index if position is set to a value where z-index is ignored by the browser
      # This makes behavior of this function consistent across browsers
      # WebKit always returns auto if the element is positioned
      switch element.style.position
        when "absolute", "relative", "fixed"
          # IE returns 0 when zIndex is not specified
          # other browsers return a string
          # we ignore the case of nested elements with an explicit value of 0
          # <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
          value = parseInt element.style.zIndex
          return value if value < 0 || value > 0
      element = element.parentElement

    0

  @domElementOffset: (element) ->
    try
      box = element.getBoundingClientRect()
    catch e
      # if the element has not been added yet, IE11 throws an error
      return top: 0, left: 0

    {body, documentElement} = document

    scrollTop  = window.pageYOffset || documentElement.scrollTop  || body.scrollTop
    scrollLeft = window.pageXOffset || documentElement.scrollLeft || body.scrollLeft

    clientTop  = documentElement.clientTop  || body.clientTop  || 0
    clientLeft = documentElement.clientLeft || body.clientLeft || 0

    top  = box.top  + scrollTop  - clientTop
    left = box.left + scrollLeft - clientLeft

    top:  Math.round top
    left: Math.round left
