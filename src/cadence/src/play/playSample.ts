import { applyDistorsion } from './distorsion'
import { applyFadeIn, applyFadeOut } from './fades'
import { Effect, LiveEffect, NodeEffect } from './types'

export interface SampleNode {
  withEffect(effect: Effect): SampleNode
  stop(): void
  start(): void
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
      source.buffer = audioBuffer
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
