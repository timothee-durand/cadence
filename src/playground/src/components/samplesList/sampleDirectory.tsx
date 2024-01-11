import {FC} from "react";
import {SampleDirectory} from "@/samplesTypes.ts";
import {SampleItem} from "@/components/samplesList/sampleItem.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import {AddSampleCallback} from "@/components/samplesList/types.ts";

export const DirectoryItem: FC<{ directory: SampleDirectory, onSampleClick: AddSampleCallback }> = ({directory, onSampleClick}) => {
    const formattedName = directory.name.replace('-', ' ')
    return (
        <AccordionItem value={`directory-${directory.name}`} className="w-full">
            <AccordionTrigger className="font-bold capitalize">
                {formattedName}
            </AccordionTrigger>
            <AccordionContent>
                {directory.samples.map((s, i) => <SampleItem sample={s} key={`s-${i}`} onClick={() => onSampleClick({sampleName: s.name, directoryName: directory.name})}/>)}
            </AccordionContent>
        </AccordionItem>
    )
}