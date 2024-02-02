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

function applyDistorsion({ effect, audioContext }: { effect: Distorsion, audioContext: AudioContext }): WaveShaperNode {
  const distortion = audioContext.createWaveShaper()
  distortion.curve = makeDistortionCurve(effect.value)
  distortion.oversample = '4x'
  return distortion
}

function makeDistortionCurve(amount: number): Float32Array {
  const k = typeof amount === 'number' ? amount : 50
  const nSamples = 44100
  const curve = new Float32Array(nSamples)
  const deg = Math.PI / 180
  let i = 0
  let x
  for (; i < nSamples; ++i) {
    x = (i * 2) / nSamples - 1
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x))
  }
  return curve
}

type FunctionEffect = () => void

function applyFadeIn({ effect, volume, gainNode }: {
  effect: FadeIn
  audioContext: AudioContext
  volume: number
  gainNode: GainNode
}): FunctionEffect {
  return () => {
    gainNode.gain.value = 0
    gainNode.gain.linearRampToValueAtTime(volume, convertTimeToS(effect.endTime))
  }
}

function applyFadeOut({ effect, gainNode }: {
  effect: FadeOut
  gainNode: GainNode
}): FunctionEffect {
  return () => setTimeout(() => {
    gainNode.gain.linearRampToValueAtTime(0, convertTimeToS(effect.duration))
  }, convertTimeToMs(effect.startTime))
}

export interface PlayerOptions {
  volume?: number
  speed?: number
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
  const source = audioContext.createBufferSource()
  source.buffer = audioBuffer
  source.playbackRate.value = playerOptions.speed
  const nodeEffects: AudioNode[] = []
  const liveEffects: FunctionEffect[] = []
  const gainNode = audioContext.createGain()
  return {
    withEffect(effect: Effect): SampleNode {
      switch (effect.name) {
        case 'distorsion':
          nodeEffects.push(applyDistorsion({ effect, audioContext }))
          break
        case 'fadeIn':
          liveEffects.push(applyFadeIn({ effect, audioContext, volume: playerOptions.volume, gainNode }))
          break
        case 'fadeOut':
          liveEffects.push(applyFadeOut({ effect, gainNode }))
          break
      }
      return this
    },
    stop() {
      source.stop()
    },
    start() {
      let lastNode: AudioNode = source
      nodeEffects.forEach((effect) => {
        lastNode.connect(effect)
        lastNode = effect
      })
      lastNode.connect(gainNode)
      gainNode.connect(audioContext.destination)
      source.start()
      liveEffects.forEach(effect => effect())
    },
  }
}
