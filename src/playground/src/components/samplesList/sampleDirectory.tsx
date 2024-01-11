import {FC} from "react";
import {SampleItem} from "@/components/samplesList/sampleItem.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {AddSampleCallback, CompleteSampleDirectory} from "@/components/samplesList/types.ts";

export const DirectoryItem: FC<{ directory: CompleteSampleDirectory, onSampleClick: AddSampleCallback }> = ({directory, onSampleClick}) => {
    return (
        <AccordionItem value={`directory-${directory.name}`} className="w-full">
            <AccordionTrigger className="font-bold">
                {directory.formattedName}
            </AccordionTrigger>
            <AccordionContent>
                {directory.samples.map((s, i) => <SampleItem instrument={directory.formattedName} sample={s} key={`s-${i}`} onClick={() => onSampleClick({sampleName: s.name, directoryName: directory.name})}/>)}
            </AccordionContent>
        </AccordionItem>
    )
}