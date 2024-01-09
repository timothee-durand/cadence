---
outline: deep
---
# Cadence

The `Cadence` interface represents a cadence.

### `play(song: Song)`
A method that takes a `Song` and plays it.

### `play(loop: Loop)`
A method that takes a `Loop` and plays it.

### `play()`
A method that plays the current song or loop.

### `add(loop: Loop)`  <Badge type="danger" text="Not implemented yet" />
A method that takes a `Loop` and adds it to the current song or loop.

### `stop()`
A method that stops the current song or loop.


## Time

The `Time` type is a template literal type that represents a time in seconds. It should be a string ending with 's'.


