"use client"

import Placeholder from "@/components/placeholder";
import Search from "@/components/search";
import Stats from "@/components/stats";
import Tabs from "@/components/tabs";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const tabs = [
  { name: "To Read" },
  { name: "Reading" },
  { name: "Read" },
];

export default function Home() {
  const [ data, setData ] = useState(null)
  const [ activeTab, setActiveTab ] = useState(0)
  const [ count, setCount ] = useState([0, 0, 0])
  useEffect(() => {
    const getData = async () => {
      const q = query(collection(db, "books"));
      const querySnapshot = await getDocs(q);
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
      const newCounts = tabs.map(tab => fetchedData.filter(book => book.status === tab.name).length);
      setCount(newCounts);
    };
  
    getData();
  }, []);
  
  const filterBooksByStatus = (book) => {
    const statusMapping = ["To Read", "Reading", "Read"];
    return book.status === statusMapping[activeTab];
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4 p-4">
      <Link href="/">
        <Image
          className=""
          src="/logo.svg"
          width={200}
          height={200}
          alt="Logo"
        />
      </Link>
      <button className="p-2 rounded-[4px] hover:bg-brown/10 transition-all"><LogOut size={20} strokeWidth={1} /></button>
        </div>
      <div className="px-4 md:py-16">
        <div className="md:grid md:grid-cols-3 gap-4 flex flex-col">
          <div className="flex flex-col gap-4 col-span-2">
            <Tabs count={count} activeTab={activeTab} setActiveTab={setActiveTab} />
            {data !== null ? ( 
              <div className="md:flex gap-2 grid grid-cols-3 items-center md:flex-wrap col-span-2">
                {data?.filter(filterBooksByStatus).map((item) => (
                  <div key={item.id} onClick={() => {}} className="">
                   <Image src={item.cover} width={120} height={160} alt={"Book cover"} className="w-[124px] h-[160px] object-cover rounded-[4px] shadow-custom border cursor-pointer flex-shrink-0 border-brown"/>
                  </div>
                ))}
              </div>
            ) : (
              <div className="md:flex gap-2 grid grid-cols-3 items-center md:flex-wrap col-span-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <Placeholder key={i} />
              ))}
            </div>
            )}
          </div>
          <Stats />
        </div>
        <Search />
      </div>
    </>
  );
}
