import { loadSample, initCadence } from './init'
import { loop, wait, playSample } from './play'
import type { InitResult, PreloadResult, Preload } from './init'
import type { PlayerOptions, SampleNode, Distorsion, FadeIn, Fade, FadeOut } from './play'

export { loadSample, initCadence, loop, playSample, wait }
export type { InitResult, PreloadResult, Preload, PlayerOptions, SampleNode, Distorsion, FadeIn, Fade, FadeOut }
