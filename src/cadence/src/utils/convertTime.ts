export function convertTimeToMs(time: string): number {
  if (time.endsWith('ms')) {
    return parseInt(time.slice(0, -2))
  }
  if (time.endsWith('s')) {
    return parseInt(time.slice(0, -1)) * 1000
  }
  if (time.endsWith('m')) {
    return parseInt(time.slice(0, -1)) * 1000 * 60
  }
  throw new Error('Invalid time format')
}

export function convertTimeToS(time: string): number {
  if (time.endsWith('s')) {
    return parseInt(time.slice(0, -1))
  }
  if (time.endsWith('m')) {
    return parseInt(time.slice(0, -1)) * 60
  }
  if (time.endsWith('ms')) {
    return parseInt(time.slice(0, -2)) / 1000
  }
  throw new Error('Invalid time format')
}
