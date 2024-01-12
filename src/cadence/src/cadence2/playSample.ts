export interface Distorsion {
  name: 'distorsion'
  value: number
}

export interface Fade {
  name: 'fade'
  time: number
  type: 'in' | 'out'
}

export type Effect = Distorsion | Fade

export interface SampleNode {
  withEffect(effect: Effect): SampleNode

  stop(): void
}

function applyDistorsion({ source, effect, audioContext }: { source: AudioBufferSourceNode, effect: Distorsion, audioContext: AudioContext }): void {
  const distortion = audioContext.createWaveShaper()
  distortion.curve = makeDistortionCurve(effect.value)
  distortion.oversample = '4x'
  source.connect(distortion)
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

function applyFade({ effect, audioContext, gainNode }: { effect: Fade, audioContext: AudioContext, gainNode: GainNode }): void {
  switch (effect.type) {
    case 'in':
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime + effect.time)
      break
    case 'out':
      gainNode.gain.linearRampToValueAtTime(1, audioContext.currentTime)
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + effect.time)
      break
  }
}

function applyEffect({ source, effect, audioContext, gainNode }: { source: AudioBufferSourceNode, effect: Effect, audioContext: AudioContext, gainNode: GainNode }): void {
  switch (effect.name) {
    case 'distorsion':
      applyDistorsion({ source, effect, audioContext })
      break
    case 'fade':
      applyFade({ effect, audioContext, gainNode })
      break
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
  source.connect(audioContext.destination)
  const gainNode = audioContext.createGain()
  gainNode.gain.value = playerOptions.volume
  source.connect(gainNode)
  source.start()
  return {
    withEffect(effect: Effect): SampleNode {
      applyEffect({ source, effect, audioContext, gainNode })
      return this
    },
    stop() {
      source.stop()
    },
  }
}
