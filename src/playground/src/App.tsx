import './index.css'
import {Button} from "@/components/ui/button"
import { useState} from "react";
import {CadenceEditor} from "@/components/editor.tsx";


function App() {
    const [mustPlay, setMustPlay] = useState<boolean>(false)
    return (
        <div className="bg-slate-800">
            <div >
                <div className="flex justify-center">
                    <Button variant="outline" onClick={() => setMustPlay(true)}>Play</Button>
                    <Button variant="outline" onClick={()=> setMustPlay(false)}>Stop</Button>
                </div>
            </div>
            <CadenceEditor mustPlay={mustPlay}/>
        </div>
    )
}

export default App
