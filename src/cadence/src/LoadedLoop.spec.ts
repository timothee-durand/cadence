import { beforeEach, describe, vi, it, expect } from 'vitest'
import { AudioBufferMock, AudioContextMock, TimerMock } from '../test/utils'
import { LoadedLoop } from './LoadedLoop'
import { Loop } from './types'
import { Timer } from './Timer'

vi.stubGlobal('AudioBuffer', AudioBufferMock)
vi.stubGlobal('AudioContext', AudioContextMock)
vi.stubGlobal('TimerMock', TimerMock)

export const LoadedLoopMock = vi.fn(() => ({
  loop: vi.fn(),
  stop: vi.fn(),
  samplePath: 'https://www.example.com',
  timerInstance: vi.fn(),
  audioNodes: [],
}))

describe('LoadedLoop', () => {
  let loadedLoop: LoadedLoop
  let audioContext: AudioContext
  let loop: Loop
  beforeEach(() => {
    audioContext = new AudioContextMock() as unknown as AudioContext
    loop = {
      sample: 'https://www.example.com',
      startTime: '0s',
      endTime: '1s',
      interval: '1s',
    }
    loadedLoop = new LoadedLoop({
      timer: new TimerMock() as unknown as Timer,
      buffer: new AudioBufferMock() as unknown as AudioBuffer,
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
