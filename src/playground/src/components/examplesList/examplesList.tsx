import {Accordion} from "@/components/ui/accordion.tsx";
import React, { FC, useState, useEffect } from "react";
import {ScrollArea} from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { ExamplesDirectory } from "@/examplesTypes";
import {AddExampleCallback ,CompleteExampleDirectory } from "./types";
import { ExamplesDirectoryItem } from "./exampleDirectory";
import { ExampleItem } from "./ExampleItem";

function formatDirectoryName(name: string) {
    const nameWithSpace = name.replace('-', ' ')
    return nameWithSpace.charAt(0).toUpperCase() + nameWithSpace.slice(1)
}

function filterSamples(exampleDirectory: any) {
    console.log(exampleDirectory)
    const filteredDirectories = exampleDirectory.map(d => d.examples[0]);
    return filteredDirectories
}


export const ExampleList: FC<{
    examplesDirectory: ExamplesDirectory[],
    className?: string
}> = ({examplesDirectory, className}) => {
    console.log(examplesDirectory)
    const [formattedDirectories, setFormattedDirectories] = useState<CompleteExampleDirectory[]>([]);
    const [filteredDirectories, setFilteredDirectories] = useState([]);

    useEffect(() => {
        setFilteredDirectories(filterSamples(formattedDirectories))
    }, [formattedDirectories]);


    useEffect(() => {
        setFormattedDirectories(examplesDirectory.map(d => ({
            ...d,
            formattedName: formatDirectoryName(d.name)
        })))
    }, [examplesDirectory]);

    console.log(filteredDirectories)

    return (
        <div className={cn('h-editor flex flex-col', className)}>
            <ScrollArea className="grow ">
                <Accordion type="single" collapsible className="px-4">
                    {
                        formattedDirectories.map((d, i) => <ExamplesDirectoryItem directory={d} key={`d-${i}`}/>)
                    }
                </Accordion>
                <ExampleItem example={filteredDirectories[0]}/>
            </ScrollArea>
        </div>
    );
}
 