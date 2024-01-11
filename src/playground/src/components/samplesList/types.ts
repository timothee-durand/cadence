import {SampleDirectory} from "@/samplesTypes.ts";

export type AddSamplePayload = { sampleName: string, directoryName: string };
export type AddSampleCallback = (payload: AddSamplePayload) => void
export interface CompleteSampleDirectory extends SampleDirectory {
    formattedName: string
}
