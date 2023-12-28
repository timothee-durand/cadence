import {beforeEach, describe, vi, it, expect} from 'vitest'
import {AudioBufferMock, AudioContextMock, AudioSourceNodeMock} from '../test/utils'
import {LoadedLoop} from './LoadedLoop'
import {Loop} from './types'
import {convertStringToS} from './utils/convertTimeToMs'



vi.stubGlobal('AudioBuffer', AudioBufferMock)
vi.stubGlobal('AudioContext', AudioContextMock)

describe('LoadedLoop', () => {
	let loadedLoop: LoadedLoop
	let audioContext: AudioContext
	let loop : Loop
	beforeEach(() => {
		audioContext = new AudioContextMock()
		loop = {
			sample: 'https://www.example.com',
			startTime: '0s',
			endTime: '1s',
			interval: '1s'
		}
		loadedLoop = new LoadedLoop({
			buffer: new AudioBufferMock({length: 1, sampleRate: 1}),
			loop: loop,
			audioContext
		})
	})

	it('should create buffer source', () => {
		loadedLoop.loop()
		expect(audioContext.createBufferSource).toHaveBeenCalled()
		expect(audioContext.createGain).toHaveBeenCalled()
		expect(loadedLoop.sourceNode?.connect).toHaveBeenCalled()
		expect(loadedLoop.gainNode?.connect).toHaveBeenCalled()
		expect(loadedLoop.sourceNode?.start).toHaveBeenCalled()
	})

	it('should stop buffer source', () => {
		loadedLoop.loop()
		loadedLoop.stop()
		expect(loadedLoop.sourceNode?.stop).toHaveBeenCalled()
	})

	it('should start the loop at the correct time', () => {
		loadedLoop.loop()
		const souceNode = loadedLoop.sourceNode as typeof AudioSourceNodeMock
		const startTime = souceNode.start.mock.calls[0][0]
		expect(startTime).toBe(convertStringToS(loop.startTime as string))
	})

	it('should stop the loop at the correct time', () => {
		loadedLoop.loop()
		const souceNode = loadedLoop.sourceNode as typeof AudioSourceNodeMock
		const stopTime = souceNode.stop.mock.calls[0][0]
		expect(stopTime).toBe(convertStringToS(loop.endTime as string))
	})
})