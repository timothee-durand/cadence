import {FC, useState} from "react";
import {SamplesTypes} from "@/samplesTypes.ts";
import {Play, PlusSquare, StopCircle} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";

export const SampleItem: FC<{ sample: SamplesTypes, onClick: () => void, instrument: string }> = ({sample, instrument, onClick}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

    function playSample() {
        const audio = new Audio("." + sample.path);
        audio.play();
        setAudio(audio);
        setIsPlaying(true);
    }

    function stopSample() {
        audio?.pause();
        setAudio(null);
        setIsPlaying(false);
    }

    return (
        <div
            className='px-5 py-2 flex items-center w-full justify-between ease-out duration-200 transition hover:bg-secondary hover:text-secondary-foreground'>
            {`${instrument} (${sample.name})`}
            <div className='flex gap-2'>
                <Button size="icon" onClick={onClick} title="Add import">
                    <PlusSquare/>
                </Button>
                <Button size="icon" onClick={isPlaying ? stopSample : playSample} title="Play the sample">
                    {isPlaying ? <StopCircle/> : <Play />}
                </Button>
            </div>
        </div>

    )
}