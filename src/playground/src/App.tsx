import {Button} from "@/components/ui/button"
import {useRef} from "react";
import {CadenceEditor, CadenceEditorComponentType} from "@/components/editor.tsx";
import {AssetsList} from "@/components/samplesList/assetsList.tsx";
import {sampleDirectories} from "@/assets-list.ts";
import {Separator} from "@/components/ui/separator.tsx";


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
                    </div>
                </div>

            </header>
            <Separator/>
            <div className="grid grid-cols-2 gap-5 max-w-5xl py-5 mx-auto h-editor">
                <CadenceEditor ref={editorRef}/>
                <div>
                    <AssetsList sampleDirectories={sampleDirectories} onSampleClick={(payload) => {
                        editorRef.current?.addSampleImport(payload)
                    }}/>
                </div>

            </div>

        </div>
    )
}

export default App
