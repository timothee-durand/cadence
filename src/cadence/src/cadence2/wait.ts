export function wait(duration: number): Promise<void> {
  return new Promise((resolve: () => void) => {
    setTimeout(resolve, duration)
  })
}
