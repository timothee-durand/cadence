---
outline: deep
---

# Getting started


## Installation

```bash
npm install v1-js
```

## Usage

```typescript
import {Cadence, Loop} from "v1-js";

const cadence = new Cadence();

const loop: Loop = {
    sample: A3Piano,
    interval: "1s",
    speed: 1
}

cadence.play(loop);
```