import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CadencePlayer, CadencePlayerRef} from "@/components/player/player.tsx";
import {SampleDirectory} from "@/samplesTypes.ts";
import {Editor, Monaco} from "@monaco-editor/react";
import {sampleDirectories} from "@/assets-list.ts";
import {AddSamplePayload} from "@/components/samplesList/types.ts";


const baseValue = `

import { initCadence, loadSample, loop, wait } from "cadence-js";

async function main() {
    /** OUR CODE --- DON'T EDIT IT PLEASE */
    const { playSample, stopAll } = await initCadence();
    /** YOUR CODE */

    const g2 = await loadSample("/samples/cello//G2.mp3");
    const a2 = await loadSample("/samples/cello//As2.mp3");
    const c2 = await loadSample("/samples/cello//C2.mp3");
    const b2 = await loadSample("/samples/cello//B2.mp3");

    const shortG2 = playSample(g2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
    const shortA2 = playSample(a2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
    const shortC2 = playSample(c2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
    const shortB2 = playSample(b2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
  
    shortG2.start();
    await wait(1000);
    shortG2.start();
    await wait(1000);
    shortA2.start();
    await wait(1000);
    shortC2.start();
    await wait(1000);
    shortB2.start();
    await wait(1000)

    stopAll()
}
main();

`


async function fetchCadenceTypes(): Promise<string> {
    try {
        const types = await fetch('cadence.d.ts').then((res) => res.text());
        return types.replace("declare module \"cadence2/index\"", 'declare module "cadence-js"')
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
        importsNotUsedAsValues: "remove",
        lib: ["es2018", "dom"],
    });
    console.log(monaco.languages.typescript.typescriptDefaults.getCompilerOptions())
}

type CadenceEditorProps = {
    className?: string
};


export type CadenceEditorComponentType = {
    addSampleImport: (payload: AddSamplePayload) => void
} & CadencePlayerRef


export const CadenceEditor = forwardRef<CadenceEditorComponentType, CadenceEditorProps>(({className}, ref) => {
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
        <div className={className}>
            <Editor
                className="rounded-md"
                theme="vs-dark"
                height="70vh"
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
            />
            <CadencePlayer ref={cadencePlayerRef} cadenceCode={code}/>
        </div>
    )
})
