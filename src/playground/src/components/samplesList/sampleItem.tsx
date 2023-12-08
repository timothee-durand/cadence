import {FC} from "react";
import {SamplesTypes} from "@/samplesTypes.ts";
import {PlusSquare} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const SampleItem: FC<{sample: SamplesTypes, onClick: () => void}> = ({sample, onClick}) => {
    return (
        <div className='px-5 py-2 flex w-full justify-between'>
            {sample.name}
            <Button size="icon" onClick={onClick}>
                <PlusSquare />
            </Button>
        </div>

    )
}