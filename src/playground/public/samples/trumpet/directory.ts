import { SampleDirectory } from '@/samplesTypes.ts'
import A3 from "./A3.mp3"
import A5 from "./A5.mp3"
import As4 from "./As4.mp3"
import C4 from "./C4.mp3"
import C6 from "./C6.mp3"
import D5 from "./D5.mp3"
import Ds4 from "./Ds4.mp3"
import F3 from "./F3.mp3"
import F4 from "./F4.mp3"
import F5 from "./F5.mp3"
import G4 from "./G4.mp3"

export const directory : SampleDirectory = {
    name: "trumpet",
    samples: [
        { name: 'A3', path: A3 },
		{ name: 'A5', path: A5 },
		{ name: 'As4', path: As4 },
		{ name: 'C4', path: C4 },
		{ name: 'C6', path: C6 },
		{ name: 'D5', path: D5 },
		{ name: 'Ds4', path: Ds4 },
		{ name: 'F3', path: F3 },
		{ name: 'F4', path: F4 },
		{ name: 'F5', path: F5 },
		{ name: 'G4', path: G4 }
    ]
}