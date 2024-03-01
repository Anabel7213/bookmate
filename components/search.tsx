"use client"

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Search() {
    const router = useRouter()
    return (
        <>
        <div className="flex py-4 items-center">
            <div className="border-b border-brown w-full h-[2px]"></div>
            <div onClick={() => router.push("/lookupabook")} className="rounded-full w-[64px] h-[64px] whitespace-nowrap border border-brown flex items-center justify-center p-4 hover:bg-brown/10 cursor-pointer transition-all"><div className=""><SearchIcon size={32} strokeWidth={1} /></div></div>
            <div className="border-b border-brown w-full h-[2px]"></div>
        </div>
        </>
    )
}