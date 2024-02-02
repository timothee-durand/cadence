import { PlayerOptions, playSample, SampleNode } from '../play/playSample'

export type PreloadResult = {
  [key: string]: AudioBuffer
}

export type Preload = () => Promise<PreloadResult>

export type InitResult = {
  playSample: (audioBuffer: AudioBuffer, options?: PlayerOptions) => SampleNode
  stopAll: () => void
  samples?: PreloadResult
}

export async function initCadence(preload?: Preload, audioContext: AudioContext = new AudioContext()): Promise<InitResult> {
  return {
    playSample: (audioBuffer: AudioBuffer, options?: PlayerOptions) => {
      return playSample({ audioBuffer, audioContext, options })
    },
    stopAll: () => {
      audioContext.close()
    },
    samples: preload ? await preload() : undefined,
  }
}
