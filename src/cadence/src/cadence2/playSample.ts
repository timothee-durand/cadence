import { convertTimeToMs, convertTimeToS } from '../utils/convertTime'

export type Time = `${number}s` | `${number}ms`

export interface Distorsion {
  name: 'distorsion'
  value: number
}

export interface FadeIn {
  name: 'fadeIn'
  endTime: Time
}

export interface FadeOut {
  name: 'fadeOut'
  startTime: Time
  duration: Time
}

export type Fade = FadeIn | FadeOut

export type Effect = Distorsion | Fade

export interface SampleNode {
  withEffect(effect: Effect): SampleNode
  stop(): void
  start(): void
}

type NodeEffect = (context: { audioContext: AudioContext }) => AudioNode

function applyDistorsion({ effect }: { effect: Distorsion }): NodeEffect {
  return ({ audioContext }) => {
    const distortion = audioContext.createWaveShaper()
    distortion.curve = makeDistortionCurve(effect.value)
    distortion.oversample = '4x'
    return distortion
  }
}

function makeDistortionCurve(amount: number): Float32Array {
  const nSamples = 44100
  const curve = new Float32Array(nSamples)
  const deg = Math.PI / 180
  let i = 0
  let x
  for (; i < nSamples; ++i) {
    x = (i * 2) / nSamples - 1
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
  }
  return curve
}

type LiveEffect = (context: { gainNode: GainNode, source: AudioBufferSourceNode }) => void

function applyFadeIn({ effect, volume }: {
  effect: FadeIn
  volume: number
}): LiveEffect {
  return ({ gainNode }) => {
    gainNode.gain.value = 0
    gainNode.gain.linearRampToValueAtTime(volume, convertTimeToS(effect.endTime))
  }
}

function applyFadeOut({ effect }: {
  effect: FadeOut
}): LiveEffect {
  return ({ gainNode }) => setTimeout(() => {
    gainNode.gain.linearRampToValueAtTime(0.000000001, convertTimeToS(effect.duration))
  }, convertTimeToMs(effect.startTime))
}

export interface PlayerOptions {
  volume?: number
  speed?: number
}

function cloneAudioBuffer(fromAudioBuffer: AudioBuffer) {
  const audioBuffer = new AudioBuffer({
    length: fromAudioBuffer.length,
    numberOfChannels: fromAudioBuffer.numberOfChannels,
    sampleRate: fromAudioBuffer.sampleRate,
  })
  for (let channelI = 0; channelI < audioBuffer.numberOfChannels; ++channelI) {
    const samples = fromAudioBuffer.getChannelData(channelI)
    audioBuffer.copyToChannel(samples, channelI)
  }
  return audioBuffer
}

export function playSample({ audioContext, audioBuffer, options }: {
  audioBuffer: AudioBuffer
  audioContext: AudioContext
  options?: PlayerOptions
}): SampleNode {
  const playerOptions = {
    volume: 1,
    speed: 1,
    ...options,
  }
  const nodeEffects: NodeEffect[] = []
  const liveEffects: LiveEffect[] = []
  let source: AudioBufferSourceNode | null = null
  return {
    withEffect(effect: Effect): SampleNode {
      switch (effect.name) {
        case 'distorsion':
          nodeEffects.push(applyDistorsion({ effect }))
          break
        case 'fadeIn':
          liveEffects.push(applyFadeIn({ effect, volume: playerOptions.volume }))
          break
        case 'fadeOut':
          liveEffects.push(applyFadeOut({ effect }))
          break
      }
      return this
    },
    stop() {
      if (source === null)
        throw new Error('The sound has not started yet')
      source.stop()
      source = null
    },
    start() {
      source = audioContext.createBufferSource()
      source.buffer = cloneAudioBuffer(audioBuffer)
      source.playbackRate.value = playerOptions.speed
      let lastNode: AudioNode = source
      nodeEffects.forEach((effect) => {
        const nodeEffect = effect({ audioContext })
        lastNode.connect(nodeEffect)
        lastNode = nodeEffect
      })
      const gainNode = audioContext.createGain()
      lastNode.connect(gainNode)
      gainNode.connect(audioContext.destination)
      source.start()
      liveEffects.forEach(effect => effect({ gainNode, source: source! }))
    },
  }
}
