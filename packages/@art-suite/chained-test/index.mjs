// index.mjs - ES6 wrapper that re-exports the CommonJS module
const { chainedTest, firstIt } = require('./dist/index.cjs.js');
export { chainedTest, firstIt };
