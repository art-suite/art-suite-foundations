require './global'
require './function'
version = (require "../package.json").version

if global.Neptune
  throw new Error "Load NeptuneNamespaces(#{version}) FAILED. Another version already loaded: #{global.Neptune.version}"

module.exports = global.Neptune = class Neptune extends Namespace = require './NamespaceClass'
  Namespace.namespace = Namespace.Neptune = Neptune
  @Namespace:         Namespace
  @PackageNamespace:  require './PackageNamespace'
  @namespacePath:     "Neptune"
  @namespace:         null
  @version:           version

  # DEPRICATED
  @Base: Namespace
  @isNode:            require 'detect-node'
