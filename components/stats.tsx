"use client"

import { useEffect, useState } from "react"
import { CalendarSearchIcon } from "lucide-react"
import { collection, getDocs, query } from "firebase/firestore"
import { db } from "@/firebase"

type StatsItem = {
    name: string;
    value: string | number; // Can be both string or number
    denotion?: string; // Optional property
  };

export default function Stats() {
    const [ data, setData ] = useState(null)
    useEffect(() => {
        const getData = async () => {
          const q = query(collection(db, "books"));
          const querySnapshot = await getDocs(q);
          const fetchedData = [];
          let pagesRead = 0; // Initialize pages read counter
          let totalDaysReading = 0;
      
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            fetchedData.push({ id: doc.id, ...data });
            if (data.status === "Read" || data.status === "Reading") {
              pagesRead += data.progress; // Sum up progress for "Read" books

              if (data.description && data.description.from && data.description.to) {
                const startDate = data.description.from.toDate();
                const endDate = data.description.to.toDate();
          
                if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) { // Check for valid dates
                  const timeDifference = endDate.getTime() - startDate.getTime();
                  const daysToRead = timeDifference / (1000 * 3600 * 24);
                  totalDaysReading += daysToRead;
                } else {
                  console.log("Invalid dates for book:", data); // Log if dates are invalid
                }
              }
            }
          });

          const totalBooksRead = fetchedData.filter(book => book.status === "Read").length;
          const readingPace = totalBooksRead > 0 ? totalDaysReading / totalBooksRead : 0;

          const wordsRead = pagesRead * 275; // Calculate total words read based on pages
          const hoursRead = wordsRead / (238 * 60); // Calculate hours read (238 wpm, 60 minutes per hour)
      
          setData(fetchedData);

          let favoriteAuthor = { name: "", count: 0 };
          const authorCounts = {};
          let favoriteGenre = "";
          const genreCounts = { Fiction: 0, "Non Fiction": 0 };

          fetchedData.forEach(book => {
            // Count authors
            if (authorCounts[book.author]) {
              authorCounts[book.author]++;
            } else {
              authorCounts[book.author] = 1;
            }
      
            // Check if this author is now the most encountered
            if (authorCounts[book.author] > favoriteAuthor.count) {
              favoriteAuthor = { name: book.author, count: authorCounts[book.author] };
            }
      
            // Count genres
            if (book.bookshelf === "Fiction" || book.bookshelf === "Non Fiction") {
              genreCounts[book.bookshelf]++;
            }
          });

          favoriteGenre = genreCounts["Fiction"] > genreCounts["Non Fiction"] ? "Fiction" : "Non Fiction";

          const newStatsItems = statsItems.map(item => {
            if (item.name === "Pages Read") {
              return { ...item, value: pagesRead };
            } else if (item.name === "Hours Read") {
              return { ...item, value: Math.round(hoursRead)};
            } else if (item.name === "Favorite Author") {
                return { ...item, value: favoriteAuthor.name };
              } else if (item.name === "Favorite Genre") {
                return { ...item, value: favoriteGenre };
              } else if (item.name === "Reading Pace") {
                return { ...item, value: Math.round(readingPace) }; 
              }
              return item;
          });
          setStatsItems(newStatsItems);
        };
      
        getData();
      }, []);
      
      
    const [ statsItems, setStatsItems ] = useState<StatsItem[]>([
        {
            name: "Pages Read",
            value: 0,
            denotion: "pages"
        },
        {
            name: "Hours Read",
            value: 0,
            denotion: "hours"
        },
        {
            name: "Reading Pace",
            value: 0,
            denotion: "days / book"
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
            value: 0,
            denotion: "reviews"
        }
    ])
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
                {yearRange?.map((year, i) => (
                    <div onClick={() => setSelectedYear(year)} key={i} className="px-4 items-center flex justify-center w-full cursor-pointer hover:text-white py-1 hover:bg-brown rounded-[4px]">{year}</div>
                ))}
            </div>
            )}
        </div>
        <div className="w-full md:my-4 mt-4 flex flex-col gap-2">
            {statsItems?.map((item, i) => (
            <div key={i} className="flex p-2 justify-between border-b border-brown">
                <h1 className="">{item?.name}</h1>
                <div className="flex gap-1 items-center">
                    <span>{item?.value}</span>
                    <span>{item?.denotion}</span>
                </div>
            </div>
            ))}
        </div>
        </div>
        </>
    )
}