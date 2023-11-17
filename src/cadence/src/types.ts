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
export type Time = `${number}ms` | `${number}s` | `${number}m`;

export interface Loop {
    sample: string
    interval: Time
    sampleEffect?: Effect | Effect[]
    loopEffect?: Effect | Effect[]
    speed?: number
    volume?: number
    startTime?: Time
    endTime?: Time
}

export type Song = Loop[]

export interface Cadence {
    play(song: Song): void

    play(loop: Loop): void

    add(loop: Loop): void

    stop(loop: Loop): void
}