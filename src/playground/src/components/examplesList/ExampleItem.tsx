import { FC, useState } from "react";
import { ExamplesTypes } from "@/examplesTypes";
import { Play, PlusSquare, StopCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Editor } from "@monaco-editor/react";

export const ExampleItem: FC<{ example: ExamplesTypes }> = ({ example }) => {
    console.log(example)
    return (
        <div
            className='px-5 py-2 flex items-center w-full justify-between ease-out duration-200 transition hover:bg-secondary hover:text-secondary-foreground'>
            <div className='flex gap-2'>
            <Editor
                className="rounded-md"
                theme="vs-dark"
                height="60vh"
                defaultLanguage="typescript"
                value={example.codeBase}
                options={{
                    minimap: {
                        enabled: false
                    }
                }}  
            />
            </div>
        </div>

    )
}
