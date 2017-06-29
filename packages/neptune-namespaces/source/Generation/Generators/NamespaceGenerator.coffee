{
  generatedByString
  neptuneBaseClass
  requirePath
} = require '../Helper'
{peek} = require '../MiniFoundation'

{isPathedNamespace} = Neptune

module.exports = class NamespaceGenerator
  @generate: (namespace, relativeFilePath) ->
    {parent, path, namespaceName} = namespace
    className = if isPathedNamespace namespaceName
      peek namespaceName.split '.'
    else
      namespaceName

    parentNamespaceName = parent.namespaceName
    parentNamespacePath = if parent.parent
      "../namespace"
    else
      parent.path

    """
    #{generatedByString}
    # file: #{relativeFilePath || path}/namespace.coffee

    #{parentNamespaceName} = require '#{parentNamespacePath}'
    module.exports = #{parentNamespaceName}.#{namespaceName} ||
    #{parentNamespaceName}.addNamespace '#{namespaceName}', class #{className} extends #{neptuneBaseClass}
      ;
    #{
      a = for name in namespace.getAllNamespacedSubdirRequires()
        "require './#{name}/namespace'"
      a.join ";\n"
    }
    """
