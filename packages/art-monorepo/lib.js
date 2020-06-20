const fs = require('fs-extra');

module.exports = {
  readJson: (file) => {
    if (fs.existsSync(file))
      return JSON.parse(fs.readFileSync(file));
    else
      return {}
  },

  /** Executes a shell command and return it as a Promise.
   * @param cmd {string}
   * @return {Promise<string>}
   */
  execShellCommand: (cmd) =>
    new Promise((resolve, reject) => {
      require('child_process').exec(cmd, (error, stdout, stderr) => {
        if (error) reject(stderr || stdout);
        else resolve(stdout || stderr);
      })
    })
}