# standardize across javascript environments:
# global == self == window (if in browser)

g = if window? then window
else if self? then self
else global

g.self ||= g
g.global ||= g
