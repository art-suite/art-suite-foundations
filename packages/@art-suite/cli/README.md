# Art.Cli

> Initialized by Art.Build.Configurator

### Install

```bash
npm install art-cli
```

### Example

Simple example:
```coffeescript
# CaffeineScript
&@ArtSuite/Cli.start
  commands:
    sing:       ({song}) -> "♫ #{song} ♫!"
```

```javascript
// JavaScript
require("@art-suite/cli").start({
  commands: {
    sing: ({ song }) => `♫ ${song} ♫!`
  })
```

Outputs:
```bash
my-tool sing --song "I'm a lumberjack and I'm okay"
> ♫ I'm a lumberjack and I'm okay ♫!
```

# Parsing

All arguments are parsed using the following rules. This standardizes how the CLI is parsed in a powerful way. It allows you to pass structured data and custom javascript into your code from the CLI.

## Commands, Args and Options
```bash
myCli myCommand myArg --foo[] foo1 foo2 --bam boom myOtherArg
# command: "myCommand", options: {foo: ["foo1", "foo2"], bam: "boom"}, args: ["myArg", "myOtherArg"]

myCli myCommand myArg --foo=foo1 myOtherArg --bam
# command: "myCommand", options: {foo: "foo1", bam: true}, args: ["myArg", "myOtherArg"]
```

## Values
```bash
# parse json from the command-line
myCli myCommand --myObj 'json:{"hi":123}'
# command: "myCommand", options: myObj: {hi: 123}

# parses javascript from the command-line for easy custom-function injection
myCli myCommand --myFunc "js:(v) => v + 1"
# command: "myCommand", options: myFunc: (v) => v + 1

# but wait, I want a string that starts out "js:..." - we've got you:
myCli myCommand --myFunc "string:js:foo"
# command: "myCommand", options: myFunc: "js:foo"

# all these work with args too
myCli myCommand "js:(v) => v + 1"
# command: "myCommand", args: [{myFunc: (v) => v + 1}]
```
