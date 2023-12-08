import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import initSwc, {transformSync} from "@swc/wasm-web";
import {sampleDirectories} from "@/assets-list.ts";
import {transformImports} from "./transformImports.ts";


type CadencePlayerProps = {
    cadenceCode: string
}

export type CadencePlayerRef = {
    play(): void,
    add(): void,
    stop(): void
}

type Script = { element: HTMLScriptElement, globalVariableName: string };
export const CadencePlayer = forwardRef<CadencePlayerRef, CadencePlayerProps>(({cadenceCode}, ref) => {
    const [initialized, setInitialized] = useState(false);
    const [scripts, setScripts] = useState<Script[]>([]);


    function getScript(code: string): Script {
        const script = document.createElement('script');

        const variableName = `cadence${Math.random().toString(36).substring(7)}`;
        script.type = 'module';
        script.innerHTML = code + `\nwindow.${variableName} = cadence;`;
        script.async = true;
        return {
            element: script,
            globalVariableName: variableName
        }
    }

    useImperativeHandle(ref, () => ({
        play() {
            stopAll();
            const result = compile();
            if (!result) {
                throw new Error('Could not compile')
            }
            const script = getScript(result);
            document.body.appendChild(script.element);
            setScripts([script])
        },
        add() {
            const result = compile();
            if (!result) {
                throw new Error('Could not compile')
            }
            const script = getScript(result);
            document.body.appendChild(script.element);
            setScripts([...scripts, script])
        },
        stop() {
            stopAll();
        }
    }));

    function stopAll() {
        scripts.forEach((script) => {
            document.body.removeChild(script.element);
            // @ts-ignore
            const global = window[script.globalVariableName]
            if(global && global.stop) {
                // @ts-ignore
                global.stop();
                // @ts-ignore
                window[script.globalVariableName] = undefined;
            }
        })
        setScripts([])
    }

    function compile() {
        if (!initialized) {
            return;
        }
        const assetsImports = transformImports(cadenceCode, sampleDirectories);
        const result = transformSync(assetsImports.code, {
            jsc: {
                parser: {
                    syntax: "typescript",

                },
                target: "es2020"
            }
        });
        return `import {${assetsImports.cadenceImports}} from "./cadence.js";\n${result.code}`
    }

    useEffect(() => {
        async function importAndRunSwcOnMount() {
            try {
                await initSwc();
                setInitialized(true);

            } catch (e) {
                console.error(e);
            }
        }

        importAndRunSwcOnMount();

        return () => {
            stopAll();
        }
    }, []);


    return <div/>
})