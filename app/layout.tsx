import type { Metadata } from "next";
import { Josefin_Slab } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const josefin = Josefin_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Toaster />
      <body className={josefin.className}>
        <Link href="/">
          <Image className="p-4" src="/logo.svg" width={200} height={200} alt="Logo" />
        </Link>
        {children}
      </body>
    </html>
  );
}
