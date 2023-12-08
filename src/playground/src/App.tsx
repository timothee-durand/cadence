import './index.css'
import {Button} from "@/components/ui/button"
import {useRef, useState} from "react";
import {CadenceEditor, CadenceEditorComponentType} from "@/components/editor.tsx";
import {AssetsList} from "@/components/samplesList/assetsList.tsx";
import {sampleDirectories} from "@/assets-list.ts";


function App() {
    const [mustPlay, setMustPlay] = useState<boolean>(false)
    const editorRef = useRef<CadenceEditorComponentType>(null)
    return (
        <div className="bg-slate-800 min-h-screen p-5">
            <div >
                <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setMustPlay(true)}>Play</Button>
                    <Button variant="outline" onClick={()=> setMustPlay(false)}>Stop</Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto max-h-[80vh]">
                <CadenceEditor mustPlay={mustPlay} ref={editorRef}/>
                <AssetsList sampleDirectories={sampleDirectories} onSampleClick={(payload) => {
                    editorRef.current?.addSampleImport(payload)
                }}/>
            </div>

        </div>
    )
}

export default App
