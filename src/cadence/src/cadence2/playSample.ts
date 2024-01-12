import { convertTimeToS } from '../utils/convertTime'

export type Time = `${number}s` | `${number}ms`

export interface Distorsion {
  name: 'distorsion'
  value: number
}

export interface Fade {
  name: 'fade'
  time: Time
  type: 'in' | 'out'
}

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

function applyFade({ effect, audioContext, volume }: {
  effect: Fade
  audioContext: AudioContext
  volume: number
}): GainNode {
  const gainNode = audioContext.createGain()
  switch (effect.type) {
    case 'in':
      gainNode.gain.value = 0
      gainNode.gain.exponentialRampToValueAtTime(volume, audioContext.currentTime + convertTimeToS(effect.time))
      return gainNode
    case 'out':
      setTimeout(() => {
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + convertTimeToS(effect.time))
      }, convertTimeToS(effect.time))
      return gainNode
  }
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
  const gainNode = audioContext.createGain()
  gainNode.gain.value = playerOptions.volume
  const effects: AudioNode[] = []
  return {
    withEffect(effect: Effect): SampleNode {
      switch (effect.name) {
        case 'distorsion':
          effects.push(applyDistorsion({ effect, audioContext }))
          break
        case 'fade':
          effects.push(applyFade({ effect, audioContext, volume: playerOptions.volume }))
          break
      }
      return this
    },
    stop() {
      source.stop()
    },
    start() {
      effects.forEach((effect) => {
        source.connect(effect)
        effect.connect(gainNode)
      })
      source.start()
    },
  }
}
