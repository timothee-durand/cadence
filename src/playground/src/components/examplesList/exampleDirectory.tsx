import {FC} from "react";
import { ExampleItem } from "./ExampleItem";
import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

export const ExamplesDirectoryItem = ({ directory }) => {
    return (
        <AccordionItem value={`directory-${directory.name}`} className="w-full">
            <AccordionTrigger className="font-bold">
                {directory.formattedName}
            </AccordionTrigger>
            <AccordionContent>
                
            </AccordionContent>
        </AccordionItem>
    )
}