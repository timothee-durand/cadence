import { SampleDirectory } from '../types'
import As1 from "./As1.mp3"
import As2 from "./As2.mp3"
import As3 from "./As3.mp3"
import As4 from "./As4.mp3"
import Cs1 from "./Cs1.mp3"
import Cs2 from "./Cs2.mp3"
import Cs3 from "./Cs3.mp3"
import Cs4 from "./Cs4.mp3"
import Cs5 from "./Cs5.mp3"
import E1 from "./E1.mp3"
import E2 from "./E2.mp3"
import E3 from "./E3.mp3"
import E4 from "./E4.mp3"
import G1 from "./G1.mp3"
import G2 from "./G2.mp3"
import G3 from "./G3.mp3"
import G4 from "./G4.mp3"

export const directory : SampleDirectory = {
    name: "bass-electric",
    samples: [
        { name: 'As1', path: As1 },
		{ name: 'As2', path: As2 },
		{ name: 'As3', path: As3 },
		{ name: 'As4', path: As4 },
		{ name: 'Cs1', path: Cs1 },
		{ name: 'Cs2', path: Cs2 },
		{ name: 'Cs3', path: Cs3 },
		{ name: 'Cs4', path: Cs4 },
		{ name: 'Cs5', path: Cs5 },
		{ name: 'E1', path: E1 },
		{ name: 'E2', path: E2 },
		{ name: 'E3', path: E3 },
		{ name: 'E4', path: E4 },
		{ name: 'G1', path: G1 },
		{ name: 'G2', path: G2 },
		{ name: 'G3', path: G3 },
		{ name: 'G4', path: G4 }
    ]
}