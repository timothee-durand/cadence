import { Loop, Time} from './types'
import {convertTimeToMs} from './utils/convertTimeToMs'

export class LoadedLoop {
	sample: string
	private speed = 1
	private startTime: Time = '0ms'
	private volume = 1
	private buffer: AudioBuffer

	constructor(buffer: AudioBuffer, loop: Loop) {
		this.buffer = buffer
		this.sample = loop.sample
		if (loop.speed) this.speed = loop.speed
		if (loop.volume) this.volume = loop.volume
		if (loop.startTime) this.startTime = loop.startTime
	}

	public loop(): void {
		const audioContext = new AudioContext()
		const source = audioContext.createBufferSource()
		source.buffer = this.buffer
		source.loop = true
		source.playbackRate.value = this.speed
		const gainNode = audioContext.createGain()
		gainNode.gain.value = this.volume
		source.connect(gainNode)
		gainNode.connect(audioContext.destination)
		source.start(audioContext.currentTime, this.startTimeMs)
	}

	private get startTimeMs(): number {
		const startTime = convertTimeToMs(this.startTime)
		return startTime
	}

	get samplePath(): string {
		return this.sample
	}

}