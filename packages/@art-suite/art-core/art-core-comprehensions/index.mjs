import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  each,
  array,
  object,
  reduce,
  find
} = require('./build');