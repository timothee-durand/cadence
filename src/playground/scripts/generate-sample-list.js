import fs from 'fs/promises'

const BASE_PATH = process.cwd() + '/public/samples';

const directoryTemplate = `
const directory{{index}} : SampleDirectory = {
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
    return name.replace('.mp3', '').split(' ').join('_')
}

function extractFileName(path) {
    const parts = path.split('/')
    const name = parts[parts.length - 1]
    return `/${name}`
}

function fileAsSample(files, directory) {
    return files.map(file => {
        let fileName = extractName(file);
        let filePath = extractFileName(file);
        return `{ name: '${directory} - ${fileName}', path: "/samples/${directory}/${filePath}" }`
    })
}

function fileContent(files, name, index) {
    const list = fileAsSample(files, name).join(',\n\t\t')
    return directoryTemplate.replace('{{ listFiles }}', list).replace(/\{\{name}}/g, name).replace('{{directoryName}}', name).replace('{{index}}', index)
}


function globalIndexContent(directories) {
    const exports = directories.map((_, i) => `directory${i}`).join(',\n\t')
    return `export const sampleDirectories : SampleDirectory[] = [\n\t${exports}\n]`
}

async function main() {
    const directories = (await fs.readdir(BASE_PATH)).filter(dir => !dir.endsWith(".ts"))
    console.log(`Generating samples ${BASE_PATH}`)
    let globalIndex = 'import { SampleDirectory } from \'./samplesTypes\'\n'
    let i = 0
    for (const directory of directories) {
        const files = await listFiles(`${BASE_PATH}/${directory}`)
        const content = fileContent(files, directory, i)
        globalIndex += content + '\n'
        console.log(`Generated ${directory}`)
        i++
    }
    await fs.writeFile(`./src/assets-list.ts`, globalIndex +  globalIndexContent(directories))

}

main().then(() => {
    console.log('Done')
    process.exit(1)
}).catch((err) => {
    console.error(err)
    process.exit(1)
})