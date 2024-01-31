import { PlayerOptions, playSample } from './playSample'

export async function initCadence(preload?: () => Promise<void>, audioContext: AudioContext = new AudioContext()) {
  if (preload) await preload()
  return {
    playSample: (audioBuffer: AudioBuffer, options?: PlayerOptions) => {
      return playSample({ audioBuffer, audioContext, options })
    },
    stopAll: () => {
      audioContext.close()
    },
  }
}
