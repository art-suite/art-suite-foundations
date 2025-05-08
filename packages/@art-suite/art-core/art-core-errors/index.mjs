import { createRequire } from 'module';
const require = createRequire(import.meta.url);

export const {
  rawCallStack,
  callStack,
  stackTraceLimit
} = require('./build');