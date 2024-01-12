import { Loop, Time } from './types'
import { convertTimeToS, convertTimeToMs } from './utils/convertTime'
import { Timer } from './Timer'

export class LoadedLoop {
  sample: string
  private speed = 1
  private startTime: Time = '0s'
  private endTime: Time = '0s'
  private volume = 1
  private buffer: AudioBuffer
  private timer: Timer
  private interval: number | undefined
  private nodes: AudioNode[] = []
  private audioContext: AudioContext

  constructor({ buffer, loop, audioContext, timer }: {
    buffer: AudioBuffer
    loop: Loop
    audioContext: AudioContext
    timer: Timer
  }) {
    this.buffer = buffer
    this.timer = timer
    this.sample = loop.sample
    if (loop.speed) this.speed = loop.speed
    if (loop.volume) this.volume = loop.volume
    if (loop.startTime) this.startTime = loop.startTime
    if (loop.endTime) this.endTime = loop.endTime
    if (loop.interval) this.interval = convertTimeToMs(loop.interval)
    this.audioContext = audioContext
  }

  public loop(): void {
    const playSound = () => {
      const sourceNode = createBufferSource(this.audioContext, this.speed, this.buffer)
      const gainNode = createGainNode(this.audioContext, this.volume)
      sourceNode.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      sourceNode.start()
      this.nodes.push(sourceNode)
      this.nodes.push(gainNode)
    }

    const launchSound = () => {
      if (!this.interval) {
        playSound()
        return
      }
      this.timer.createInterval(playSound, this.interval)
      playSound()
    }

    if (this.startTimeS) {
      const startTime = this.startTimeS
      this.timer.createTimeout(launchSound, startTime * 1000)
    }
    else {
      launchSound()
    }

    if (this.endTimeS) {
      const duration = this.endTimeS
      this.timer.createTimeout(() => this.stop(), duration * 1000)
    }
  }

  private get endTimeS(): number {
    const endTime = convertTimeToS(this.endTime)
    return endTime
  }

  private get startTimeS(): number {
    const startTime = convertTimeToS(this.startTime)
    return startTime
  }

  get samplePath(): string {
    return this.sample
  }

  get timerInstance(): Timer {
    return this.timer
  }

  get audioNodes(): readonly AudioNode[] {
    return Object.freeze(this.nodes)
  }

  public stop(): void {
    this.timer.stopAll()
    this.nodes.forEach(node => node.disconnect())
    this.nodes = []
  }
}

export function createBufferSource(context: AudioContext, speed: number, buffer: AudioBuffer): AudioBufferSourceNode {
  const source = context.createBufferSource()
  source.buffer = buffer
  source.playbackRate.value = speed
  return source
}

export function createGainNode(context: AudioContext, volume: number): GainNode {
  const gainNode = context.createGain()
  gainNode.gain.value = volume
  return gainNode
}
