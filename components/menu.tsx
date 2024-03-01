"use client"

import { ArrowUpDown, BookCopy, SlidersHorizontal } from "lucide-react"

export default function Menu() {
    const menuItems = [
        {
            icon: <BookCopy size={20} strokeWidth={1} />,
            action: () => {}
        },
        {
            icon: <ArrowUpDown size={20} strokeWidth={1} />,
            action: () => {}
        },
        {
            icon: <SlidersHorizontal size={20} strokeWidth={1} />,
            action: () => {}
        }
    ]
    return (
        <>
        <div className="flex items-center">
            {menuItems.map((item, i) => (
                <button key={i} onClick={item.action} className={`p-2 hover:bg-brown/10 rounded-[4px] transition-all`}>{item.icon}</button>
            ))}
        </div>
        </>
    )
}