import {FC, useEffect, useState} from "react";
import initSwc, {transformSync} from "@swc/wasm-web";
import {SampleDirectory} from "../samplesTypes.ts";
import {sampleDirectories} from "@/assets-list.ts";

const importRegex = /import\s{(?<importName>[\w\d,\s]+)}\sfrom\s["'](?<importPath>[\w-]+)["'];?/gm;

type ParsedImport = { name: string, path: string, originalImport: string };

function getImports(code: string): ParsedImport[] {
    let m: RegExpMatchArray | null;
    let imports: ParsedImport[] = []
    while ((m = importRegex.exec(code)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === importRegex.lastIndex) {
            importRegex.lastIndex++;
        }
        if (m && m.groups && m.groups.importPath && m.groups.importName) {
            imports.push({
                name: m.groups.importName,
                path: m.groups.importPath,
                originalImport: m[0]
            })
        }
    }
    return imports;

}

function getSamplePath({name, directory, samples}: {
    name: string,
    directory: string,
    samples: SampleDirectory[]
}): string | null {
    const sampleDirectory = samples.find((d) => {
        return d.name === directory
    });
    if (!sampleDirectory) {
        return null;
    }
    const sample = sampleDirectory.samples.find((sample) => sample.name === name);
    if (!sample) {
        return null;
    }
    return sample.path

}

function transformImports(code: string, samples: SampleDirectory[]): {code : string, cadenceImports: string} {
    let newCode = code;
    let imports = getImports(code);
    console.log(samples)
    console.log(imports)
    let cadenceImports = '';
    imports.forEach((importStatement) => {
        if(importStatement.path === 'cadence-js') {
            cadenceImports = importStatement.name
        }
        const samplePath = getSamplePath({
            name: importStatement.name,
            directory: importStatement.path,
            samples
        })
        newCode = newCode.replace(importStatement.originalImport, '')

        if (samplePath) {
            newCode = newCode.replace(new RegExp(`${importStatement.name}`, 'g'), `"${samplePath}"`)
        }
    })
    return {
        code: newCode,
        cadenceImports
    }
}

export const CadencePlayer: FC<{
    cadenceCode: string,
    mustPlay: boolean
}> = ({cadenceCode, mustPlay}) => {
    const [iframe, setIframe] = useState<string>('')
    const [initialized, setInitialized] = useState(false);

    function compile() {
        if (!initialized) {
            return;
        }
        const assetsImports = transformImports(cadenceCode, sampleDirectories);
        console.log(assetsImports)
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
        const result = compile();
        if (!result || !mustPlay) {
            return;
        }
        setIframe(result)
        const script = document.createElement('script');

        script.type = 'module';
        script.innerHTML = result;
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [mustPlay]);

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
        console.log(sampleDirectories)
    }, []);


    if (cadenceCode.length === 0 || !mustPlay) {
        return <div/>
    }


    return (
        <script type="module">
            console.log("hello")
            {iframe}
        </script>
    )
}