{
  generatedByString
  neptuneBaseClass
  requirePath
} = require '../Helper'
{peek} = require '../MiniFoundation'

{isPathedNamespace} = Neptune

module.exports = class NamespaceGenerator
  @generate: (namespace, relativeFilePath) ->
    {parent, path, namespaceName, isPathNamespace} = namespace
    className = if isPathedNamespace namespaceName
      peek namespaceName.split '.'
    else
      namespaceName

    parentNamespaceName = parent.namespaceName
    parentNamespacePath = if parent.parent
      "../namespace"
    else
      parent.path

    requireParent = "(require '#{parentNamespacePath}')"

    meat = if isPathNamespace
      "#{requireParent}.vivifiySubnamespace '#{namespaceName}'"
    else
      """
      #{requireParent}.addNamespace('#{namespaceName}', class #{className} extends #{neptuneBaseClass})
      """

    """
    #{generatedByString}
    # file: #{relativeFilePath || path}/namespace.coffee

    module.exports = #{meat}
    #{
      a = for name in namespace.getAllNamespacedSubdirRequires()
        "require './#{name}/namespace'"
      a.join ";\n"
    }
    """
