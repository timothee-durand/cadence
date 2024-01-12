export function loop(callback: () => Promise<void>, interval: number, timeout?: number) {
  callback()
  const intervalId = setInterval(callback, interval)
  if (timeout) {
    setTimeout(() => {
      clearInterval(intervalId)
    }, timeout)
  }
}
