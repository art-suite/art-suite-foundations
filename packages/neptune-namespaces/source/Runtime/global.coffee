# standardize across javascript environments:
# global == self == window (if in browser)
if global?
  global.self = global
else if self?
  self.global = self
