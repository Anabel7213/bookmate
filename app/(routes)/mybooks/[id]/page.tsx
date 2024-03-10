"use client"

import MyBookPage from "@/components/lookupabook/mybook/mybookpage";
import { db } from "@/firebase";
import { Timestamp, collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MyBook() {
    const id = useParams<{ id: string }>().id
    const [data, setData] = useState({});
    useEffect(() => {
        console.log(`ID before fetch: ${id}`);
        const fetchBookData = async () => {
            const q = query(collection(db, "books"))
            const querySnapshot = await getDocs(q)
            const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id,  ...doc.data()}))
            
            const book = fetchedData.find(book => book.id === id)
            setData(book)
        };
    
        fetchBookData();
      }, [id]);
    return (
        <>
        <div className="flex p-4 justify-between gap-4 items-center">
            <Link href="/">
            <Image
                className=""
                src="/logo.svg"
                width={200}
                height={200}
                alt="Logo"
            />
            </Link>
            <button
            onClick={() => {}}
            className="p-2 rounded-[4px] hover:bg-brown/10 transition-all"
            >
            <LogOut size={20} strokeWidth={1} />
            </button>
        </div>
        <MyBookPage book={data} />
        </>
    )
}