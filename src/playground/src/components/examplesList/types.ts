import { ExamplesDirectory } from "@/examplesTypes";

export type AddExamplePayload = { exampleName: string, directoryName: string };
export type AddExampleCallback = (payload: AddExamplePayload) => void
export interface CompleteExampleDirectory extends ExamplesDirectory {
    formattedName: string
}
