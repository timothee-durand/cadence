import { SampleDirectory } from '../types'
import A1 from "./A1.mp3"
import A3 from "./A3.mp3"
import C2 from "./C2.mp3"
import C4 from "./C4.mp3"
import D3 from "./D3.mp3"
import D5 from "./D5.mp3"
import Ds2 from "./Ds2.mp3"
import F3 from "./F3.mp3"
import F5 from "./F5.mp3"
import G2 from "./G2.mp3"

export const directory : SampleDirectory = {
    name: "french-horn",
    samples: [
        { name: 'A1', path: A1 },
		{ name: 'A3', path: A3 },
		{ name: 'C2', path: C2 },
		{ name: 'C4', path: C4 },
		{ name: 'D3', path: D3 },
		{ name: 'D5', path: D5 },
		{ name: 'Ds2', path: Ds2 },
		{ name: 'F3', path: F3 },
		{ name: 'F5', path: F5 },
		{ name: 'G2', path: G2 }
    ]
}