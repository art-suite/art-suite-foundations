# Art.Events

Event management.

Used by art-engine and others in the art-suite

# TODO

Um. The EventedMixin should mix in EventManager! Right now, every evented object that has
event handlers creates an extra, EventManager object. Minimizing objects is critical to JavaScript performance.
I don't think there's even a good reason why not to mix in EventManger directly.