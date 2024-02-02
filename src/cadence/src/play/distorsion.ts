import { NodeEffect } from './types'

export interface Distorsion {
  name: 'distorsion'
  value: number
}

export function applyDistorsion({ effect }: { effect: Distorsion }): NodeEffect {
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
