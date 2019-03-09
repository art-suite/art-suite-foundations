# https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input

StandardLib = require 'art-standard-lib'
ClassSystem = require 'art-class-system'

{log, isString, isPlainArray, isPlainObject} = StandardLib
{BaseObject} = ClassSystem

setCookie = (cookieName, cookieValue, {expires, path}) ->

  unless isString cookieValue
    throw new Error "cookieValue must be a string, array or object" unless isPlainArray(cookieValue) || isPlainObject(cookieValue)
    cookieValue = JSON.stringify cookieValue

  cookieString = "#{cookieName}=#{cookieValue}"

  if expires
    d = new Date()
    d.setTime d.getTime() + expires * 24 * 60 * 60 * 1000
    cookieString += "; expires=#{d.toUTCString()}"

  if path
    cookieString += "; path=#{path}"

  document.cookie = cookieString

getCookie = (cookieName) ->
  name = cookieName + "="
  ca = document.cookie.split ';'
  for c in ca
    c = c.substring 1 while ' ' == c.charAt 0
    if 0 == c.indexOf name
      value = c.substring name.length, c.length
      if value.match /^[{[]/
        value = JSON.parse value
      return value
  ""

module.exports = class Cookie extends BaseObject
  @set: (name, value, options) -> setCookie name, value, options
  @get: (name)                 -> getCookie name
  @remove: (name, options)     -> setCookie name, path:options.path, expires: -1
  # @classGetter
  #   all: -> $.cookie()
  #   json: -> $.cookie.json
  #   raw: -> $.cookie.raw

  # @classSetter
  #   json: (v)-> $.cookie.json = v
  #   raw: (v)-> $.cookie.raw = v
