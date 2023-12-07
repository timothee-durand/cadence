import { SampleDirectory } from '../types'
import A2 from "./A2.mp3"
import A3 from "./A3.mp3"
import A4 from "./A4.mp3"
import C4 from "./C4.mp3"
import C5 from "./C5.mp3"
import G2 from "./G2.mp3"
import G3 from "./G3.mp3"
import G4 from "./G4.mp3"

export const directory : SampleDirectory = {
    name: "bassoon",
    samples: [
        { name: 'A2', path: A2 },
		{ name: 'A3', path: A3 },
		{ name: 'A4', path: A4 },
		{ name: 'C4', path: C4 },
		{ name: 'C5', path: C5 },
		{ name: 'G2', path: G2 },
		{ name: 'G3', path: G3 },
		{ name: 'G4', path: G4 }
    ]
}