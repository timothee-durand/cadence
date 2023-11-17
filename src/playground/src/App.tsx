import './index.css'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import React ,{ useRef } from 'react';
import Editor from '@monaco-editor/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

function App() {
  function test() {
    console.log("hello world")
  }

  return (
    <>
      <div className="bg-slate-800">
        <div className="flex justify-center">
          <Button variant="outline">Play</Button>
          <Button variant="outline">Stop</Button>
        </div>
      </div>
      <Editor 
        width="500px"
        height="500px" 
        theme="vs-dark" 
        defaultLanguage="javascript"
        onMount={test}
        defaultValue="// some code" 
      />;
    </>
  )
}

export default App
