export async function loadSample(path: string): Promise<AudioBuffer> {
  const response = await fetch(path)
  const arrayBuffer = await response.arrayBuffer()
  const audioContext = new AudioContext()
  return await audioContext.decodeAudioData(arrayBuffer)
}
