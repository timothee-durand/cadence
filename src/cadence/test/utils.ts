import { vi } from 'vitest'

export const AudioBufferMock = vi.fn(() => ({
  duration: 1,
  length: 1,
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
    linearRampToValueAtTime: vi.fn(),
    exponentialRampToValueAtTime: vi.fn(),
  },
}))

export const AudioContextMock = vi.fn(() => ({
  decodeAudioData: vi.fn(() => new AudioBufferMock()),
  createBufferSource: vi.fn().mockImplementation(() => new AudioSourceNodeMock()),
  createGain: vi.fn().mockImplementation(() => new GainNodeMock()),
  createBuffer: vi.fn().mockImplementation(() => new AudioBufferMock()),
  createWaveShaper: vi.fn().mockImplementation(() => new GainNodeMock()),
  currentTime: 0,
}))
