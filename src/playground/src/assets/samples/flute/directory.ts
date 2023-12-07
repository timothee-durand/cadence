import { SampleDirectory } from '../types'
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

export const directory : SampleDirectory = {
    name: "flute",
    samples: [
        { name: 'A4', path: A4 },
		{ name: 'A5', path: A5 },
		{ name: 'A6', path: A6 },
		{ name: 'C4', path: C4 },
		{ name: 'C5', path: C5 },
		{ name: 'C6', path: C6 },
		{ name: 'C7', path: C7 },
		{ name: 'E4', path: E4 },
		{ name: 'E5', path: E5 },
		{ name: 'E6', path: E6 }
    ]
}