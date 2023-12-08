import './index.css'
import { Button } from "@/components/ui/button"
import Editor from '@monaco-editor/react';
import {Cadence, Loop} from "cadence-js";
import A3Piano  from "./assets/samples/piano/A3.mp3"
import {useRef} from "react";

const loop: Loop = {
  startTime: "6s",
  sample: A3Piano,
  interval: "1s",
  speed: 1
}

function App() {
  const editorRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  function playLoop() {
    //const getLoop: Loop = editorRef.current.getValue();
    const cadence = new Cadence();
    cadence.play(loop);
  }

  return (
    <>
      <div className="bg-slate-800">
        <div className="flex justify-center">
          <Button variant="outline" onClick={playLoop}>Play</Button>
          <Button variant="outline">Stop</Button>
        </div>
      </div>
      <Editor 
        width="500px"
        height="500px" 
        theme="vs-dark" 
        defaultLanguage="javascript"
        onMount={handleEditorDidMount}
        defaultValue="// some code" 
      />;
    </>
  )
}

export default App
