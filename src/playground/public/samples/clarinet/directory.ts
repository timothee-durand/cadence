import { SampleDirectory } from '@/samplesTypes.ts'
import As3 from "./As3.mp3"
import As4 from "./As4.mp3"
import As5 from "./As5.mp3"
import D3 from "./D3.mp3"
import D4 from "./D4.mp3"
import D5 from "./D5.mp3"
import D6 from "./D6.mp3"
import F3 from "./F3.mp3"
import F4 from "./F4.mp3"
import F5 from "./F5.mp3"
import Fs6 from "./Fs6.mp3"

export const directory : SampleDirectory = {
    name: "clarinet",
    samples: [
        { name: 'As3', path: As3 },
		{ name: 'As4', path: As4 },
		{ name: 'As5', path: As5 },
		{ name: 'D3', path: D3 },
		{ name: 'D4', path: D4 },
		{ name: 'D5', path: D5 },
		{ name: 'D6', path: D6 },
		{ name: 'F3', path: F3 },
		{ name: 'F4', path: F4 },
		{ name: 'F5', path: F5 },
		{ name: 'Fs6', path: Fs6 }
    ]
}