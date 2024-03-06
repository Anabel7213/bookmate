"use client"

import { useState } from "react"
import Menu from "./menu"

export default function Tabs({count, activeTab, setActiveTab}) {
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
    return (
        <>
        <div className="flex justify-between gap-4 items-center w-full">
        <div className="flex gap-4 items-center">
            {tabs.map((tab, i) => (
                <button onClick={() => {setActiveTab(i)}} key={i} className={`${activeTab === i ? "border-b border-brown p-1" : "p-1 border-b border-transparent"} cursor-pointer transition-all flex items-center gap-1`}>
                    {tab.name}
                    <span>&#40;{count[i]}&#41;</span>
                </button>
            ))}
        </div>
        <Menu />
        </div>
        </>
    )
}