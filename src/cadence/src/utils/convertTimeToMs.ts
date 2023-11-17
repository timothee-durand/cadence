import {Time} from '../types'

export function convertTimeToMs(time: Time) : number {
	if(time.endsWith('ms')) {
		return parseInt(time.slice(0, -2))
	}
	if(time.endsWith('s')) {
		return parseInt(time.slice(0, -1)) * 1000
	}
	if(time.endsWith('m')) {
		return parseInt(time.slice(0, -1)) * 1000 * 60
	}
	throw new Error('Invalid time format')
}