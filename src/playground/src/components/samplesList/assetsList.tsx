import {FC, useEffect, useState} from "react";
import {SampleDirectory} from "@/samplesTypes.ts";
import {DirectoryItem} from "@/components/samplesList/sampleDirectory.tsx";
import {Accordion} from "@/components/ui/accordion.tsx";
import { CompleteSampleDirectory} from "@/components/samplesList/types.ts";
import {ScrollArea} from "@/components/ui/scroll-area"
import {cn} from "@/lib/utils.ts";
import {AssetsSearchForm} from "@/components/samplesList/assetsSearch.tsx";
import {SampleItem} from "@/components/samplesList/sampleItem.tsx";
import {copySamplePathToClipboard} from "@/components/samplesList/utils.ts";


function formatDirectoryName(name: string) {
    const nameWithSpace = name.replace('-', ' ')
    return nameWithSpace.charAt(0).toUpperCase() + nameWithSpace.slice(1)
}

function filterSamples(sampleDirectories: CompleteSampleDirectory[], search: string) {
    const filteredDirectories = sampleDirectories.map(d => ({
        ...d,
        samples: d.samples.filter(s => `${d.name} ${s.name}`.toLowerCase().includes(search.toLowerCase()))
    })).filter(d => d.samples.length > 0)
    return filteredDirectories
}




export const AssetsList: FC<{
    sampleDirectories: SampleDirectory[],
    className?: string
}> = ({sampleDirectories, className}) => {
    const [search, setSearch] = useState("")
    const [formattedDirectories, setFormattedDirectories] = useState<CompleteSampleDirectory[]>([])
    const [filteredDirectories, setFilteredDirectories] = useState<CompleteSampleDirectory[]>([])

    useEffect(() => {
        setFilteredDirectories(filterSamples(formattedDirectories, search))
    }, [search, formattedDirectories]);

    useEffect(() => {
        setFormattedDirectories(sampleDirectories.map(d => ({
            ...d,
            formattedName: formatDirectoryName(d.name)
        })))
    }, [sampleDirectories]);

    return (
        <div className={cn('h-editor flex flex-col', className)}>
            <h3 className="mb-2 scroll-m-20 text-center text-xl font-bold tracking-tight">
                Test samples
            </h3>
            <AssetsSearchForm onChange={(s) => setSearch(s)}/>
            <ScrollArea className="grow ">
                {search.length === 0 ? (
                    <Accordion type="single" collapsible className="px-4">
                        {
                            formattedDirectories.map((d, i) => (
                                <DirectoryItem directory={d} key={`d-${i}`} />
                            ))
                        }
                    </Accordion>) : (
                    <div>
                        {filteredDirectories.map((d, i) => (
                            d.samples.map((s, j) => (
                                <SampleItem onClick={() => copySamplePathToClipboard(d, s)} instrument={d.formattedName} sample={s} key={`s-${i}-${j}`} />
                            ))
                        ))}
                    </div>
                )}
            </ScrollArea>
        </div>

    )
}