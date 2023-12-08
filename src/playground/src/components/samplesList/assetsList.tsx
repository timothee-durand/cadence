import {FC} from "react";
import {SampleDirectory} from "@/samplesTypes.ts";
import {DirectoryItem} from "@/components/samplesList/sampleDirectory.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import {AddSampleCallback} from "@/components/samplesList/types.ts";
import { ScrollArea } from "@/components/ui/scroll-area"


export const AssetsList: FC<{
    sampleDirectories: SampleDirectory[],
    onSampleClick: AddSampleCallback
}> = ({sampleDirectories, onSampleClick}) => {
    return (
        <ScrollArea className="h-editor">
            <Accordion type="single" collapsible className="  px-4">
                {
                    sampleDirectories.map((d, i) => (
                        <DirectoryItem directory={d} key={`d-${i}`} onSampleClick={onSampleClick}/>
                    ))
                }
            </Accordion>
        </ScrollArea>
    )
}