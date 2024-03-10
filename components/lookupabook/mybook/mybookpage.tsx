"use client";

import Placeholder from "@/components/placeholder";
import { bookLookupFields } from "@/dataPoints";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import SaveButtons from "../saveButtons";
import { Dot } from "lucide-react";

export default function MyBookPage({ book }: any) {
  const fromDate = new Date(book?.description?.from?.seconds * 1000);
  const toDate = new Date(book?.description?.to?.seconds * 1000);
  const [active, setActive] = useState("Freeform");
  return (
    <>
      {/* <button onClick={() => console.log(book)}>test</button> */}

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 p-4">
        <div className="flex flex-col w-full">
          <div className="flex gap-4">
            <div className="flex flex-col w-fit gap-2">
              {book?.cover ? (
                <Image
                  src={book.cover}
                  alt="Book cover"
                  width={120}
                  height={160}
                  className="border object-fill shadow-custom border-brown rounded-[4px] flex-shrink-0 bg-beige h-[160px] md:w-[140px]"
                />
              ) : (
                <Placeholder width="w-[124px]" />
              )}
              {/* <button type="button" onClick={() => console.log(myRating)}>test</button> */}
              <Rating
                className="text-[#5C493E] self-center"
                name="book-rating"
                defaultValue={0}
                value={book?.myRating}
                precision={0.5}
                readOnly
              />
              <div className="flex flex-col gap-2">
                <div className="border-b border-brown p-1">{book?.status}</div>
                <div className="border-b border-brown p-1">
                  {book?.bookshelf}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 text-brown w-full">
              <h1 className="text-3xl capitalize">{book?.title}</h1>
              <div className="flex flex-col gap-2 w-full">
                {bookLookupFields({ book })?.map((item, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-3 text-brown items-center"
                  >
                    <div className="flex items-center md:w-[100px] gap-2">
                      <span>{item.icon}</span>
                      <h1>{item.name}</h1>
                    </div>
                    <input
                      value={
                        item?.name === "Rating"
                          ? item?.value
                            ? item.value.toFixed(1)
                            : ""
                          : item?.value
                      }
                      className="border-b outline-none border-brown/30 w-full col-span-2 mt-[-8px]"
                      readOnly
                    />
                  </div>
                ))}
                <div className="border border-brown/30 py-2 px-4 rounded-[4px] flex justify-between">
                  <h1>Dates Read:</h1>
                  <div>
                    <span>{fromDate.toLocaleDateString()}</span> -{" "}
                    <span>{toDate.toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 mt-4 min-h-[200px] border border-brown rounded-[4px]">
            {book.date ? book.date : "This book has no description specified."}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="border h-full border-brown hover:shadow-popup p-4 md:p-8 rounded-[4px] text-brown transition-all">
            {active === "Freeform" && (
              <div className="flex flex-col gap-4">
                <div>
                  <div className="flex justify-between">
                    <h1>Key takeaways</h1>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Dot />
                      <input
                        type="text"
                        value={book?.freeFormData?.takeaway1}
                        className="outline-none border-b border-brown w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Dot />
                      <input
                        type="text"
                        value={book?.freeFormData?.takeaway2}
                        className="outline-none border-b border-brown w-full"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Dot />
                      <input
                        type="text"
                        value={book?.freeFormData?.takeaway3}
                        className="outline-none border-b border-brown w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h1>My thoughts</h1>
                  <textarea
                    value={book?.freeFormData?.thoughts}
                    className="border h-[200px] mt-3 outline-none w-full border-brown p-4 rounded-[4px] resize-none bg-transparent overflow-scroll"
                  />
                </div>
              </div>
            )}
            {active === "Questionnaire" && (
              <div>
                <h1 className="">
                  <span className="font-semibold">Type:</span>{" "}
                  {book?.questionnaireData?.selectedType}
                </h1>
                <h1 className="">
                  <span className="font-semibold">Characters:</span>{" "}
                  {book?.questionnaireData?.Characters}/10
                </h1>
                <h1 className="">
                  <span className="font-semibold">Ease of Reading:</span>{" "}
                  {book?.questionnaireData?.["Ease of reading"]}/10
                </h1>
                <h1 className="">
                  <span className="font-semibold">Engagement:</span>{" "}
                  {book?.questionnaireData?.Engagement}/10
                </h1>
                <h1 className="">
                  <span className="font-semibold">Ending:</span>{" "}
                  {book?.questionnaireData?.selectedEnding}
                </h1>
                <h1 className="">
                  <span className="font-semibold">Pace:</span>{" "}
                  {book?.questionnaireData?.selectedPace}
                </h1>
                <h1 className="">
                  <span className="font-semibold">Mood:</span>{" "}
                  {book?.questionnaireData?.selectedMood.join(", ")}
                </h1>
                <h1 className="">
                  <span className="font-semibold">Favorite Character:</span>{" "}
                  {book?.questionnaireData?.favoriteCharacter}
                </h1>
                <h1 className="">
                  <span className="font-semibold">Favorite Moment:</span>{" "}
                  {book?.questionnaireData?.favoriteMoment}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <SaveButtons
          setOpenFreeForm={() => setActive("Freeform")}
          setShowQuestionnaire={() => setActive("Questionnaire")}
        />
      </div>
    </>
  );
}
