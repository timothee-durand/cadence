import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Search} from "lucide-react";
import {useState} from "react";


export function AssetsSearchForm({onChange}: { onChange: (search: string) => void }) {
    const [value, setValue] = useState("")

    return (
        <form onSubmit={() => onChange(value)} className="flex space-x-1 px-2">
            <Input placeholder="Search in the assets (ex: 'Basson A3')" onChange={(e) => {
                setValue(e.target.value)
                onChange(e.target.value)
            }} type="search"/>
            <Button size="icon" type="submit" title="Search">
                <Search/>
            </Button>
        </form>)
}
