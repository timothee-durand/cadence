import { beforeEach, describe, vi, it, expect } from 'vitest'
import { AudioBufferMock, AudioContextMock } from '../test/utils'
import { LoadedLoop } from './LoadedLoop'
import { Loop } from './types'

vi.stubGlobal('AudioBuffer', AudioBufferMock)
vi.stubGlobal('AudioContext', AudioContextMock)

const TimerMock = vi.fn(() => ({
  createInterval: vi.fn(),
  createTimeout: vi.fn(),
  stopAll: vi.fn(),
}))

vi.stubGlobal('TimerMock', TimerMock)

describe('LoadedLoop', () => {
  let loadedLoop: LoadedLoop
  let audioContext: AudioContext
  let loop: Loop
  beforeEach(() => {
    audioContext = new AudioContextMock()
    loop = {
      sample: 'https://www.example.com',
      startTime: '0s',
      endTime: '1s',
      interval: '1s',
    }
    loadedLoop = new LoadedLoop({
      timer: new TimerMock(),
      buffer: new AudioBufferMock({ length: 1, sampleRate: 1 }),
      loop: loop,
      audioContext,
    })
  })

  it('should create buffer source', () => {
    loadedLoop.loop()
    expect(audioContext.createBufferSource).toHaveBeenCalled()
    expect(audioContext.createGain).toHaveBeenCalled()
  })

  it('should create an interval', () => {
    loadedLoop.loop()
    expect(loadedLoop.timerInstance.createInterval).toHaveBeenCalled()
  })

  it('should create a timeout', () => {
    loadedLoop.loop()
    expect(loadedLoop.timerInstance.createTimeout).toHaveBeenCalled()
  })

  it('should stop buffer source', () => {
    loadedLoop.loop()
    loadedLoop.stop()
    expect(loadedLoop.timerInstance.stopAll).toHaveBeenCalled()
    expect(loadedLoop.audioNodes.length).toBe(0)
  })
})
