"use client"

import Placeholder from "@/components/placeholder";
import Search from "@/components/search";
import Stats from "@/components/stats";
import Tabs from "@/components/tabs";
import { LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
            <Tabs />
            <div className="md:flex gap-2 grid grid-cols-3 items-center md:flex-wrap col-span-2">
              {Array.from({ length: 14 }).map((_, i) => (
                <Placeholder key={i} />
              ))}
            </div>
          </div>
          <Stats />
        </div>
        <Search />
      </div>
    </>
  );
}
