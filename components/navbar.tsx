"use client"

import { Button } from "@/components/ui/button"
import { BookOpen, Github } from "lucide-react"
import React from "react"

export default function Navbar() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Course Viewer</h1>
        </div>

        {/* GitHub CTA */}
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
      </div>
    </header>
  )
}
