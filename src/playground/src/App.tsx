import './index.css'
import {Button} from "@/components/ui/button"
import {useRef} from "react";
import {CadenceEditor, CadenceEditorComponentType} from "@/components/editor.tsx";
import {AssetsList} from "@/components/samplesList/assetsList.tsx";
import {sampleDirectories} from "@/assets-list.ts";
import {Play, Plus, StopCircle} from "lucide-react";


function App() {
    const editorRef = useRef<CadenceEditorComponentType>(null)
    return (
        <div className="bg-slate-800 min-h-screen p-5">
            <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto max-h-[80vh]">
                <CadenceEditor ref={editorRef}/>
                <AssetsList sampleDirectories={sampleDirectories} onSampleClick={(payload) => {
                    editorRef.current?.addSampleImport(payload)
                }}/>
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <Button size="icon"  onClick={() => editorRef.current?.add()}><Plus /></Button>
                <Button size="icon"  onClick={() => editorRef.current?.play()}><Play /></Button>
                <Button size="icon"  onClick={()=> editorRef.current?.stop()}><StopCircle /></Button>
            </div>
        </div>
    )
}

export default App
