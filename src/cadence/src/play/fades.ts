import { convertTimeToMs, convertTimeToS } from '../utils/convertTime'

import { LiveEffect, Time } from './types'

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

export function applyFadeIn({ effect, volume }: {
  effect: FadeIn
  volume: number
}): LiveEffect {
  return ({ gainNode }) => {
    gainNode.gain.value = 0
    gainNode.gain.linearRampToValueAtTime(volume, convertTimeToS(effect.endTime))
  }
}

export function applyFadeOut({ effect }: {
  effect: FadeOut
}): LiveEffect {
  return ({ gainNode }) => setTimeout(() => {
    gainNode.gain.linearRampToValueAtTime(0.000000001, convertTimeToS(effect.duration))
  }, convertTimeToMs(effect.startTime))
}
