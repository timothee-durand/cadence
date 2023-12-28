import { beforeAll, describe, it, expect, vi } from 'vitest'
import { Song } from './types'
import { AudioLoader, decodeAudioData } from './AudioLoader'
import { AudioBufferMock, AudioContextMock } from '../test/utils'

vi.stubGlobal('AudioBuffer', AudioBufferMock)
vi.stubGlobal('AudioContext', AudioContextMock)

describe('AudioLoader', () => {
  let song: Song
  beforeAll(() => {
    song = [
      {
        sample: 'https://www.example.com',
        startTime: '0s',
        endTime: '1s',
        interval: '1s',
      },
    ]
  })

  it('should load a song', async () => {
    const audioLoader = new AudioLoader()
    await audioLoader.loadSong(song)
    const loadedLoops = audioLoader.getLoops()
    expect(loadedLoops).toBeDefined()
    expect(loadedLoops.length).toBe(1)
    expect(loadedLoops[0].samplePath).toBe('https://www.example.com')
  })

  it('should not load a loop if it is already loaded', async () => {
    const audioLoader = new AudioLoader()
    await audioLoader.loadSong(song)
    await audioLoader.loadSong(song)
    const loadedLoops = audioLoader.getLoops()
    expect(loadedLoops).toBeDefined()
    expect(loadedLoops.length).toBe(1)
    expect(loadedLoops[0].samplePath).toBe('https://www.example.com')
  })
})

describe('decodeAudioData', () => {
  it('should decode an array buffer', async () => {
    const arrayBuffer = new ArrayBuffer(8)
    const audioBuffer = await decodeAudioData(arrayBuffer)
    expect(audioBuffer).toBeDefined()
  })
})
