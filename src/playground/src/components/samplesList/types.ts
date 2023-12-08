export type AddSamplePayload = { sampleName: string, directoryName: string };
export type AddSampleCallback = (payload: AddSamplePayload) => void