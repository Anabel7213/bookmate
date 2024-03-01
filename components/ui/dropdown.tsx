import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

export default function Dropdown({data}: any) {
    const [ expandDropdown, setExpandDropdown ] = useState<Number>()
    const [ activeItem, setActiveItem ] = useState()
    return (
        <>
        <div className="flex flex-col gap-4">
        {data?.map((item: any, i: number) => (
            <div key={i}>
        <div onClick={() => setExpandDropdown(i)} className="">
            <div className="flex cursor-pointer justify-between gap-4 border-b border-brown">
                <h1 className="">{activeItem}</h1>
                <ChevronsUpDown size={20} strokeWidth={1} />
            </div>
        </div>
             <div className={`${expandDropdown !== i && "hidden"} flex flex-col p-1 rounded-[4px] border border-brown mt-2`}>
                {expandDropdown === i && (
                    <div className="">
                        {item.items.map((item: any, i: number) => (
                            <div key={i} className="p-1 rounded-[4px] flex cursor-pointer items-center gap-1 hover:bg-brown/10">
                                {item.icon}
                                {item.name}
                            </div>
                        ))}
                    </div>
                )}
                </div>
                </div>
        ))}
        </div>
        </>
    )
}