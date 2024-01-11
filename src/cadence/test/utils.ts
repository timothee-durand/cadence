import { vi } from 'vitest'

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
