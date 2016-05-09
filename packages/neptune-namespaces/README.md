# Neptune-Namespaces

## What is it?

Given a directory structure with CoffeeScript files, Neptune-Namespaces generates namespaces and outputs ``namespace.coffee`` and ``index.coffee`` files.

Neptune-Namespaces is

* an opinionated,
* CommonJS
* namespace generator
* for CoffeeScript
* based on the directory structure

> Javascript is not currently supported, but it could be. Please request it.

## Purpose

* stupid-simple and powerful namespacing
* easy code organization
* easy organization refactoring
* reduced code-size - DRY!

If you are working with dozens or hundreds of Javascript files, wouldn't you like some way to easily organize them into modules? You are probably already organizing your files into directories. If so, you are duplicating all the information encoded in your directory structure in your code's `require` statements. Make your directory structures work for you, and Don't Repeat Yourself!

## Benefits

* Refactoring module structure is as simple as renaming and moving directories and files. Often you won't have to change a line of code.
*

## What does it do?

* **Inputs:** a directory structure with CoffeeScript source files
* **Outputs:** a pair of CommonJS modules for each directory and subdirectory
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

Namespace modules consist of two files.
* `require 'directory'`
  * implicitly requires `directory/namespace`
  * implicitly requires all CoffeeScript module files in that directory
    * each module is added to the namespace under the UpperCamelCase version of its filename without extension.
      * UNLESS the filename starts with an "_" in which case it is 'required', but it is not added to the namespace.
    * required in alphanumeric order
  * implicitly requires all sub-directories which are namespace modules
    * required after CoffeeScript modules
    * required in alphanumeric order
* `require 'directory/namespace'`
  * implicitly requires and binds to the parent namespace: `require '../namespace'`
  * this is implicitly recursive
  * if there is no parent namespace, it binds to the global `Neptune` namespace

## Example

Given this directory structure and files:

    ~username/my_project/src/geometry/solids/cone.coffee
    ~username/my_project/src/geometry/_loader.coffee
    ~username/my_project/src/geometry/box.coffee
    ~username/my_project/src/geometry/circle.coffee

Run Neptune-Namespaces:

    > neptune-namespaces ~username/my_project/src/geometry

Neptune-Namespaces generates:

    geometry/index.coffee
    geometry/namespace.coffee
    geometry/solids/index.coffee
    geometry/solids/namespace.coffee

Load Order:

    geometry/index.coffee
    geometry/namespace.coffee
    geometry/_loader.coffee
    geometry/box.coffee
    geometry/circle.coffee
    geometry/solids/index.coffee
    geometry/solids/namespace.coffee
    geometry/solids/cone.coffee

Runtime example 1:

    Geometry = require 'geometry'
    # Loads in this order:
    #   geometry/index.coffee
    #   geometry/namespace.coffee
    #   geometry/_loader.coffee
    #   geometry/box.coffee
    #   geometry/circle.coffee
    #   geometry/solids/index.coffee
    #   geometry/solids/namespace.coffee
    #   geometry/solids/cone.coffee

    Geometry.Solids.Cone   # == require 'geometry/solids/cone'
    Geometry.Box           # == require 'geometry/box'
    Geometry.Circle        # == require 'geometry/circle'

    Neptune.Geometry       # == Geometry

Runtime example 2:

    Solids = require 'geometry/solids'
    # Loads in this order:
    #   geometry/solids/index.coffee
    #   geometry/solids/namespace.coffee
    #   geometry/namespace.coffee
    #   geometry/solids/cone.coffee

    Solids.Cone                  # == require 'geometry/solids/cone'
    Neptune.Geometry.Solids.Cone # == Solids.Cone

## Filenames starting with '_'

As mentioned above, file names starting an "_" are treated a little specially:

* They are not added to the namespace.
* Since files are loaded in alphanumeric order, files starting with "_" are loaded before (most) other files.

## Installation

    npm install neptune-namespaces

## Usage

    neptune-namespaces [one or more directories]

Each directory specified is processed independently and bound to the root `Neptune` namespace.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
