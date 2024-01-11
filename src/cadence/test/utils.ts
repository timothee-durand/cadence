import { vi } from 'vitest'
import { LoadedLoopMock } from '../src/LoadedLoop.spec'

export const AudioBufferMock = vi.fn(() => ({
  duration: 1,
}))

export const AudioSourceNodeMock = vi.fn(() => ({
  connect: vi.fn(),
  start: vi.fn<[string], void>(),
  stop: vi.fn<[string], void>(),
  disconnect: vi.fn(),
  playbackRate: {
    value: 1,
  },
  loop: true,
}))

export const GainNodeMock = vi.fn(() => ({
  connect: vi.fn(),
  disconnect: vi.fn(),
  gain: {
    value: 1,
  },
}))

export const AudioContextMock = vi.fn(() => ({
  decodeAudioData: () => Promise.resolve(new AudioBuffer({ length: 1, sampleRate: 1 })),
  createBufferSource: vi.fn().mockImplementation(() => new AudioSourceNodeMock()),
  createGain: vi.fn().mockImplementation(() => new GainNodeMock()),
  currentTime: 0,
}))

export const TimerMock = vi.fn(() => ({
  createInterval: vi.fn(),
  createTimeout: vi.fn(),
  stopAll: vi.fn(),
}))

export const AudioLoaderMock = vi.fn(() => ({
  loadSong: vi.fn(),
  getLoops: vi.fn(() => [
    new LoadedLoopMock(),
  ]),
}))
