import {SampleDirectory, SamplesTypes} from "@/samplesTypes.ts";

export function getSamplePath(directory: SampleDirectory, sample: SamplesTypes): string {
  return `/samples/${directory.name}/${sample.name}.mp3`
}

export async function copySamplePathToClipboard(directory: SampleDirectory, sample: SamplesTypes) {
    try {
        const path = getSamplePath(directory, sample);
        await navigator.clipboard.writeText(`const ${sample.name} = await loadSample("${path}")`);
        console.log('Page URL copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}