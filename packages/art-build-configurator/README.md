# art-build-configurator (abc) [![Build Status](https://travis-ci.org/imikimi/art-build-configurator.svg?branch=master)](https://travis-ci.org/imikimi/art-build-configurator)
Tools for configuring npm (package.json) and webpack (webpack.config.js)

### Initializing a new Art Suite App

```bash
# NOTE: Your directory-name is used to initialize 
# various files including package.json, so pick a good name.
# Make a directory with your app name; cd into it
mkdir my-app-name
cd my-app-name

# install and run ABC
echo "{}" > package.json   # force npm to install in this folder
npm install art-build-configurator
./node_modules/.bin/abc --init --app

# do clean install of all packages
# (now that ABC set up the correct dependencies)
rm package-lock.json       # force clean install
npm install

# start your app!
npm start
``` 

Then go to:
http://localhost:8080/webpack-dev-server/

#### Create Git Repository (highly recommended):

After you have your app initialized, create a git repository so you have a working state to roll back to as you work:

```bash
git init
git add * ".[a-zA-Z]*"
git commit -a -m 'initial checkin'
```

### Configuring `package.json`

The original motivation for ABC is the problem that `package.json` is not code. There is no way to dynamically configure it with plain npm + node. ABC solves that. ABC's config file `art.build.config.{caf/coffee/js}` is *evaluated* before it is applied. You can execute arbitrary code to generate and return the config object.

The output package.json file is generated as follows:

1. Extract the current *version* from the current package.json. This is the only thing that is persisted. Everything else is replaced.
2. `defaultPackage = ABC's default package.json`
3. One of two things can happen depending upon the type of `package = ArtBuildConfig.npm || ArtBuildConfig.package` (two aliases):
	* package is an object: merged it: `deepMerge defaultPackage, package`
	* package is a function: invoke it: `package(defaultPackage)` 
4. Set version to the version read in step 1
5. Write the resulting package.json

