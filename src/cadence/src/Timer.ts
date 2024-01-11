export class Timer {
  private intervalIds: number[] = []
  private timeoutIds: number[] = []
  public createInterval(callback: () => void, interval: number): void {
    const id = setInterval(callback, interval)
    this.intervalIds.push(id)
  }

  public createTimeout(callback: () => void, timeout: number) {
    const id = setTimeout(callback, timeout)
    this.timeoutIds.push(id)
  }

  public stopAll(): void {
    this.intervalIds.forEach(id => clearInterval(id))
    this.timeoutIds.forEach(id => clearTimeout(id))
  }
}
