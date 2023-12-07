import { SampleDirectory } from '@/samplesTypes.ts'
import A3 from "./A3.mp3"
import A4 from "./A4.mp3"
import A5 from "./A5.mp3"
import A6 from "./A6.mp3"
import C4 from "./C4.mp3"
import C5 from "./C5.mp3"
import C6 from "./C6.mp3"
import C7 from "./C7.mp3"
import E4 from "./E4.mp3"
import E5 from "./E5.mp3"
import E6 from "./E6.mp3"
import G3 from "./G3.mp3"
import G4 from "./G4.mp3"
import G5 from "./G5.mp3"
import G6 from "./G6.mp3"

export const directory : SampleDirectory = {
    name: "violin",
    samples: [
        { name: 'A3', path: A3 },
		{ name: 'A4', path: A4 },
		{ name: 'A5', path: A5 },
		{ name: 'A6', path: A6 },
		{ name: 'C4', path: C4 },
		{ name: 'C5', path: C5 },
		{ name: 'C6', path: C6 },
		{ name: 'C7', path: C7 },
		{ name: 'E4', path: E4 },
		{ name: 'E5', path: E5 },
		{ name: 'E6', path: E6 },
		{ name: 'G3', path: G3 },
		{ name: 'G4', path: G4 },
		{ name: 'G5', path: G5 },
		{ name: 'G6', path: G6 }
    ]
}