export async function loadSample(path: string, audioContext: AudioContext = new AudioContext()): Promise<AudioBuffer> {
  const response = await fetch(path)
  const arrayBuffer = await response.arrayBuffer()
  return await audioContext.decodeAudioData(arrayBuffer)
}
