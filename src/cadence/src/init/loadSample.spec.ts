import { loadSample } from './loadSample'
import { describe, vi, it, expect, beforeEach } from 'vitest'
import { AudioContextMock } from '../../test/utils'
describe('loadSample function', () => {
  let audioContext: AudioContext
  beforeEach(() => {
    audioContext = AudioContextMock() as unknown as AudioContext
  })
  it('should load sample successfully', async () => {
    const mockAudioBuffer = audioContext.createBuffer(2, audioContext.sampleRate * 3.0, audioContext.sampleRate)
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      arrayBuffer: () => Promise.resolve(mockAudioBuffer),
    }))
    const path = 'sample.wav'
    const audioBuffer = await loadSample(path, audioContext)
    expect(audioBuffer.length).toBe(mockAudioBuffer.length)
  })

  it('should throw error when fetch fails', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    const path = 'sample.wav'
    await expect(loadSample(path, audioContext)).rejects.toThrow('Network error')
  })
})
