import { SampleDirectory } from '@/samplesTypes.ts'
import A2 from "./A2.mp3"
import A3 from "./A3.mp3"
import A4 from "./A4.mp3"
import A5 from "./A5.mp3"
import C3 from "./C3.mp3"
import C4 from "./C4.mp3"
import C5 from "./C5.mp3"
import C6 from "./C6.mp3"
import Cs2 from "./Cs2.mp3"
import Ds3 from "./Ds3.mp3"
import Ds4 from "./Ds4.mp3"
import Ds5 from "./Ds5.mp3"
import E2 from "./E2.mp3"
import Fs2 from "./Fs2.mp3"
import Fs3 from "./Fs3.mp3"
import Fs4 from "./Fs4.mp3"
import Fs5 from "./Fs5.mp3"

export const directory : SampleDirectory = {
    name: "guitar-electric",
    samples: [
        { name: 'A2', path: A2 },
		{ name: 'A3', path: A3 },
		{ name: 'A4', path: A4 },
		{ name: 'A5', path: A5 },
		{ name: 'C3', path: C3 },
		{ name: 'C4', path: C4 },
		{ name: 'C5', path: C5 },
		{ name: 'C6', path: C6 },
		{ name: 'Cs2', path: Cs2 },
		{ name: 'Ds3', path: Ds3 },
		{ name: 'Ds4', path: Ds4 },
		{ name: 'Ds5', path: Ds5 },
		{ name: 'E2', path: E2 },
		{ name: 'Fs2', path: Fs2 },
		{ name: 'Fs3', path: Fs3 },
		{ name: 'Fs4', path: Fs4 },
		{ name: 'Fs5', path: Fs5 }
    ]
}