import { test, expect } from 'vitest'
import { convertTimeToMs } from './convertTimeToMs'

test('should convert time to milliseconds if it ends with ms', () => {
	const time = '100ms'
	const result = convertTimeToMs(time)
	expect(result).toBe(100)
})

test('should convert time to milliseconds if it ends with s', () => {
	const time = '10s'
	const result = convertTimeToMs(time)
	expect(result).toBe(10000)
})

test('should convert time to milliseconds if it ends with m', () => {
	const time = '10m'
	const result = convertTimeToMs(time)
	expect(result).toBe(600000)
})