import {Accordion} from "@/components/ui/accordion.tsx";
import React from "react";
import {ScrollArea} from "@/components/ui/scroll-area"

class ExampleList extends React.Component {
    constructor(props:any) {
        super(props)
    }

    render(): React.ReactNode {
        return <>
            <ScrollArea className="grow ">
                <Accordion type="single">
                    Bonjour
                </Accordion>
            </ScrollArea>
        </>;
    }
}

export default ExampleList;