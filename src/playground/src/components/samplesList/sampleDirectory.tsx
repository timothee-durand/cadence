import {FC} from "react";
import {SampleItem} from "@/components/samplesList/sampleItem.tsx";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion.tsx";
import { CompleteSampleDirectory} from "@/components/samplesList/types.ts";
import {copySamplePathToClipboard} from "@/components/samplesList/utils.ts";

export const DirectoryItem: FC<{ directory: CompleteSampleDirectory}> = ({directory}) => {

    return (
        <AccordionItem value={`directory-${directory.name}`} className="w-full">
            <AccordionTrigger className="font-bold">
                {directory.formattedName}
            </AccordionTrigger>
            <AccordionContent>
                {directory.samples.map((s, i) => <SampleItem onClick={() => copySamplePathToClipboard(directory, s)} instrument={directory.formattedName} sample={s} key={`s-${i}`}/>)}
            </AccordionContent>
        </AccordionItem>
    )
}