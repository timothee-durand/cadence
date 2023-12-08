import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CadencePlayer, CadencePlayerRef} from "@/components/player/player.tsx";
import {SampleDirectory} from "@/samplesTypes.ts";
import {Editor, Monaco} from "@monaco-editor/react";
import {sampleDirectories} from "@/assets-list.ts";
import {AddSamplePayload} from "@/components/samplesList/types.ts";


const baseValue = `import type {Loop} from "cadence-js";
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
        noLib: true,
        importsNotUsedAsValues: "remove",
    });
}
type CadenceEditorProps = {};


export type CadenceEditorComponentType = {
    addSampleImport: (payload: AddSamplePayload) => void
} & CadencePlayerRef


export const CadenceEditor = forwardRef<CadenceEditorComponentType, CadenceEditorProps>((_, ref) => {
    const [code, setCode] = useState<string>('')
    const cadencePlayerRef = useRef<CadencePlayerRef>(null);
    useEffect(() => {
        setCode(baseValue)
    }, []);

    useImperativeHandle(ref, () => ({
        addSampleImport({sampleName, directoryName}) {
            setCode('import { ' + sampleName + ' } from "' + directoryName + '";\n' + code);
        },
        play() {
            cadencePlayerRef.current?.play();
        },
        add() {
            cadencePlayerRef.current?.add();
        },
        stop() {
            cadencePlayerRef.current?.stop();
        }
    }));


    return (
        <div >
            <Editor
                theme="vs-dark"
                height="80vh"
                defaultLanguage="typescript"
                beforeMount={createEditor}
                value={code}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}
                onChange={(value) => {
                    setCode(value ?? '')
                }
                }
            />;
            <CadencePlayer ref={cadencePlayerRef} cadenceCode={code}/>
        </div>
    )
})
