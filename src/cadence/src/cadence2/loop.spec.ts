import { loop } from './loop'
import { describe, vi, it, expect } from 'vitest'
describe('loop function', () => {
  vi.useFakeTimers()

  it('should execute function specified number of times', () => {
    const mockFn = vi.fn()
    const times = 5
    const interval = 5
    loop(mockFn, interval, times * interval)
    vi.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(times + 1)
  })

  it('should not execute function if times is zero', () => {
    const mockFn = vi.fn()
    loop(mockFn, 0)
    vi.runAllTimers()
    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should not execute function if times is negative', () => {
    const mockFn = vi.fn()
    loop(mockFn, -1)
    vi.runAllTimers()
    expect(mockFn).not.toHaveBeenCalled()
  })

  it('should handle non-integer times', () => {
    const mockFn = vi.fn()
    const times = 5.5
    const interval = 5
    loop(mockFn, interval, times * interval)
    vi.runAllTimers()
    expect(mockFn).toHaveBeenCalledTimes(Math.floor(times) + 1)
  })
})
