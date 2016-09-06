# Neptune-Namespaces

## Purpose: DRY CommonJS Modules

Are you working with dozens or hundreds of CoffeeScript files? Wouldn't you like some way to easily organize them into modules? Are you already organizing your files into directories? If so, aren't you duplicating all the information encoded in your directory structure in your code's `require` statements?

Make your directory structures work for you, and Don't Repeat Yourself!

#### What does NN do? An Example

Suppose you have this directory structure:

```bash
geometry/
  shapes/
  circle.coffee
    square.coffee
  solids/
    cube.coffee
    sphere.coffee
```

The files look something like this:

```coffeescript
# geometry/shapes/circle.coffee
module.exports = class Circle
 ...
```

Then run:

```bash
npm install neptune-namespaces
neptune-namespaces --root geometry
node
> require("coffee-script/register")
> Geometry = require("./geometry")
```

Tada! All your classes are loaded and accessible as:

* Geometry.Shapes.Square
* Geometry.Shapes.Circle
* Geometry.Solids.Cube
* Geometry.Solids.Sphere

## What is it?

Given a directory structure with CoffeeScript files, Neptune-Namespaces generates runtime namespaces for your CoffeeScript source-code. It outputs one pair of ``namespace.coffee`` and ``index.coffee`` files per directory.

Neptune-Namespaces is an

* opinionated
* convention-over-configuration
* CommonJS
* directory-structure-based
* namespace-generator
* for CoffeeScript

> Javascript is not currently supported, but it easily could be. Request it!

#### What does it do?

* **Inputs:** a directory structure with CoffeeScript source files
* **Outputs:** a pair of CommonJS modules for each directory in your source structure
  * `namespace.coffee` - exports the namespace object for that directory
  * `index.coffee` - exports the namespace object *and* loads, via `require`, all nested namespaces and modules.

## Benefits

* Clear, standard way to organize complex source-file structures
* Require one directory and automatically load every source file in its sub-structure
* Automatic runtime namespacing based on directory names.
* Write less code! Most requiring is handled for you.
* Easier Refactoring
  * Adding files/dirs is easier: they are automatically 'required' and available for use.
  * Removing files/dirs is easier: no need to manually remove related 'require' statements
  * Renaming files/dirs is easier: no need to update 'require' statements
  * Moving files/dirs is easier: after all, a move is just a remove + add

## Core Design Goals

* convention-over-configuration (CoC)
* simple, powerful and automatic module namespacing
* treat directories as modules (require a directory, get everything inside)
* reduce source-code size

## Opinionated?
Neptune-Namespaces has an opinion about how you should organize your CoffeeScript files. It is:

* Directories are modules
* Directory and file names define their module names
  * they can be: snake_case, lowerCamelCase, UpperCamelCase, dash-case, dotted.case or "space case"
  * and their module names will be: UpperCamelCase
* Subdirectories define subnamespaces
* requiring a directory requires everything inside it
  * with user-controlled exceptions
* requiring a directory's namespace binds that namespace, with its full namespace path, to the global, root namespace: `global.Neptune`
* all namespaces `extend` the global.Neptune.Base class

Neptune-Namespace modules consist of file pairs:
* `directory/index.coffee`
  * automatically requires `./namespace.coffee`
  * automatically requires all CoffeeScript files in that directory
    * each is added to the namespace under the UpperCamelCase version of its filename without extension.
  * automatically requires all sub-directories which are namespace modules
    * each is added to the namespace under the UpperCamelCase version of its directory without extension.
  * See [Convention Over Configuration](#convention-over-configuration) for details on how loading-order is resolved and other useful special-cases.
* `directory/namespace.coffee`
  * automatically requires and binds to the parent namespace: `require '../namespace'`
  * this is implicitly recursive to all ancestor namespaces
  * if there is no parent namespace, it binds to the global, runtime namespace: `global.Neptune`
    * If a global.Neptune namespace with the same name already exists, this new namespace definition is merged into the existing one.

## Convention Over Configuration

NN uses the CoC design pattern. Instead of config files, the names and structure of your directories and source-files solely determines how NN creates `index.coffee` and `namespace.coffee` files.

Below is a description of the convenions. Scroll down further for detailed examples.

#### The Conventions

* Basic Loading Order
  * files are `required` before directories
  * files and directories are `required` in alphanumeric order
* Directory-name and File-name Prefixes
  * Dash (-): First-loaded Files
    * `required` but not added to namespace
    * `required` before all other files
    * *Use case: Fully control the load-order of your files by making a single-dash-file which, by definition will be loaded first, which in turn includes files in your custom order.*
    * Example: `MyNamespace/-Foo.coffee` will NOT be included in `MyNamespace` at runtime

  * Underscores (_+): First-loaded Modules and Namespaces (after dash-files)
    * The namespace name for these files and directories does not include the underscore prefix(s).
    * *Use case: Adding one or more underscores is a handy way to ensure some files or directories are load before others.*
    * Example: `MyNamespace/_Foo.coffee` will be accessable at runtime as `MyNamespace.Foo`

  * Dot Directories (.): Optional Namespaces
    * not `required` by parent namespace
    * If manually `required`, will link itself into the parent namespace as-if it were a normal, non-dot namespace.
    * *Use case: When you want a sub-part of your library to be optional but you want it in the same namespace if it is `required`.*
    * Example:

    ```
    MyNamespace/.Foo/` won't be included in `MyNamespace` at runtime when you `require '.../MyNamespace'`, but it will be included and accessable as `MyNamespace.Foo` if you also `require '.../MyNamespace/.Foo'`.
    ```

  * Dot Files (.): Ignored
    * not `required` by parent namespace
    * *Use case: These files are completely ignored by NN. Useful if you need to completely escape the NN system.*

* Special File-names (after removing any underscore prefixes)
  * `upperCamelCase(fileName) == upperCamelCase(parentDirectoryName)`
    * instead of the normal way files are *added* to the namespace, this file is *merged* into the namespace class via: `namespace.includeInNamespace(require(fileName))`
    * *Use case: Handy for adding other things to the namespace class.*
    * *Use case: Manually control load order with custom `requires` in this file.*

  * `fileName == siblingSubdirectoryName`
    * In this case the file is `required`, but the directory is not.
    * *Use case: This is primarilly a disambiguation, but it also gives you manual control over loading a sub-directory which may be more clear than prepending the directory with a "--".*

#### File Name Conventions Example

This structure:

```bash
my_module/
  # -- files are ignored
  --ignored.coffee

  # - files are required by not added
  -required_but_not_added.coffee

  # underscore prefixs are stripped for module names
  _require_first.coffee

  # if matches enclosing directory name
  #  - optionally with one or more "_" prefixes
  #  - is required and added via: namespace.includeInNamespace
  my_module.coffee

  # normal filenames
  normal_filename.coffee
```

generates:

```coffeescript
# file: my_module/index.coffee

require './-required_but_not_added'
(module.exports = require './namespace')
.includeInNamespace(require './my_module')
.addModules
  RequireFirst:        require './_require_first'
  NormalFilename:      require './normal_filename'
```

#### Directory Name Conventions Example

* Directory name conventions are almost identical to file-name conventions
* EXCEPT: directories with the same name as the enclosing directory are not handled specially

This structure:

```bash
my_module/
  # -- directories are ignored
  --ignored/

  # - directories are required by not added
  # see: my_module/-required_but_not_added/namespace.coffee
  -required_but_not_added/

  # underscore prefixs are stripped for module names
  # see: my_module/_require_first/namespace.coffee
  _require_first/

  # matches enclosing directory, but it doesn't matter
  my_module/

  # normal name
  normal_name/

```

generates:

```coffeescript
# file: my_module/index.coffee

require './-required_but_not_added'
(module.exports = require './namespace')
require './_require_first'
require './my_module'
require './normal_name'
```

``` coffeescript
# file: my_module/_require_first/namespace.coffee

MyModuleDirectories = require '../namespace'
module.exports = MyModuleDirectories.RequireFirst ||
MyModuleDirectories.addNamespace class RequireFirst extends Neptune.Base
  ;
```

``` coffeescript
# file: my_module/-required_but_not_added/namespace.coffee

module.exports = class RequiredButNotAdded extends Neptune.Base
  ;
```

#### Mixed Directory and File Conventions Example

* In general, directories are required after files. This example shows the fine details on how directories and files are required.
* This example also shows the special case when a directory and file with the same name.

This structure:

```bash
my_module/

  # "-" prefixed files are required first
  # "-" prefixed directories are required second
  -loaded_but_not_added_file
  -loaded_but_not_added_directory

  # When a file and directory have the same name (ignoring any "_" prefixes)
  #  * then only the file is required
  file_and_module_with_same_name/
  file_and_module_with_same_name.coffee

  # normal files are added to the namespace and required second to last
  normal_file

  # normal directories are required last
  normal_directory
```

generates:

```coffeescript
# file: my_module/index.coffee

require './-loaded_but_not_added_file'
require './-loaded_but_not_added_directory'
(module.exports = require './namespace')
.addModules
  FileAndModuleWithSameName: require './file_and_module_with_same_name'
  NormalFile:                require './normal_file'
require './normal_directory'
```

## Installation

    npm install neptune-namespaces

## Usage

    neptune-namespaces [options]

    options:
      -r, --root      list one or more --root arguments
      -w, --watch     stay running, watch for changes, and automatically update
      -v, --verbose   enable verbose output
      -s, --silent    suppress all output
      -f, --force     overwrite all index and namespace files

Each root directory specified is processed independently and bound to the runtime root namespace: `global.Namespace`.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
