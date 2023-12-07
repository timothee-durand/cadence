import { SampleDirectory } from '../types'
import As1 from "./As1.mp3"
import As2 from "./As2.mp3"
import As3 from "./As3.mp3"
import D3 from "./D3.mp3"
import D4 from "./D4.mp3"
import Ds2 from "./Ds2.mp3"
import F1 from "./F1.mp3"
import F2 from "./F2.mp3"
import F3 from "./F3.mp3"

export const directory : SampleDirectory = {
    name: "tuba",
    samples: [
        { name: 'As1', path: As1 },
		{ name: 'As2', path: As2 },
		{ name: 'As3', path: As3 },
		{ name: 'D3', path: D3 },
		{ name: 'D4', path: D4 },
		{ name: 'Ds2', path: Ds2 },
		{ name: 'F1', path: F1 },
		{ name: 'F2', path: F2 },
		{ name: 'F3', path: F3 }
    ]
}