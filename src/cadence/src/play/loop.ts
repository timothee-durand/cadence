export function loop(callback: () => Promise<void>, interval: number, timeout?: number) {
  if (interval <= 0) return
  callback()
  const intervalId = setInterval(callback, interval)
  if (timeout) {
    setTimeout(() => {
      clearInterval(intervalId)
    }, timeout)
  }
}
