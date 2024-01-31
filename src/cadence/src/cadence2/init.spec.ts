import { initCadence } from './init'
import { describe, vi, it, expect, beforeEach } from 'vitest'
import { AudioContextMock } from '../../test/utils'

describe('initCadence function', () => {
  let audioContext: AudioContext
  beforeEach(() => {
    audioContext = AudioContextMock() as unknown as AudioContext
  })

  it('should initialize cadence without preload', async () => {
    const cadence = await initCadence(undefined, audioContext)
    expect(cadence).toHaveProperty('playSample')
    expect(cadence).toHaveProperty('stopAll')
  })

  it('should initialize cadence with preload', async () => {
    const preload = vi.fn().mockResolvedValue(undefined)
    const cadence = await initCadence(preload, audioContext)
    expect(cadence).toHaveProperty('playSample')
    expect(cadence).toHaveProperty('stopAll')
    expect(preload).toHaveBeenCalled()
  })

  it('should stop all sounds', async () => {
    const cadence = await initCadence(undefined, audioContext)
    const spy = vi.fn()
    audioContext.close = spy
    cadence.stopAll()
    expect(spy).toHaveBeenCalled()
  })
})
