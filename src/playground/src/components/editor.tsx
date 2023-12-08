import {FC, useEffect, useState} from "react";
import {CadencePlayer} from "@/components/player.tsx";
import {SampleDirectory} from "@/samplesTypes.ts";
import {Editor, Monaco} from "@monaco-editor/react";
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


export const CadenceEditor: FC<{mustPlay:boolean}> = ({mustPlay}) => {
    const [code, setCode] = useState<string>('')

    useEffect(() => {
        setCode(baseValue)
    }, []);


    return (
        <div className={"min-h-screen"}>
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
        </div>
    )
}
