import type React from "react"
import type { Metadata } from "next"
import { Geist, Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Course Viewer - Transform Google Drive into Structured Learning",
  description:
    "Open-source tool that transforms Google Drive folders into structured learning courses. Simply paste a link and start learning.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} antialiased`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
