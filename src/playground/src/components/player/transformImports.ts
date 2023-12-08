import {SampleDirectory} from "@/samplesTypes.ts";

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

export function transformImports(code: string, samples: SampleDirectory[]): { code: string, cadenceImports: string } {
    let newCode = code;
    let imports = getImports(code);
    console.log(samples)
    console.log(imports)
    let cadenceImports = '';
    imports.forEach((importStatement) => {
        if (importStatement.path === 'cadence-js') {
            cadenceImports = importStatement.name
        }
        const imports = importStatement.name.split(',').map((name) => name.trim())
        console.log(imports)
        imports.forEach((name) => {
            console.log(name)
            const samplePath = getSamplePath({
                name: name,
                directory: importStatement.path,
                samples
            })
            newCode = newCode.replace(importStatement.originalImport, '')
            console.log(samplePath)

            if (samplePath) {
                newCode = newCode.replace(new RegExp(`${name}`, 'g'), `".${samplePath}"`)
            }
        })

    })
    return {
        code: newCode,
        cadenceImports
    }
}