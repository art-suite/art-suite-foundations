# @art-suite/global

Ever try to run the same code on NodeJS and in the browser and find it fails in one or the other because the global namespace variable isn't standard? This tiny library fixes that.

After you `require("@art-suite/global")` you'll find the `global` variable is available everywhere as a consistent way to access the global namespace.

Ensures:
- `global === require('@art-suite/global')`
- `global.global === global`
- on browser: `window === global`
- on node: `global === global` (global is already set ;) )
