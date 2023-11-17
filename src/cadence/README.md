# Cadence

# What's Cadence ?
- Play standards sample with function which is includes.
- Make loop with music.
- Educational purpose.
- Easy to handle.
- Open source.
- Easy to create software based on.
- Develop in Typescript.
- High possibility of creativity.

# Features :
- Can read samples.
- Can create intervale between different samples.
- Possible to modify some paramaters on Samples like the amplitudes, speed, volume... and more possibly.
- Can made loop with the sample.
- Can add effect like reverb, reverse, echo, distortion.

Demo [here](http://timothee-durand.github.io/cadence) 

# How to use it ?

## Installation

```bash
npm install cadence-js
```

## Usage

```typescript
import {Cadence, Loop} from "cadence-js";

const cadence = new Cadence();

const loop: Loop = {
    sample: A3Piano,
    interval: "1s",
    speed: 1
}

cadence.play(loop);
```