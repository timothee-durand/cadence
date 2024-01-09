
# Loop and Song

## Loop

The `Loop` interface represents a loop.

### `sample`
A string representing the sample of the loop.

### `interval`
A `Time` representing the interval of the loop.

### `sampleEffect`
An optional `Effect` or array of `Effect` representing the effect(s) applied to the sample.

### `loopEffect`
An optional `Effect` or array of `Effect` representing the effect(s) applied to the loop.

### `speed`
An optional number representing the speed of the loop.

### `volume`
An optional number representing the volume of the loop.

### `startTime`
An optional `Time` representing the start time of the loop.

### `endTime`
An optional `Time` representing the end time of the loop.

## Song

The `Song` type is an array of `Loop`.
