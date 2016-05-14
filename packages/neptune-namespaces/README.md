# Neptune-Namespaces

## What is it?

Given a directory structure with CoffeeScript files, Neptune-Namespaces generates runtime namespaces for your CoffeeScript source-code. It outputs one pair of ``namespace.coffee`` and ``index.coffee`` files per directory.

Neptune-Namespaces is an

* opinionated
* convention-over-configuration
* CommonJS
* directory-structure-based
* namespace-generator
* for CoffeeScript

> Javascript is not currently supported, but it could be. Please request it.

## Purpose

Are you working with dozens or hundreds of CoffeeScript files? Wouldn't you like some way to easily organize them into modules? Are you already organizing your files into directories? If so, aren't you duplicating all the information encoded in your directory structure in your code's `require` statements?

Make your directory structures work for you, and Don't Repeat Yourself!

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

## What does it do?

* **Inputs:** a directory structure with CoffeeScript source files
* **Outputs:** a pair of CommonJS modules for each directory in your source structure
  * `namespace.coffee` - exports the namespace object for that directory
  * `index.coffee` - exports the namespace object *and* loads, via `require`, all nested namespaces and modules.

## Opinionated?
Neptune-Namespaces has an opinion about how you should organize your CoffeeScript files. It is:

* directories are modules
* a directory's name defines the module's name
  * directory names can be: snake_case, lowerCamelCase, UpperCamelCase, dash-case, dotted.case or "space case"
  * the directory's runtime name will be UpperCamelCase
* Subdirectories define subnamespaces
* Loading a directory-module loads everything inside it
* Loading a directory-module's namespace binds it, with its full namespace path, to the global, root namespace: `Neptune`

UNamespace modules consist of two files.
* `directory/index.coffee`
  * automatically requires `./namespace.coffee`
  * automatically requires all CoffeeScript files in that directory
    * each is added to the namespace under the UpperCamelCase version of its filename without extension.
  * automatically requires all sub-directories which are namespace modules
    * each is added to the namespace under the UpperCamelCase version of its directory without extension.
  * See [Convention Over Configuration](#convention-over-configuration) for details on how loading-order is resolved and other useful special cases.
* `directory/namespace.coffee`
  * automatically requires and binds to the parent namespace: `require '../namespace'`
  * this is implicitly recursive to all ancestor namespaces
  * if there is no parent namespace, it binds to the global, runtime namespace: `global.Neptune`

## Convention Over Configuration

NN uses the CoC design pattern. Instead of config files, the names and structure of your directories and source-files solely determines how NN creates `index.coffee` and `namespace.coffee` files.

Below is a description of the convenions. Scroll down further for detailed examples.

### The Conventions

* Basic Loading Order (order of 'require' statements)
  * files are required before directories
  * files and directories are required in alphanumeric order
* Special Directory and File Names
  * Underscore prefixes (names matching: `/^_+/`)
    * All underscores at the beginning of the name are removed after sorting.
    * I.E. The module-name for these files and directories does not included the underscore prefix
    * NOTE: underscores are sorted before (almost) everything else. Adding one or more underscores to a name allows you to force some files or directories to load before others.
  * Single-dash prefixed (names matching: `/^-[^-]/`)
    * required but not added to namespace
    * required before all other files and directories
      * -files are all required first, then -directories
  * Double-dash prefixed (names matching: `/^--/`)
    * not required
    * 100% ignored by neptune-namespaces
* File names which match their parent directory names (after removing any underscore prefixes)
  * are merged into the namespace class via: `namespace.includeInNamespace(...)`
* Directory and files with the same name after stripping any underscore prefixes
  * Only the file is required.

### File Name Conventions Example

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

### Directory Name Conventions Example

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

### Mixed Directory and File Conventions Example

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
      -w, --watch     stay running, watch for changes, and automatically update
      -v, --verbose   enable verbose output
      -r, --root      list one or more --root arguments

Each root directory specified is processed independently and bound to the runtime root namespace: `global.Namespace`.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
