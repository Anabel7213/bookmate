"use client"

import { BookUser, Bookmark, BookmarkCheck, BookmarkPlus, BookmarkX, CalendarDays, NotepadText, ScanBarcode, Search } from "lucide-react";
import Placeholder from "../placeholder";
import { Rating } from "@mui/material";
import Dropdown from "../ui/dropdown";

export default function BookLookup() {
    const items = [
        {
            name: "Author",
            icon: <BookUser strokeWidth={1}/>,
            value: ""
        },
        {
            name: "Pages",
            icon: <NotepadText strokeWidth={1}/>,
            value: ""
        },
        {
            name: "ISBN",
            icon: <ScanBarcode strokeWidth={1}/>,
            value: ""
        },
        {
            name: "Year",
            icon: <CalendarDays strokeWidth={1}/>,
            value: ""
        }
    ]
    const dropdownItems = [
        {
            name: "Status",
            items: [
                {
                    name: "To Read",
                    icon: <BookmarkPlus />
                },
                {
                    name: "Reading",
                    icon: <Bookmark />
                },
                {
                    name: "Read",
                    icon: <BookmarkCheck />
                },
                {
                    name: "Abandoned",
                    icon: <BookmarkX />
                }
            ]
        },
        {
            name: "Bookshelf",
            items: [
                "Fiction",
                "Non-Fiction"
            ]
        }
    ]
    return (
        <>
        <div className="p-4">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                <Placeholder />
                <Rating name="book-rating" defaultValue={0} precision={0.5} />
                <Dropdown data={dropdownItems} />
                </div>
                <div className="">
                    <div className="flex justify-between gap-4 items-center">
                        <input className="text-3xl outline-none text-brown placeholder:text-brown/40" placeholder="Search Titles..." />
                        <div className="p-2 transition-all rounded-[4px] hover:bg-brown/10 cursor-pointer"><Search size={20} strokeWidth={1}/></div>
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                        {items.map((item, i) => (
                            <div key={i} className="grid grid-cols-3 text-brown items-center">
                                <div className="flex items-center w-[100px] gap-2">
                                    <span>{item.icon}</span>
                                    <h1>{item.name}</h1>
                                </div>
                                <div className="border-b border-brown/20 w-full h-[2px] col-span-2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}