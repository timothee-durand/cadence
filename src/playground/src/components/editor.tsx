import {forwardRef, useEffect, useImperativeHandle, useRef, useState} from "react";
import {CadencePlayer, CadencePlayerRef} from "@/components/player/player.tsx";
import {SampleDirectory} from "@/samplesTypes.ts";
import {Editor, Monaco} from "@monaco-editor/react";
import {sampleDirectories} from "@/assets-list.ts";
import {getSamplePath} from "@/components/samplesList/utils.ts";


const baseValue = `



import { initCadence, loadSample, loop, wait } from "cadence-js";

async function main() {
    const { playSample, stopAll } = await initCadence();

    const g2 = await loadSample("/samples/cello/G2.mp3");
    const a2 = await loadSample("/samples/cello/As2.mp3");
    const c2 = await loadSample("/samples/cello/C2.mp3");
    const b2 = await loadSample("/samples/cello/B2.mp3");

    const shortG2 = playSample(g2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
    const shortA2 = playSample(a2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
    const shortC2 = playSample(c2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
    const shortB2 = playSample(b2).withEffect({name : 'fadeOut', startTime: '300ms', duration: "300ms"})
  
    shortG2.start();
    await wait(600);
    shortG2.start();
    await wait(600);
    shortA2.start();
    await wait(600);
    shortC2.start();
    await wait(600);
    shortB2.start();
    await wait(600)
    shortA2.start();
    await wait(600);

    stopAll()
}
main();



`


async function fetchCadenceTypes(): Promise<string> {
    try {
        const types = await fetch('cadence.d.ts').then((res) => res.text());
        const declarationFile = makeDeclarationFile(sampleDirectories);
        return types.replace("declare module \"index\"", 'declare module "cadence-js"').replace('export function loadSample(path: string,', `${declarationFile}\nexport function loadSample(path: SamplePaths | string,`)
    } catch (e) {
        console.error(e);
        return ''
    }

}

function makeDeclarationFile(sampleDirectories: SampleDirectory[]): string {
    const paths = sampleDirectories.map((directory) => {
        return directory.samples.map((sample) => {
            return getSamplePath(directory, sample)
        })
    }).flat().join(' | ');

    return 'type SamplePaths = ' + paths + ';'
}

async function createEditor(monaco: Monaco) {
    const types = await fetchCadenceTypes();
    monaco.languages.typescript.typescriptDefaults.addExtraLib(types, "cadence-js");
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


export type CadenceEditorComponentType =  CadencePlayerRef


export const CadenceEditor = forwardRef<CadenceEditorComponentType, CadenceEditorProps>(({className}, ref) => {
    const [code, setCode] = useState<string>('')
    const cadencePlayerRef = useRef<CadencePlayerRef>(null);
    useEffect(() => {
        setCode(baseValue)
    }, []);

    useImperativeHandle(ref, () => ({
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
