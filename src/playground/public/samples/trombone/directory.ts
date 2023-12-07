import { SampleDirectory } from '@/samplesTypes.ts'
import As1 from "./As1.mp3"
import As2 from "./As2.mp3"
import As3 from "./As3.mp3"
import C3 from "./C3.mp3"
import C4 from "./C4.mp3"
import Cs2 from "./Cs2.mp3"
import Cs4 from "./Cs4.mp3"
import D3 from "./D3.mp3"
import D4 from "./D4.mp3"
import Ds2 from "./Ds2.mp3"
import Ds3 from "./Ds3.mp3"
import Ds4 from "./Ds4.mp3"
import F2 from "./F2.mp3"
import F3 from "./F3.mp3"
import F4 from "./F4.mp3"
import Gs2 from "./Gs2.mp3"
import Gs3 from "./Gs3.mp3"

export const directory : SampleDirectory = {
    name: "trombone",
    samples: [
        { name: 'As1', path: As1 },
		{ name: 'As2', path: As2 },
		{ name: 'As3', path: As3 },
		{ name: 'C3', path: C3 },
		{ name: 'C4', path: C4 },
		{ name: 'Cs2', path: Cs2 },
		{ name: 'Cs4', path: Cs4 },
		{ name: 'D3', path: D3 },
		{ name: 'D4', path: D4 },
		{ name: 'Ds2', path: Ds2 },
		{ name: 'Ds3', path: Ds3 },
		{ name: 'Ds4', path: Ds4 },
		{ name: 'F2', path: F2 },
		{ name: 'F3', path: F3 },
		{ name: 'F4', path: F4 },
		{ name: 'Gs2', path: Gs2 },
		{ name: 'Gs3', path: Gs3 }
    ]
}