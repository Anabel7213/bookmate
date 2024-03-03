"use client";

import {
    BookOpenText,
  BookUser,
  Bookmark,
  BookmarkCheck,
  BookmarkPlus,
  BookmarkX,
  CalendarDays,
  NotepadText,
  PenLine,
  PlusCircleIcon,
  ScanBarcode,
  Search,
  Star,
} from "lucide-react";
import Placeholder from "../placeholder";
import { Rating } from "@mui/material";
import Dropdown from "../ui/dropdown";
import ReadingProgress from "../progress";
import { useState } from "react";
import Questionnaire from "./questionnaire";
import { useSearch } from "@/lib/fetch";
import Image from "next/image";

export default function BookLookup() {
    const [reflectMode, setReflectMode] = useState(false);
    const [ search, setSearch ] = useState("")
    const { fetch, data, extra } = useSearch()
  const items = [
    {
      name: "Author",
      icon: <BookUser strokeWidth={1} />,
      value: data?.author_name[0] || "",
    },
    {
        name: "Subject",
        icon: <BookOpenText strokeWidth={1} />,
        value: data?.subtitle || extra?.subtitle || "",
      },
    {
      name: "Pages",
      icon: <NotepadText strokeWidth={1} />,
      value: data?.number_of_pages_median || "",
    },
    {
        name: "Rating",
        icon: <Star strokeWidth={1} />,
        value: data?.ratings_average || "",
      },
    {
      name: "ISBN",
      icon: <ScanBarcode strokeWidth={1} />,
      value: data?.isbn[0],
    },
    {
      name: "Year",
      icon: <CalendarDays strokeWidth={1} />,
      value: data?.first_publish_year,
    },
  ];
  const dropdownItems = [
    {
      name: "Status",
      items: [
        {
            id: 1,
          name: "To Read",
          icon: <BookmarkPlus strokeWidth={1} />,
        },
        {
            id: 2,
          name: "Reading",
          icon: <Bookmark strokeWidth={1} />,
        },
        {
            id: 3,
          name: "Read",
          icon: <BookmarkCheck strokeWidth={1} />,
        },
        {
            id: 4,
          name: "Abandoned",
          icon: <BookmarkX strokeWidth={1} />,
        },
      ],
    },
    {
      name: "Bookshelf",
      items: [
        {
            id: 1,
          name: "Fiction",
        },
        {
            id: 2,
          name: "Non Fiction",
        },
      ],
    },
  ];
  const [ pagesRead, setPagesRead ] = useState(0)
  return (
    <>
      <div className="w-full justify-center flex">
        <div className="p-4 w-fit">
          <form onSubmit={() => {}} className="flex flex-col gap-4 w-fit">
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {data?.cover_i ? (
                    <Image src={`https://covers.openlibrary.org/b/id/${data?.cover_i}-L.jpg`} alt="Book cover" width={120} height={160} className="border shadow-custom border-brown rounded-[4px] flex-shrink-0 bg-beige h-[160px] md:w-[120px]"/>
                ) : <Placeholder />}
                <Rating className="text-[#5C493E]" name="book-rating" defaultValue={0} precision={0.5} />
                <Dropdown data={dropdownItems} />
                <ReadingProgress onChange={setPagesRead} percentage={Math.min(pagesRead / (data?.number_of_pages_median || 1), 1)} />
              </div>
              <div className="">
                <div className="flex justify-between gap-4 items-center">
                  <input
                    type="text"
                    name="title"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-3xl capitalize outline-none text-brown placeholder:text-brown/40"
                    placeholder="Search Titles..."
                  />
                  <div onClick={async () => await fetch(search)} className="p-2 transition-all rounded-[4px] hover:bg-brown/10 cursor-pointer">
                    <Search size={20} strokeWidth={1} />
                  </div>
                </div>
                <div className="flex flex-col gap-2 my-4">
                  {items?.map((item, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-3 text-brown items-center"
                    >
                      <div className="flex items-center md:w-[100px] gap-2">
                        <span>{item.icon}</span>
                        <h1>{item.name}</h1>
                      </div>
                      <input value={item.value} className="border-b outline-none border-brown/30 w-full col-span-2 mt-[-8px]" readOnly/>
                    </div>
                  ))}
                  <button type="button" className="text-brown flex gap-1 items-center self-end">
                    <PlusCircleIcon
                      strokeWidth={1}
                      size={20}
                      className="mb-[4px]"
                    />
                    Add custom field
                  </button>
                </div>
              </div>
            </div>
            <div className="flex rounded-[4px] border border-brown min-h-[190px]">
              <textarea
                value={extra?.description?.value?.replace(/^"|"$/g, '') || "If available the book's description will appear here."}
                className="w-full outline-none resize-none rounded-[4px] p-4 text-brown"
                readOnly
              />
            </div>
              <button
                type="button"
                onClick={() => setReflectMode((prev) => !prev)}
                className="flex items-center gap-2"
              >
                <PenLine size={20} strokeWidth={1} />
                Reflect on the book
              </button>
          </form>
        </div>
        {reflectMode && (
            <div className="fixed backdrop-blur-xl shadow-custom self-center bg-white rounded-[4px] border border-brown p-4">
            <Questionnaire onClose={() => setReflectMode(false)} />
            </div>
        )}
      </div>
    </>
  );
}