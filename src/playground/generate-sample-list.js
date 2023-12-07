import fs from 'fs/promises'

const BASE_PATH = process.cwd() + '/src/assets/samples';

const directoryTemplate = `import { SampleDirectory } from '../types'
{{ fileImports }}

export const directory : SampleDirectory = {
    name: "{{name}}",
    samples: [
        {{ listFiles }}
    ]
}`

const indexTemplate = 'export { directory } from "./directory"'

async function listFiles(directory) {
    const files = await fs.readdir(directory)
    const result = []
    for (const file of files) {
        if (!file.endsWith(".mp3")) continue
        const path = `${directory}/${file}`
        result.push(path)
    }
    return result
}

function extractName(path) {
    const parts = path.split('/')
    const name = parts[parts.length - 1]
    return name.replace('.mp3', '')
}

function extractFileName(path) {
    const parts = path.split('/')
    const name = parts[parts.length - 1]
    return `./${name}`
}

function fileAsSample(files) {
    return files.map(file => {
        let fileName = extractName(file);
        return `{ name: '${fileName}', path: ${fileName} }`
    })
}

function fileAsImport(files) {
    return files.map(file => {
        return `import ${extractName(file)} from "${extractFileName(file)}"`
    })

}

function fileContent(files, name) {
    const list = fileAsSample(files).join(',\n\t\t')
    const imports = fileAsImport(files).join('\n')
    return directoryTemplate.replace('{{ listFiles }}', list).replace('{{ fileImports }}', imports).replace(/\{\{name}}/g, name).replace('{{directoryName}}', name)
}


function globalIndexContent(directories) {
    const imports = directories.map((dir, i) => `import { directory as directory${i} } from './${dir}'`).join('\n')
    const exports = directories.map((_, i) => `directory${i}`).join(',\n\t')
    return `${imports}\n\nexport const sampleDirectories = [\n\t${exports}\n]`
}

async function main() {
    const directories = (await fs.readdir(BASE_PATH)).filter(dir => !dir.endsWith(".ts"))
    console.log(`Generating samples ${BASE_PATH}`)
    for (const directory of directories) {
        const files = await listFiles(`${BASE_PATH}/${directory}`)
        const content = fileContent(files, directory)
        await fs.writeFile(`${BASE_PATH}/${directory}/directory.ts`, content)
        await fs.writeFile(`${BASE_PATH}/${directory}/index.ts`, indexTemplate)
        console.log(`Generated ${directory}`)
    }
    await fs.writeFile(`${BASE_PATH}/index.ts`, globalIndexContent(directories))

}

main().then(() => {
    console.log('Done')
    process.exit(1)
}).catch((err) => {
    console.error(err)
    process.exit(1)
})