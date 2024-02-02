import { playSample, PlayerOptions } from './playSample'
import { describe, vi, it, expect, beforeEach } from 'vitest'
import { AudioContextMock } from '../../test/utils'
import { Distorsion } from './distorsion'
import { Fade } from './fades'
describe('playSample function', () => {
  let audioContext: AudioContext
  let audioBuffer: AudioBuffer
  let options: PlayerOptions

  beforeEach(() => {
    audioContext = AudioContextMock() as unknown as AudioContext
    audioBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 3.0, audioContext.sampleRate)
    options = { volume: 1, speed: 1 }
  })

  it('should start playing sample', () => {
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const spy = vi.fn()
    sampleNode.start = spy
    sampleNode.start()
    expect(spy).toHaveBeenCalled()
  })

  it('should stop playing sample', () => {
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const spy = vi.fn()
    sampleNode.stop = spy
    sampleNode.stop()
    expect(spy).toHaveBeenCalled()
  })

  it('should add effect only at playTime', () => {
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const effect: Distorsion = { name: 'distorsion', value: 2 }
    sampleNode.withEffect(effect)
    expect(audioContext.createWaveShaper).not.toHaveBeenCalled()
    sampleNode.start()
    expect(audioContext.createWaveShaper).toHaveBeenCalled()
  })

  it('should create wavesharper on distorsion effect', () => {
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const effect: Distorsion = { name: 'distorsion', value: 2 }
    sampleNode.withEffect(effect)
    sampleNode.start()
    expect(audioContext.createWaveShaper).toHaveBeenCalled()
  })

  it('should use the gain functions to fade in and out', () => {
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const effect: Fade = { name: 'fadeIn', endTime: '200ms' }
    sampleNode.withEffect(effect)
    sampleNode.start()
    expect(audioContext.createGain).toHaveBeenCalled()
  })
})
