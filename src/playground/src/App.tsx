import './index.css'
import {Button} from "@/components/ui/button"
import Editor, {Monaco} from '@monaco-editor/react';
import {SampleDirectory} from "@/assets/samples/types.ts";
import {sampleDirectories} from "@/assets/samples";

const baseValue = `
import {Loop} from "types";
const loop: Loop = {
    interval: "1s",
    speed: 1
}

export default loop
`


async function fetchCadenceTypes (): Promise<string> {
    try {
        const types = await fetch('cadence.d.ts').then((res) => res.text());
        return types
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
    console.log("types", types)
    // const libUri = 'ts:filename/cadence.d.ts';
    const samplesDeclaration = makeDeclarationFile(sampleDirectories);
    console.log("samplesDeclaration", samplesDeclaration)
    monaco.languages.typescript.typescriptDefaults.addExtraLib(types, "cadence-js");
    monaco.languages.typescript.typescriptDefaults.addExtraLib(samplesDeclaration, "samples");
    console.log("cadence types")
    console.log( monaco.languages.typescript.typescriptDefaults.getExtraLibs())
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        allowNonTsExtensions: true,
        noLib: true
    });
}


function App() {

    return (
        <>
            <div className="bg-slate-800">
                <div className="flex justify-center">
                    <Button variant="outline">Play</Button>
                    <Button variant="outline">Stop</Button>
                </div>
            </div>
            <div>Export default the loop that you want</div>
            <Editor
                width="500px"
                height="500px"
                theme="vs-dark"
                defaultLanguage="typescript"
                beforeMount={createEditor}
                defaultValue={baseValue}
            />;
        </>
    )
}

export default App
