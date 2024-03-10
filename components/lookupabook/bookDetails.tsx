import Image from "next/image";
import Placeholder from "../placeholder";
import { Rating } from "@mui/material";
import Dropdown from "../ui/dropdown";
import ReadingProgress from "../progress";
import { Search } from "lucide-react";
import { useState } from "react";

export default function BookDetails({data, fetch, myRating, setMyRating, dropdownItems, activeItem, setActiveItem, pagesRead, search, setSearch, setPagesRead}: any) {
  return (
    <>
    <div className="flex flex-col gap-2">
          <div className="flex md:hidden justify-between gap-4 items-center">
          <input
            type="text"
            name="title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-3xl capitalize outline-none text-brown placeholder:text-brown/40"
            placeholder="Search Titles..."
          />
          <div
            onClick={async () => await fetch(search)}
            className="p-2 transition-all rounded-[4px] hover:bg-brown/10 cursor-pointer"
          >
            <Search size={20} strokeWidth={1} />
          </div>
        </div>
      <div className="flex md:flex-col gap-4 md:gap-2">
        {data?.cover_i ? (
          <Image
            src={`https://covers.openlibrary.org/b/id/${data?.cover_i}-L.jpg`}
            alt="Book cover"
            width={120}
            height={160}
            className="border object-fill shadow-custom border-brown rounded-[4px] flex-shrink-0 bg-beige h-[160px] md:w-[140px]"
          />
        ) : (
          <Placeholder width="w-[124px] md:w-full" />
        )}
        {/* <button type="button" onClick={() => console.log(myRating)}>test</button> */}
        <div className="flex flex-col gap-2 w-full">
        <Rating
          className="text-[#5C493E] md:self-center"
          name="book-rating"
          defaultValue={0}
          precision={0.5}
          value={myRating}
          onChange={(e, value) => setMyRating(value)}
        />
        <Dropdown
          data={dropdownItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <ReadingProgress
          onChange={setPagesRead}
          percentage={Math.min(
            pagesRead / (data?.number_of_pages_median || 1),
            1
          )}
        />
        </div>
      </div>
    </div>
    </>
  );
}