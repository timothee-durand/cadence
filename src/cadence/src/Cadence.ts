import {AbstractCadence, Loop, Song} from './types'
import {AudioLoader} from './AudioLoader'

export class Cadence implements AbstractCadence {
	private song: Song = []
	private loader = new AudioLoader()


	public add(): void {
		throw new Error('Method not implemented.')
	}

	public play(song: Song): void;
	public play(loop: Loop): void;
	public play(): void;
	public async play(song?: Song | Loop): Promise<void> {
		const getIndex = song.startTime.indexOf("s");

		if (song) {
			console.log(getIndex)
			if (getIndex === -1) {
				throw new Error("Only seconds are allowed please insert s.");
			}

			if (Array.isArray(song)) {
				this.song = song
			} else {
				this.song.push(song)
			}
		}

		await this.loader.loadSong(this.song)
		const loops = this.loader.getLoops()
		loops.forEach(loop => loop.loop())
	}

	public stop(): void {
		throw new Error('Method not implemented.')
	}


}