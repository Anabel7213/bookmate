"use client";

import BookLookup from "@/components/lookupabook/lookup";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function LookupBook() {
  return (
    <>
      <div className="flex justify-between gap-4 items-center">
        <Link href="/">
          <Image
            className="p-4"
            src="/logo.svg"
            width={200}
            height={200}
            alt="Logo"
          />
        </Link>
        <button
          onClick={() => signOut()}
          className="p-2 rounded-[4px] hover:bg-brown/10 transition-all"
        >
          <LogOut size={20} strokeWidth={1} />
        </button>
      </div>
      <BookLookup />
    </>
  );
}