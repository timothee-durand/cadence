import { Loop, Time } from './types'
import { convertStringToS, convertTimeToMs } from './utils/convertTimeToMs'

export class LoadedLoop {
  sample: string
  private speed = 1
  private startTime: Time = '0s'
  private endTime: Time = '0s'
  private volume = 1
  private buffer: AudioBuffer
  private interval: number | undefined
  nodes: AudioNode[] = []
  private audioContext: AudioContext
  private intervalId: number | undefined

  constructor({ buffer, loop, audioContext }: { buffer: AudioBuffer, loop: Loop, audioContext: AudioContext }) {
    this.buffer = buffer
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

    if (this.interval) {
      this.intervalId = setInterval(playSound, this.interval)
      playSound()
    }
    if (this.startTimeS) {
      const startTime = this.startTimeS
      setTimeout(playSound, startTime * 1000)
    }
    if (this.endTimeS) {
      const duration = this.endTimeS - this.startTimeS
      setTimeout(this.stop, duration * 1000)
    }
  }

  private get endTimeS(): number {
    const endTime = convertStringToS(this.endTime)
    return endTime
  }

  private get startTimeS(): number {
    const startTime = convertStringToS(this.startTime)
    return startTime
  }

  get samplePath(): string {
    return this.sample
  }

  public stop(): void {
    clearInterval(this.intervalId)
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
