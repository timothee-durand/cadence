import { Loop, Time } from './types'
import { convertStringToS } from './utils/convertTimeToMs'

export class LoadedLoop {
  sample: string
  private speed = 1
  private startTime: Time = '0s'
  private endTime: Time = '0s'
  private volume = 1
  private buffer: AudioBuffer
  sourceNode: AudioBufferSourceNode | undefined
  gainNode: GainNode | undefined
  private audioContext: AudioContext

  constructor({ buffer, loop, audioContext }: { buffer: AudioBuffer, loop: Loop, audioContext: AudioContext }) {
    this.buffer = buffer
    this.sample = loop.sample
    if (loop.speed) this.speed = loop.speed
    if (loop.volume) this.volume = loop.volume
    if (loop.startTime) this.startTime = loop.startTime
    if (loop.endTime) this.endTime = loop.endTime
    this.audioContext = audioContext
  }

  public loop(): void {
    this.sourceNode = createBufferSource(this.audioContext, this.speed, this.buffer)
    this.gainNode = createGainNode(this.audioContext, this.volume)
    this.sourceNode.connect(this.gainNode)
    this.gainNode.connect(this.audioContext.destination)
    this.sourceNode.start(this.audioContext.currentTime + this.startTimeS)
    this.sourceNode.stop(this.audioContext.currentTime + this.endTimeS)
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
    this.sourceNode?.stop()
  }
}

export function createBufferSource(context: AudioContext, speed: number, buffer: AudioBuffer): AudioBufferSourceNode {
  const source = context.createBufferSource()
  source.buffer = buffer
  source.loop = true
  source.playbackRate.value = speed
  return source
}

export function createGainNode(context: AudioContext, volume: number): GainNode {
  const gainNode = context.createGain()
  gainNode.gain.value = volume
  return gainNode
}
