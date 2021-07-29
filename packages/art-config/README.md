# art-config [![Build Status](https://travis-ci.org/imikimi/art-config.svg?branch=master)](https://travis-ci.org/imikimi/art-config)
A powerful yet simple tool for configuring all your libraries consistently.

# Install

```shell
npm install art-config
```

# Usage

### Concepts

ArtConfig is a hierarchical configuration system. It provides a universal way to configure all libraries and applications in one hierarchical namespace. ArtConfig standardizes how configuration values are collected, normalized and registered with each registered Configurable.
#### Concept: The ArtConfig Tree

All config managed by ArtConfig is represented in a hierarchy of plain javascript objects. You can access this entire tree by calling: `&ArtConfig.getArtConfig()`

The paths in this hierarchy are defined by the Neptune Namespaces in which each Configurable is declared.

Example:

```coffeescript
import &ArtConfig
# This configurable
# source/Any/Path/You/Want/Config.caf
class Config extends Configurable
  @defaults
    foo: :bar

# is accessible at this path:
getArtConfig().Any.Path.You.Want

# Therefor the following asserts will pass:
# (assuming there is only the one Configurable registered)
# (assert.eq is from ArtTestbench and uses deep-equality)
assert.eq
  getArtConfig().Any.Path.You.Want.foo
  :bar

assert.eq
  getArtConfig()
  Any: Path: You: Want: foo: :bar
```



#### Concept: Configurable (class to inherit from)

Declare slices of the artConfig tree to be configured. Each Configurable can have default values and post-configure hooks.

```coffeescript
# source/MyApp/Config.caf
import &ArtConfig
class Config extends Configurable
  @defaults
    serverUrl:  "https://abc.def"
    apiKey:     null
    apiSecret:  null

  @on configured: ({serverUrl}) ->
    openConnection serverUrl
```

You can access the config values from elsewhere:

```coffeescript
# AnotherFile.caf
import &Config

logInfo = -> console.log config.serverUrl
```

> Note: Configurables depend on NeptuneNamespaces to define their configuration-path. The configuration-path is set to the namespaces hierarchy in which your configurable class is declared. You can call `YourConfig.getConfigurationPath()` to determine what your config's path is.

#### Concept: Configuration (class to inherit from)

Configurations are automatically registered. They are selected at configure time via the `artConfigName` value. There can only be one Configuration for each artConfigName value (e.g. Production, Development, Test, etc...).

```coffeescript
class Development extends &ArtConfig.Configuration
  MyApp: # Note, this is the configurable's Configuration-Path, see above
    serverUrl: "http://localhost:3000"
```

#### Concept: `configure` during App Initialization

When your application actually starts, you need to run configure to gather up all the configuration data and route them to the correct Configurables.

```coffeescript
&ArtConfig.configure()
```
### Loading Configuration

When using ArtConfig, you need to call `configure` at some point during your application initialization sequence. This will collect configuration from all the configuration sources (e.g. the environment, the global, the URL params, and any config you pass in explicitly). Configure also selects which config to use.

```coffeescript
# most the time you only need this:
&ArtConfig.configure()

# but sometimes you might want to provide some options (e.g. for various Tests)
&ArtConfig.configure
  artConfigName: :Test
  artConfig: MyApp: serverUrl: "test.bad.url"
```

#### Inputs

The input is a single, options object with these optional fields:

- `artConfigName: string`

  can be passed in:
    as an argument`
    via process.env
    via the browser query string

  default: "Development"

  EFFECT:
    ArtConfig.artConfigName =
      externalEnvironment.artConfigName ||
      artConfigName

- `artConfig: JSON string OR plain object structure`

  can be passed in:
    as an argument
    via process.env
    via the browser query string

  default: {}

  EFFECT:
    mergeInto ArtConfig.artConfig, deepMerge
      ConfigRegistry.configs[artConfigName]
      global.artConfig
      artConfig
      externalEnvironment.artConfig

- `onConfig: (artConfig) ->`

  gets called as soon as artConfig completes with the final artConfig


### Effects
```
callback @artConfig for callback in ConfigRegistry.configurables
```


### EXAMPLES:
```coffeescript
import &ArtConfig

# default artConfigName is Development
&ArtConfig.configure
  artConfig: {}

&ArtConfig.configure
  artConfigName:  :Production
  artConfig:      verbose: true

&ArtConfig.configure
  artConfigName:  :Test
  artConfig:      {}
```

# Config Sources

Actual Config data can come from several different places:

1. **Environment:**
    - NodeJS: system environment
    - Browser: query params
1. **Options:** options passed directly into the configure function
1. **Configurations:** Production, Development, Test or other configuration classes declared in your application.
1. **Global:** global runtime environment (`window` / `self` / `global`)
1. **Configurable defaults:** Configurables have default values

### Definition of Terms

- `environment`:
  - NodeJS: `process.env`
  - Browser: `location.search`, parsed (the current URL's query params)
- `options`: the object passed in. e.g. `ArtConfig.configure(options)`
- `global`:
  - NodeJS: `global`
  - Browser: `window`
### How `artConfigName` is Selected

The first non-empty string is used from:
1. `environment.artConfigName`
1. `options.artConfigName`
1. `global.artConfigName`

> Note: `artConfigName` are noramlized using `ArtStandardLib.upperCamelCase` (e.g. `Production` and `production` are the same). Shortcuts `prod` and `dev` are allowed and are automatically rewritten to `production` and `development`.

### How `artConfig` is Generated

Generating `ArtConfig.artConfig` is the essential purpose of ArtConfig. It is a namespaced hierarchy of arbitrary config values. This hierarchy is simply a deep merging of config values from the following sources. This list is in priority order. Higher priority values override lower priority ones (#1 is the highest priority):

ArtConfig Priority:
1. `environment.artConfig` (JSON encoded string)
1. `options.artConfig` (plain object data structure)
1. `global.artConfig` (plain object data structure)
1. Configuration (selected from the registered Configurations using artConfigName's value: Production, Development, Test, etc...)
1. Configurable defaults
