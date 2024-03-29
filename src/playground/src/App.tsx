import {Button} from "@/components/ui/button"
import {useRef} from "react";
import {CadenceEditor, CadenceEditorComponentType} from "@/components/editor.tsx";
import {AssetsList} from "@/components/samplesList/assetsList.tsx";
import {sampleDirectories} from "@/assets-list.ts";
import {Separator} from "@/components/ui/separator.tsx";
import {ModeToggle} from "@/components/theme/mode-toggle.tsx";

function App() {
    const editorRef = useRef<CadenceEditorComponentType>(null)
    return (
        <div className="bg-background min-h-screen text-foreground">
            <header className="py-3 px-5">
                <div className="max-w-5xl mx-auto flex justify-between items-center">
                    <h1 className=" text-2xl font-bold tracking-tight">
                        Cadence playground
                    </h1>
                    <div className="flex justify-center gap-2 mt-4">
                        <Button onClick={() => editorRef.current?.add()}>Add</Button>
                        <Button onClick={() => editorRef.current?.play()}>Play</Button>
                        <Button onClick={() => editorRef.current?.stop()}>Stop all</Button>
                        <ModeToggle/>
                    </div>
                </div>

            </header>
            <Separator/>
            <div className="flex gap-1 max-w-5xl py-5 mx-auto w-full h-editor">
                <CadenceEditor ref={editorRef} className="w-8/12"/>
                <AssetsList
                    className="w-4/12"
                    sampleDirectories={sampleDirectories} onSampleClick={(payload) => {
                    editorRef.current?.addSampleImport(payload)
                }}/>

            </div>

        </div>
    )
}

export default App
