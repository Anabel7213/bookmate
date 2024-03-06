"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignUp() {
  const fields = [
    {
      id: "name",
      name: "Name",
      type: "text",
      placeholder: "Book Worm",
      case: ["signup", "login"]
    },
    {
      id: "email",
      name: "Email",
      type: "email",
      placeholder: "bookworm@gmail.com",
      case: ["login"]
    },
    {
      id: "password",
      name: "Password",
      type: "password",
      placeholder: "Make it strong",
      case: ["login"]
    },
  ];
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  return (
    <>
      <div className="flex flex-col gap-4 items-center justify-center h-screen inset-0">
        <Link href="/">
          <Image
            className=""
            src="/logo.svg"
            width={200}
            height={200}
            alt="Logo"
          />
        </Link>
        <div className="md:w-[224px] flex flex-col gap-4">
          <form id="signup" onSubmit={() => {}} className="w-full flex flex-col gap-1">
            {fields.map((field) => (
            <div key={field.id}>
                <h1>{field.name}</h1>
              <input onChange={(e) => {field.id === "email" ? setEmail(e.target.value) : setPassword(e.target.value)}} className="w-full outline-none py-2 px-4 rounded-[4px] border border-brown" placeholder={field.placeholder} type={field.type} name={field.id} />
            </div>
            ))}
          </form>
        <div className="flex flex-col gap-4">
          <button
            disabled={!email || !password}
            form="signup" 
            type="submit"
            className="py-2 px-4 rounded-[4px] hover:bg-brown/10 transition-all border border-brown"
          >
            Sign Up to Continue
          </button>
          <button className="hover:border-b hover:border-brown w-fit border-b border-white transition-all self-center">
            Log In
          </button>
        </div>
      </div>
      </div>
    </>
  );
}