"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Github } from "lucide-react"
import React from "react"
import { ToggleTheme } from "./theme-toggler"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-0 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Course Viewer</h1>
        </div>

      <div>
        <Link href="/my-courses" className={`mr-4 font-poppins font-black ${pathname=="/my-courses" ? "text-green-500 underline" : ":"}`}>YOUR COURSES</Link>
      </div>

        {/* GitHub CTA */}
        <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
            <a
                href="https://github.com/adityajoshi-08/course-viewer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
            >
                <Github className="h-4 w-4" />
                Source Code
            </a>
            </Button>
            <ToggleTheme />
        </div>
      </div>
    </header>
  )
}
