import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function Dropdown({data}: any) {
    const [ expandDropdown, setExpandDropdown ] = useState<Number>()
    return (
        <>
        <div className="flex flex-col gap-4">
        {data?.map((item: any, i: number) => (
            <div key={i}>
        <div onClick={() => setExpandDropdown(i)} className="">
            <div className="flex cursor-pointer justify-between gap-4 border-b border-brown">
                <h1 className="">{item.name}</h1>
                <ChevronsUpDown size={20} strokeWidth={1} />
            </div>
        </div>
                {expandDropdown === i && (
                    <div className="">
                        test
                    </div>
                )}
                </div>
        ))}
        </div>
        </>
    )
}