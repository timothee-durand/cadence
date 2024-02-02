import { wait } from './wait'
import { describe, vi, it, expect } from 'vitest'

describe('wait function', () => {
  vi.useFakeTimers()

  it('should resolve after specified duration', async () => {
    const duration = 1000
    const promise = wait(duration)
    vi.advanceTimersByTime(duration)
    await expect(promise).resolves.toBeUndefined()
  })

  it('should not resolve before specified duration', async () => {
    const spy = vi.fn()
    const duration = 1000
    wait(duration).then(spy)
    vi.advanceTimersByTime(duration - 1)
    expect(spy).not.toHaveBeenCalled()
  })

  it('should handle zero duration', async () => {
    const promise = wait(0)
    vi.advanceTimersByTime(0)
    await expect(promise).resolves.toBeUndefined()
  })

  it('should handle negative duration', async () => {
    const promise = wait(-1000)
    vi.advanceTimersByTime(0)
    await expect(promise).resolves.toBeUndefined()
  })
})
