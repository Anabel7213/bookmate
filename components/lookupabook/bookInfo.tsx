import { bookLookupFields } from "@/dataPoints";
import { PencilLine, Search } from "lucide-react";
import { useState } from "react";

export default function BookAutoPulledUpInfo({
  search,
  setSearch,
  data,
  extra,
  fetch,
}: any) {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between gap-4 items-center">
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
        <div className="flex flex-col gap-2 my-4">
          {bookLookupFields({ data, extra })?.map((item, i) => (
            <div key={i} className="grid grid-cols-3 text-brown items-center">
              <div className="flex items-center md:w-[100px] gap-2">
                <span>{item.icon}</span>
                <h1>{item.name}</h1>
              </div>
              <input
                value={item.value}
                className="border-b outline-none border-brown/30 w-full col-span-2 mt-[-8px]"
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export function BookDescription({ extra, customDescription, setCustomDescription }: any) {
  const [ edit, setEdit ] = useState(false)
  return (
    <>
      <div className="flex rounded-[4px] border border-brown min-h-[190px]">
        <div className="w-full flex justify-between p-4">
        <textarea
          placeholder={edit ? "Describe what this book is about..." : "If available, the book's description will appear here, alternatively you can write your own by clicking on the pencil icon..."}
          value={edit ? customDescription :
            extra?.description?.value?.replace(/^"|"$/g, "") || ""
          }
          onChange={(e) => setCustomDescription(e.target.value)}
          className="w-full outline-none resize-none rounded-[4px] text-brown"
          readOnly={!edit}
        />
        {!edit && (
        <button className="h-fit w-fit" onClick={(e) => {e.preventDefault(); setEdit(prev => !prev)}} >
          <PencilLine size={20} strokeWidth={1} />
        </button>
        )}
        </div>
      </div>
    </>
  );
}