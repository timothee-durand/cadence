import { Cadence } from './Cadence'
import { Loop, Song } from './types'
import { describe, expect, beforeEach, it, vi } from 'vitest'
import { AudioLoader } from './AudioLoader'
import { AudioBufferMock, AudioContextMock, AudioLoaderMock } from '../test/utils'

vi.stubGlobal('AudioBuffer', AudioBufferMock)
vi.stubGlobal('AudioContext', AudioContextMock)

describe('Cadence', () => {
  let cadence: Cadence
  let mockSong: Song
  let mockLoop: Loop
  let mockLoader: AudioLoader

  beforeEach(() => {
    mockSong = []
    mockLoop = {
      sample: 'https://www.example.com',
      startTime: '0s',
      endTime: '1s',
      interval: '1s',
    }
    mockLoader = AudioLoaderMock() as unknown as AudioLoader
    cadence = new Cadence(mockLoader)
  })

  it('should load and play a song when play is called with a song', async () => {
    await cadence.play(mockSong)
    expect(mockLoader.loadSong).toHaveBeenCalledWith(mockSong)
    expect(mockLoader.getLoops).toHaveBeenCalled()
  })

  it('should load and play a loop when play is called with a loop', async () => {
    await cadence.play(mockLoop)
    expect(mockLoader.loadSong).toHaveBeenCalledWith([mockLoop])
  })

  it('should stop all loops when stop is called', () => {
    cadence.stop()
  })
})
