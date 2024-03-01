"use client"

import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { CalendarSearchIcon } from "lucide-react"

export default function Stats() {
    const statsItems = [
        {
            name: "Pages Read",
            value: 0
        },
        {
            name: "Hours Read",
            value: 0
        },
        {
            name: "Reading Pace",
            value: "-"
        },
        {
            name: "Favorite Author",
            value: "-"
        },
        {
            name: "Favorite Genre",
            value: "-"
        },
        {
            name: "Reviews Written",
            value: 0
        }
    ]
    const currentYear = new Date().getFullYear()
    const yearRange = Array.from({length: 20}, (_, i) => currentYear + i) 
    const [ showCalendar, setShowCalendar ] = useState(false)
    const [ selectedYear, setSelectedYear ] = useState(currentYear)
    return (
        <>
        <div className="flex md:px-4 flex-col w-full">
        <div className="relative flex items-center justify-between">
            <h1 className="text-xl">My Stats & Challenges</h1>
            <div onClick={() => setShowCalendar(prev => !prev)} className="flex border-b border-brown cursor-pointer p-2 gap-2 items-center w-fit md:self-center">
                <CalendarSearchIcon strokeWidth={1}/>
                <span>{selectedYear}</span>
            </div>
            {showCalendar && (
            <div className="absolute top-10 right-0 shadow-xl flex flex-col w-[100px] h-[106px] overflow-scroll p-1 border justify-between items-center rounded-[4px] border-brown bg-[#eeedeb]">
                {yearRange.map((year, i) => (
                    <div onClick={() => setSelectedYear(year)} key={i} className="px-4 items-center flex justify-center w-full cursor-pointer hover:text-white py-1 hover:bg-brown rounded-[4px]">{year}</div>
                ))}
            </div>
            )}
        </div>
        <div className="w-full md:my-4 mt-4 flex flex-col gap-2">
            {statsItems.map((item, i) => (
            <div key={i} className="flex p-2 justify-between border-b border-brown">
                <h1 className="">{item.name}</h1>
                <span>{item.value}</span>
            </div>
            ))}
        </div>
        </div>
        </>
    )
}