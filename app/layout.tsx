import type { Metadata } from "next";
import { Josefin_Slab } from "next/font/google";
import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
