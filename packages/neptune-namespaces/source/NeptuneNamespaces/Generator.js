"use strict";
let Caf = require("caffeine-script-runtime");
Caf.defMod(module, () => {
  return Caf.importInvoke(
    [
      "getPackageRoot",
      "Path",
      "console",
      "upperCamelCase",
      "fsp",
      "glob",
      "promiseSequence",
      "merge",
      "log",
      "Object",
      "normalizeDirectory",
      "IndexJsGenerator",
      "NamespaceJsGenerator",
      "NamespaceStructure",
      "Promise",
      "getRelativePath",
      "process",
      "indent",
      "generatedByStringBare",
      "String",
      "Error",
      "getParentPath"
    ],
    [
      global,
      require("./StandardImport"),
      require("./Generators"),
      require("./PackageRoot"),
      { NamespaceStructure: require("./NamespaceStructure") }
    ],
    (
      getPackageRoot,
      Path,
      console,
      upperCamelCase,
      fsp,
      glob,
      promiseSequence,
      merge,
      log,
      Object,
      normalizeDirectory,
      IndexJsGenerator,
      NamespaceJsGenerator,
      NamespaceStructure,
      Promise,
      getRelativePath,
      process,
      indent,
      generatedByStringBare,
      String,
      Error,
      getParentPath
    ) => {
      let Generator;
      return (Generator = Caf.defClass(
        class Generator extends Object {
          constructor(root, options) {
            super(...arguments);
            this.root = root;
            if (!Caf.is(this.root, String)) {
              throw new Error("root required");
            }
            if (options) {
              Caf.each2(
                ["pretend", "verbose", "lastGenerator", "force", "quiet"],
                option => (this[option] = options[option])
              );
            }
            this.versionFile = this.constructor.findVersionFile(this.root);
            this.rootPrefix = getParentPath(this.root);
          }
        },
        function(Generator, classSuper, instanceSuper) {
          this.standardRoots = ["source", "test", "performance", "src", "perf"];
          this.generatedFilenameRegexp = /(^|\/)(namespace|index)\.(coffee|js)$/;
          this.extensions = ["js", "coffee", "caffeine", "caf"];
          this.findVersionFile = function(path) {
            let packageRoot;
            return (packageRoot = getPackageRoot(path))
              ? Path.join(packageRoot, "package.json")
              : undefined;
          };
          this.infoLog = function(root, ...args) {
            root = Path.basename(root);
            args = args.join();
            args = args.split("\n");
            return Caf.each2(args, arg =>
              console.log(
                arg === ""
                  ? ""
                  : `Neptune.${Caf.toString(upperCamelCase(root))}: `.grey + arg
              )
            );
          };
          this.watch = function(root, options = {}) {
            let generator;
            this.infoLog(root, "watching...".green);
            generator = null;
            return fsp.watch(
              root,
              { persistent: options.persistent, recursive: true },
              (event, filename) =>
                event !== "change" &&
                !filename.match(this.generatedFilenameRegexp)
                  ? (this.infoLog(
                      root,
                      `watch event: ".bold.yellow + "${Caf.toString(
                        event
                      )} ${Caf.toString(filename.yellow)}`
                    ),
                    generator ? (options.lastGenerator = generator) : undefined,
                    (generator = new Generator(root, options)),
                    generator.generate())
                  : undefined
            );
          };
          this.generate = function(globRoot, options = {}) {
            let Klass;
            Klass = this;
            return glob(globRoot).then(roots =>
              promiseSequence(
                Caf.array(
                  roots,
                  root => () => {
                    let generator;
                    generator = new Klass(root, options);
                    return generator
                      .generate()
                      .then(() =>
                        options.watch
                          ? Generator.watch(
                              root,
                              merge(options, { lastGenerator: generator })
                            )
                          : undefined
                      )
                      .catch(error => log(error.stack));
                  },
                  root => fsp.statSync(root).isDirectory()
                )
              )
            );
          };
          this.prototype.infoLog = function(...args) {
            return !this.quiet
              ? this.constructor.infoLog(this._getRelativePath(), args.join())
              : undefined;
          };
          this.prototype.verboseLog = function(...args) {
            return this.verbose ? this.infoLog(...args) : undefined;
          };
          this.prototype.warningLog = function(...args) {
            return this.verbose ? this.infoLog(...args) : undefined;
          };
          this.prototype.generate = function() {
            let extensions;
            extensions = this.constructor.extensions;
            this.verboseLog(
              `\nscanning root: ${Caf.toString(this.root.yellow)}`
            );
            return glob(
              `${Caf.toString(this.root)}/**/*.{${Caf.toString(
                extensions.join(",")
              )}}`,
              { dot: true }
            ).then(files =>
              files.length === 0
                ? this.warningLog(
                    `no .${Caf.toString(extensions.join(", ."))} files found`
                  )
                : this.generateFromFiles(files)
            );
          };
          this.prototype.showNamespaceStructure = function(namespaces) {
            this.infoLog("generating namespace structure:");
            this.infoLog("  Neptune".yellow);
            return Caf.each2(Object.keys(namespaces).sort(), namespacePath => {
              this.infoLog(`  ${Caf.toString(namespacePath)}`.yellow);
              return Caf.each2(
                namespaces[namespacePath].getModuleNames(),
                moduleName =>
                  this.infoLog(`    ${Caf.toString(moduleName)}`.grey)
              );
            });
          };
          this.prototype.generateFiles = function(namespaces) {
            this.generatedFiles = {};
            return Caf.each2(namespaces, (namespace, namespacePath) => {
              let path, relativePath, relativeVersionFile;
              ({ path } = namespace);
              relativePath = this._getRelativePath(path);
              if (this.versionFile) {
                relativeVersionFile = Path.relative(
                  normalizeDirectory(path),
                  this.versionFile
                );
              }
              this._generateHelper({
                relativePath,
                path,
                name: "namespace",
                code: this.getNamespaceGenerator().generate(
                  namespace,
                  relativeVersionFile
                )
              });
              return this._generateHelper({
                relativePath,
                path,
                name: "index",
                code: this.getIndexGenerator().generate(namespace)
              });
            });
          };
          this.prototype.getIndexGenerator = function() {
            return IndexJsGenerator;
          };
          this.prototype.getNamespaceGenerator = function() {
            return NamespaceJsGenerator;
          };
          this.prototype.generateFromFiles = function(files) {
            let namespaces;
            this._cleanup(files);
            ({ namespaces } = new NamespaceStructure({
              root: this.root,
              files
            }));
            if (this.verbose) {
              this.showNamespaceStructure(namespaces);
            }
            this.generateFiles(namespaces);
            return this.pretend
              ? Promise.resolve({
                  generatedFiles: this.generatedFiles,
                  namespaces
                })
              : this._writeFiles();
          };
          this.prototype._cleanup = function(files) {
            let regex;
            regex = /($|\/)(index|namespace).coffee$/;
            return Caf.each2(
              files,
              file => {
                let contents;
                contents = fsp.readFileSync(file).toString();
                return /generated by neptune namespaces/i.test(contents)
                  ? (log(`rm ${Caf.toString(file)}`), fsp.unlinkSync(file))
                  : undefined;
              },
              file => regex.test(file)
            );
          };
          this.prototype._writeFiles = function() {
            let filesWritten, filesTotal;
            filesWritten = 0;
            filesTotal = 0;
            return Promise.all(
              Caf.array(this.generatedFiles, (code, name) => {
                let logFileString, base;
                filesTotal++;
                logFileString = this._getLogFileString(name);
                return (Caf.exists((base = this.lastGenerator)) &&
                  base.generatedFiles[name]) === code
                  ? this.verbose
                    ? this.infoLog(
                        `no change: ${Caf.toString(logFileString)}`.grey
                      )
                    : undefined
                  : Promise.resolve(
                      fsp.existsSync(name)
                        ? fsp.readFile(name, "utf8")
                        : undefined
                    )
                      .then(currentContents =>
                        this.force || currentContents !== code
                          ? (filesWritten++,
                            this.infoLog(
                              `writing: ${Caf.toString(logFileString.yellow)}`
                            ),
                            fsp.writeFile(name, code))
                          : undefined
                      )
                      .catch(error =>
                        this.infoLog(
                          `error reading ${Caf.toString(logFileString)}`.red,
                          error
                        )
                      );
              })
            ).then(() => {
              if (filesWritten < filesTotal) {
                this.infoLog(
                  `${Caf.toString(filesTotal - filesWritten)}/${Caf.toString(
                    filesTotal
                  )} files current`
                );
              }
              return filesWritten > 0
                ? this.infoLog(
                    `${Caf.toString(filesWritten)}/${Caf.toString(
                      filesTotal
                    )} files ${Caf.toString(
                      this.lastGenerator ? "changed" : "written"
                    )}`
                  )
                : undefined;
            });
          };
          this.prototype._getRelativePath = function(path = this.root) {
            return getRelativePath(this.rootPrefix, path);
          };
          this.prototype._getLogFileString = function(file) {
            return getRelativePath(process.cwd(), file);
          };
          this.prototype._generateHelper = function({
            path,
            relativePath,
            name,
            code
          }) {
            let commentStart;
            name += ".js";
            if (this.pretend) {
              this.infoLog(
                `\ngenerated: ${Caf.toString(
                  this._getLogFileString(name).yellow
                )}`
              );
              this.infoLog(indent(code.green));
            }
            commentStart = "//";
            code = `${Caf.toString(commentStart)} ${Caf.toString(
              generatedByStringBare
            )}\n${Caf.toString(commentStart)} file: ${Caf.toString(
              relativePath
            )}/${Caf.toString(name)}\n\n${Caf.toString(code)}`;
            return (this.generatedFiles[
              `${Caf.toString(path)}/${Caf.toString(name)}`
            ] = code);
          };
        }
      ));
    }
  );
});
