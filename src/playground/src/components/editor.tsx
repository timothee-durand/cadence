import loader from '@monaco-editor/loader';
import {useEffect, useRef} from "react";
import {editor} from "monaco-editor";
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;

const baseValue = `
import A3Piano from "./assets/samples/piano/A3.mp3"
const loop: Loop = {
    sample: A3Piano,
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

async function createEditor(wrapper: HTMLDivElement) {
    const types = await fetchCadenceTypes();
    const monaco = await loader.init();
    const libUri = 'ts:filename/cadence.d.ts';
    monaco.languages.typescript.typescriptDefaults.addExtraLib(types, libUri);
    console.log("set cadence types", types)

    const properties : IStandaloneEditorConstructionOptions = {
        value:baseValue,
        language: 'typescript',
        theme: 'vs-dark',
    };

    monaco.editor.create(wrapper, properties);
}

export function Editor() {
    const elementRef = useRef<HTMLDivElement >(null);
    useEffect(() => {
        if (elementRef.current) {
            createEditor(elementRef.current);
        }
    }, []);

    return (
        <div className={"min-h-screen"} ref={elementRef}></div>
    )
}
