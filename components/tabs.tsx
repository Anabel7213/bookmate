"use client"

import { useState } from "react"
import Menu from "./menu"

export default function Tabs() {
    const tabs = [
        {
            name: "To read",
        },
        {
            name: "Reading",
        },
        {
            name: "Read",
        }
    ]
    const [ activeTab, setActiveTab ] = useState(0)
    const [ count, setCount ] = useState(0)
    return (
        <>
        <div className="flex justify-between gap-4 items-center w-full">
        <div className="flex gap-4 items-center">
            {tabs.map((tab, i) => (
                <button onClick={() => {setActiveTab(i)}} key={i} className={`${activeTab === i ? "border-b border-brown p-1" : "p-1 border-b border-transparent"} cursor-pointer transition-all flex items-center gap-1`}>
                    {tab.name}
                    <span>&#40;{count}&#41;</span>
                </button>
            ))}
        </div>
        <Menu />
        </div>
        </>
    )
}