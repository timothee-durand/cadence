import { SampleDirectory } from '@/samplesTypes.ts'
import B1S from "./B1S.mp3"
import B2S from "./B2S.mp3"

export const directory : SampleDirectory = {
    name: "808Bass",
    samples: [
        { name: 'B1S', path: B1S },
		{ name: 'B2S', path: B2S }
    ]
}