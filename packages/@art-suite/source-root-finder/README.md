# ArtSuite.SourceRootFinder

* Purpose: given a path to a directory or file, find the root directory of that containing project.
* Strategy: look in the specified directory and each parent directory for files matching the names of one of the indicatory files/directories (default: `package.json` and `.git`)

### Install

```coffeescript
npm install @art-suite/source-root-finder
```

### Usage
```coffeescript
{SourceRootFinder, findSourceRoot, findSourceRootSync} = require "@art-suite/source-root-finder"

# find with max async to not tie up the process; returns a Promise
findSourceRoot "./"
# .then (result) -> result === "~/myProject"

# just give me the results right now! - returns the string
findSourceRootSync "./"
# === "~/myProject"

# custom source-root-finder
myRubySourceRootFinder = indicatorFiles: ["Rakefile", ".gemspec"]
myRubySourceRootFinder.findSourceRootSync "~/dev/myRubyProject/src/deep/in/a/ruby/project"
# === "~/dev/myRubyProject"
```