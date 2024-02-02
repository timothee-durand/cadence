import { Distorsion } from './distorsion'
import { Fade } from './fades'

export type Time = `${number}s` | `${number}ms`
export type Effect = Distorsion | Fade
export type NodeEffect = (context: { audioContext: AudioContext }) => AudioNode
export type LiveEffect = (context: { gainNode: GainNode, source: AudioBufferSourceNode }) => void
