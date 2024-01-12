export interface Distorsion {
  name: 'distorsion'
  distorsionValue: number
}

export interface Fade {
  name: 'fade'
  value: number
  type: 'in' | 'out'
}

export type Effect = Distorsion | Fade
export type Time = `${number}s` | `${number}ms`

export interface Loop {
  sample: string
  interval?: Time
  sampleEffect?: Effect | Effect[]
  loopEffect?: Effect | Effect[]
  speed?: number
  volume?: number
  startTime?: Time
  endTime?: Time
}

export type Song = Loop[]

export interface AbstractCadence {
  play(song: Song): void

  play(loop: Loop): void

  play(): void

  add(loop: Loop): void

  stop(): void
}
