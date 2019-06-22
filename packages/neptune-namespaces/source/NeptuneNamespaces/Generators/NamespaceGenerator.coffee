{
  generatedByString
  neptuneBaseClass
  PackageNamespaceClassName
  requirePath
} = require '../Helper'
{peek} = require '../MiniFoundation'

{isPathedNamespace} = Neptune

module.exports = class NamespaceGenerator
  @generate: (namespace, relativeFilePath, versionFile) ->
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
      "#{requireParent}.vivifySubnamespace '#{namespaceName}'"
    else if versionFile && namespace.getIsRootPackageNamespace()
      """
      #{requireParent}.addNamespace '#{namespaceName}', class #{className} extends #{PackageNamespaceClassName}
        @version: require('#{versionFile}').version
      """
    else
      """
      #{requireParent}.addNamespace('#{namespaceName}', class #{className} extends #{PackageNamespaceClassName})
      """

    """
    module.exports = #{meat}
    #{
      a = for name in namespace.getAllNamespacedSubdirRequires()
        "require './#{name}/namespace'"
      a.join ";\n"
    }
    """
