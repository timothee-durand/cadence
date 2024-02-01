import { ExamplesDirectory } from "./examplesTypes";

interface ExamplesTypes {
    codeBase: string;
}

const directory0 : ExamplesDirectory = {
    name: "Example 1",
    examples: [
        {
            codeBase: `import type {Loop} from "cadence-js";
            import {Cadence} from "cadence-js";
            import { B2S } from "808Bass";
            
            const cadence = new Cadence();
            const loop: Loop = {
                startTime: "0s",
                interval: "1s",
                speed: 1,
                sample: B2S,
                endTime: "30s"
            }
            cadence.play(loop)
            `
        }
    ]
}

const directory1 : ExamplesDirectory = {
    name: "Example 2",
    examples: [
        {
            codeBase: `import type {Loop} from "cadence-js";
            import {Cadence} from "cadence-js";
            import { B2S } from "808Bass";
            
            const cadence = new Cadence();
            const loop: Loop = {
                startTime: "0s",
                interval: "1s",
                speed: 1,
                sample: B2S,
                endTime: "30s"
            }
            cadence.play(loop)
            `
        }
    ]
}

export const exampleDirectories : ExamplesDirectory[] = [
    directory0,
    directory1
]
