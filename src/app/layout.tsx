import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tappy | Professional Editor",
  description: "A premium rich text editing experience built with Next.js and Tiptap.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-gradient-to-br from-indigo-100 via-white to-cyan-100 dark:from-slate-900 dark:via-[#0a0a0a] dark:to-indigo-950 text-gray-900 dark:text-gray-100 transition-colors duration-500">
        {children}
      </body>
    </html>
  );
}
