import fs from 'fs/promises'

const BASE_PATH = process.cwd() + '/src/assets/samples';

const directoryTemplate = `import {Sample} from 'cadence-js'

export const {{name}}Directory : Sample[] = [
    {{ listFiles }}
]`

const indexTemplate = 'export { {{name}}Directory } from "./directory"'

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
        return `{ name: "${extractName(file)}", path: "${extractFileName(file)}" }`
    })
}

function fileContent(files, name) {
    const list = fileAsSample(files)
    return directoryTemplate.replace('{{ listFiles }}', list.join(',\n\t')).replace('{{name}}', name)
}

function indexContent(name) {
    return indexTemplate.replace('{{name}}', name)
}

async function main() {
    const directories = await fs.readdir(BASE_PATH)
    console.log(`Generating samples ${BASE_PATH}`)
    for (const directory of directories) {
        const files = await listFiles(`${BASE_PATH}/${directory}`)
        const content = fileContent(files, directory)
        await fs.writeFile(`${BASE_PATH}/${directory}/directory.ts`, content)
        await fs.writeFile(`${BASE_PATH}/${directory}/index.ts`, indexContent(directory))
        console.log(`Generated ${directory}`)
    }
}

main().then(() => {
    console.log('Done')
    process.exit(1)
}).catch((err) => {
    console.error(err)
    process.exit(1)
})