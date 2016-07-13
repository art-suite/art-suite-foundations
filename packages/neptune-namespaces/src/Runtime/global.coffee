# standardize across javascript environments:
# global == self == window (if in browser)
if typeof global == 'object'
  global.self = global
else if typeof self == 'object'
  self.global = self
