import {FC} from "react";
import {SampleDirectory} from "@/samplesTypes.ts";
import {DirectoryItem} from "@/components/samplesList/sampleDirectory.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import {AddSampleCallback} from "@/components/samplesList/types.ts";
import { ScrollArea } from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils.ts";


export const AssetsList: FC<{
    sampleDirectories: SampleDirectory[],
    onSampleClick: AddSampleCallback,
    className?: string
}> = ({sampleDirectories, onSampleClick, className}) => {
    return (
        <div className={cn('h-editor flex flex-col', className)}>
            <h3 className="mb-2 scroll-m-20 text-center text-xl font-bold tracking-tight">
                Test samples
            </h3>
            <ScrollArea className="grow ">
                <Accordion type="single" collapsible className="px-4">
                    {
                        sampleDirectories.map((d, i) => (
                            <DirectoryItem directory={d} key={`d-${i}`} onSampleClick={onSampleClick}/>
                        ))
                    }
                </Accordion>
            </ScrollArea>
        </div>

    )
}