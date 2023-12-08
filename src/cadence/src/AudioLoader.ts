import { Loop, Song} from './types'
import {LoadedLoop} from './LoadedLoop'

export class AudioLoader {
	private loadedLoop: LoadedLoop[] = []

	public async loadSong(song: Song): Promise<void> {
		song.forEach(loop => {
			const getIndexStartTime = loop?.startTime?.indexOf('s');
			const getIndexEndTime   = loop?.endTime?.indexOf('s');

				if(getIndexStartTime === -1 || getIndexEndTime === -1) {
					throw new Error("Only seconds are allowed please insert s.");
				}
		});
		const promises = song.map(loop => this.loadLoop(loop))
		await Promise.all(promises)
	}

	private getLoadedLoop(samplePath: string): LoadedLoop | undefined {
		const loadedSample = this.loadedLoop.find(sample => sample.samplePath === samplePath)
		if (!loadedSample) {
			return undefined
		}
		return loadedSample
	}

	public getLoops(): LoadedLoop[] {
		return this.loadedLoop
	}

	private async loadLoop(loop: Loop): Promise<void> {
		const loadedSample = this.getLoadedLoop(loop.sample)
		if (loadedSample) {
			return
		}
		const response = await fetch(loop.sample)
		const arrayBuffer = await response.arrayBuffer()
		const sample = await this.decodeAudioData(arrayBuffer)
		this.loadedLoop.push(new LoadedLoop(sample, loop))
	}

	private async decodeAudioData(arrayBuffer: ArrayBuffer): Promise<AudioBuffer> {
		const audioContext = new AudioContext()
		const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
		return audioBuffer
	}
}