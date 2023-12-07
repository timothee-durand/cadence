import './index.css'
import {Button} from "@/components/ui/button"
import Editor, {Monaco} from '@monaco-editor/react';
import {SampleDirectory} from "./samplesTypes.ts";
import {CadencePlayer} from "@/components/player.tsx";
import {useEffect, useState} from "react";
import {sampleDirectories} from "@/assets-list.ts";

const baseValue = `
import type {Loop} from "cadence-js";
import {Cadence} from "cadence-js";
import {E2} from "guitar-nylon";

const cadence = new Cadence();
const loop: Loop = {
    interval: "1s",
    speed: 1,
    sample: E2
}
cadence.play(loop)
`


async function fetchCadenceTypes(): Promise<string> {
    try {
        const types = await fetch('cadence.d.ts').then((res) => res.text());
        return types.replace("declare module \"index\"", 'declare module "cadence-js"')
    } catch (e) {
        console.error(e);
        return ''
    }

}

function makeDeclarationFile(sampleDirectories: SampleDirectory[]): string {
    let declarationFile = '';

    sampleDirectories.forEach((directory) => {
        declarationFile += `declare module "${directory.name}" {\n`;
        directory.samples.forEach((sample) => {
            declarationFile += `export const ${sample.name}: Loop;\n`;
        });
        declarationFile += `}\n`;
    })


    return declarationFile
}

async function createEditor(monaco: Monaco) {
    const types = await fetchCadenceTypes();
    const samplesDeclaration = makeDeclarationFile(sampleDirectories);
    monaco.languages.typescript.typescriptDefaults.addExtraLib(types, "cadence-js");
    monaco.languages.typescript.typescriptDefaults.addExtraLib(samplesDeclaration, "samples");
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        noLib: true
    });
}


function App() {
    const [code, setCode] = useState<string>('')
    const [mustPlay, setMustPlay] = useState<boolean>(false)

    useEffect(() => {
        setCode(baseValue)
    }, []);

    return (
        <>
            <div className="bg-slate-800">
                <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setMustPlay(true)}>Play</Button>
                    <Button variant="outline" onClick={()=> setMustPlay(false)}>Stop</Button>
                </div>
            </div>
            <div>Export default the loop that you want</div>
            <Editor
                width="500px"
                height="500px"
                theme="vs-dark"
                defaultLanguage="typescript"
                beforeMount={createEditor}
                defaultValue={code}
                onChange={(value) => {
                    setCode(value ?? '')
                }
                }
            />;
            <CadencePlayer cadenceCode={code} mustPlay={mustPlay}/>
        </>
    )
}

export default App
