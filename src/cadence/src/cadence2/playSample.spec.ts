import { playSample, Effect, PlayerOptions } from './playSample'
import { describe, vi, it, expect, beforeEach } from 'vitest'
import { AudioContextMock } from '../../test/utils'
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

  it('should apply distorsion effect', () => {
    const effect: Effect = { name: 'distorsion', value: 400 }
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const result = sampleNode.withEffect(effect)
    expect(result).toBe(sampleNode)
    expect(audioContext.createWaveShaper).toHaveBeenCalled()
  })

  it('should apply fade in effect', () => {
    const effect: Effect = { name: 'fade', time: '1s', type: 'in' }
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const result = sampleNode.withEffect(effect)
    expect(result).toBe(sampleNode)
    expect(audioContext.createGain).toHaveBeenCalled()
  })

  it('should apply fade out effect', () => {
    const effect: Effect = { name: 'fade', time: '1s', type: 'out' }
    const sampleNode = playSample({ audioContext, audioBuffer, options })
    const result = sampleNode.withEffect(effect)
    expect(result).toBe(sampleNode)
    expect(audioContext.createGain).toHaveBeenCalled()
  })
})
