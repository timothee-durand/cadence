import {FC} from "react";
import {SampleDirectory} from "@/samplesTypes.ts";
import {DirectoryItem} from "@/components/samplesList/sampleDirectory.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import {AddSampleCallback} from "@/components/samplesList/types.ts";

export const AssetsList: FC<{sampleDirectories: SampleDirectory[], onSampleClick: AddSampleCallback}> = ({sampleDirectories, onSampleClick}) => {
    return (
        <Accordion type="single" collapsible className="text-white max-h-[80vh] px-4 overflow-y-scroll">
            {
                sampleDirectories.map((d, i) => (
                    <DirectoryItem directory={d} key={`d-${i}`} onSampleClick={onSampleClick}/>
                ))
            }
        </Accordion>
    )
}