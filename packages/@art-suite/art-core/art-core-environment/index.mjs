import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  getEnv,
  isBrowser,
  isWebWorker,
  isNode,
} = require('./build');
