import { Timer } from './Timer'
import { describe, beforeEach, afterEach, vi, expect, it, Mock } from 'vitest'

describe('Timer', () => {
  let timer: Timer
  let mockCallback: Mock

  beforeEach(() => {
    timer = new Timer()
    mockCallback = vi.fn()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should execute interval callback after specified interval', () => {
    timer.createInterval(mockCallback, 1000)
    vi.advanceTimersByTime(1000)
    expect(mockCallback).toHaveBeenCalledTimes(1)
    vi.advanceTimersByTime(1000)
    expect(mockCallback).toHaveBeenCalledTimes(2)
  })

  it('should execute timeout callback after specified timeout', () => {
    timer.createTimeout(mockCallback, 1000)
    vi.advanceTimersByTime(1000)
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })

  it('should not execute interval callback if stopped', () => {
    timer.createInterval(mockCallback, 1000)
    timer.stopAll()
    vi.advanceTimersByTime(1000)
    expect(mockCallback).not.toHaveBeenCalled()
  })

  it('should not execute timeout callback if stopped', () => {
    timer.createTimeout(mockCallback, 1000)
    timer.stopAll()
    vi.advanceTimersByTime(1000)
    expect(mockCallback).not.toHaveBeenCalled()
  })
})
