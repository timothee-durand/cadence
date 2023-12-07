import { SampleDirectory } from '@/samplesTypes.ts'
import C5 from "./C5.mp3"
import C6 from "./C6.mp3"
import C7 from "./C7.mp3"
import C8 from "./C8.mp3"
import G4 from "./G4.mp3"
import G5 from "./G5.mp3"
import G6 from "./G6.mp3"
import G7 from "./G7.mp3"

export const directory : SampleDirectory = {
    name: "xylophone",
    samples: [
        { name: 'C5', path: C5 },
		{ name: 'C6', path: C6 },
		{ name: 'C7', path: C7 },
		{ name: 'C8', path: C8 },
		{ name: 'G4', path: G4 },
		{ name: 'G5', path: G5 },
		{ name: 'G6', path: G6 },
		{ name: 'G7', path: G7 }
    ]
}