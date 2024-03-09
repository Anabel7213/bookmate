import Image from "next/image";
import Placeholder from "../placeholder";
import { Rating } from "@mui/material";
import Dropdown from "../ui/dropdown";
import ReadingProgress from "../progress";

export default function BookDetails({data, myRating, setMyRating, dropdownItems, activeItem, setActiveItem, pagesRead, setPagesRead}: any) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {data?.cover_i ? (
          <Image
            src={`https://covers.openlibrary.org/b/id/${data?.cover_i}-L.jpg`}
            alt="Book cover"
            width={120}
            height={160}
            className="border object-fill shadow-custom border-brown rounded-[4px] flex-shrink-0 bg-beige h-[160px] md:w-[140px]"
          />
        ) : (
          <Placeholder width="w-full" />
        )}
        {/* <button type="button" onClick={() => console.log(myRating)}>test</button> */}
        <Rating
          className="text-[#5C493E] self-center"
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
    </>
  );
}