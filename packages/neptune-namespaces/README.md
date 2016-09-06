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
* `MyDirectory/index.coffee`
  * automatically requires `./namespace.coffee`
  * automatically requires all CoffeeScript files in that directory
    * each is added to the namespace under the UpperCamelCase version of its filename without extension.
  * automatically requires all sub-directories which are namespace modules
    * each is added to the namespace under the UpperCamelCase version of its directory without extension.
  * See [Convention Over Configuration](#convention-over-configuration) for details on how loading-order is resolved and other useful special-cases.
* `MyDirectory/namespace.coffee`
  * Defines the namespace using the directory's name:
  ```coffeescript
  class MyDirectory extends Neptune.Base
  ```
  * if the namespace already exists, reuses the existing one.
  * automatically requires and binds to the parent namespace:
    * `require '../namespace'`
    * if there is no parent namespace, it binds to the global, runtime namespace:
      * `global.Neptune`
    * Note: implicitly requies all ancestor namespaces

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

    ```coffeescript
    # file: root/MyNamespace/-Foo.coffee
    global.Foo = class DashFoo
    ```
    ```coffeescript
    # file: root/someOtherFile.coffee
    MyNamespace = require './MyNamespace'

    # MyNamespace.Foo? == false
    # global.Foo.name == "DashFoo"
    ```
  * Underscores (_+): First-loaded Modules and Namespaces (after dash-files)
    * The namespace name for these files and directories does not include the underscore prefix(s).
    * *Use case: Adding one or more underscores is a handy way to ensure some files or directories are load before others.*
    * Example: `MyNamespace/_Foo.coffee` will be accessable at runtime as `MyNamespace.Foo`

  * Dot Directories (.): Optional Namespaces
    * not `required` by parent namespace
    * If manually `required`, will link itself into the parent namespace as-if it were a normal, non-dot namespace.
    * *Use case: When you want a sub-part of your library to be optional but you want it in the same namespace if it is `required`.*
    * Example:

    ```coffeescript
    # file: root/MyNamespace/.Foo/Bar.coffee
    module.exports = class Bar
    ```
    ```coffeescript
    # file: root/someOtherFile.coffee
    MyNamespace = require './MyNamespace'

    # MyNamespace.Foo? == false

    require './MyNamespace/.Foo'

    # MyNamespace.Foo.Bar? == true
    ```

  * Dot Files (.): Ignored
    * not `required` by parent namespace
    * *Use case: These files are completely ignored by NN. Useful if you need to completely escape the NN system.*
    * Example:

    ```coffeescript
    # file: root/MyNamespace/.Foo.coffee
    module.exports = class DotFoo
    ```

    ```coffeescript
    # file: root/someOtherFile.coffee

    MyNamespace = require './MyNamespace'

    # MyNamespace.Foo? == false

    Foo = require './MyNamespace/.Foo'

    # MyNamespace.Foo? == false
    # Foo.name == "DotFoo"
    ```

* Special File-names (after removing any underscore prefixes)
  * `upperCamelCase(fileName) == upperCamelCase(parentDirectoryName)`
    * instead of the normal way files are *added* to the namespace, this file is *merged* into the namespace class via: `namespace.includeInNamespace(require(fileName))`
    * *Use case: Handy for adding other things to the namespace class.*
    * *Use case: Manually control load order with custom `requires` in this file.*
    ```coffeescript
    # file: root/MyNamespace/my_namespace.coffee
    module.exports = foo: "bar"
    ```
    ```coffeescript
    # file: root/someOtherFile.coffee
    MyNamespace = require './MyNamespace'

    # MyNamespace.foo == "bar"
    # MyNamespace.MyNamespace? == false
    ```

  * `upperCamelCase(fileName) == upperCamelCase(siblingSubdirectoryName)`
    * In this case the file is `required`, but the directory is not.
    * i.e. The file *shadows* the directory.
    * *Use case: A dot-file with the same name as a non-dot-directory effectively makes the directory optioanal without having to make the directory a dot-directory. This allows you to refactor a directory to be optional without breaking any existing requires by renaming the directory.*
    * Example:

    ```coffeescript
    # file: root/MyNamespace/Foo/Bar.coffee
    module.exports = class Bar
    ```
    ```coffeescript
    # file: root/MyNamespace/.Foo.coffee
    module.exports = class DotFoo
    ```
    ```coffeescript
    # file: root/someOtherFile.coffee
    MyNamespace = require './MyNamespace'

    # MyNamespace.Foo? == false

    require './MyNamespace/Foo'

    # MyNamespace.Foo? == true
    # MyNamespace.Foo.Bar? == true

    Foo = require './MyNamespace/.Foo'

    # MyNamespace.Foo != Foo
    # Foo.name == "DotFoo"
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
