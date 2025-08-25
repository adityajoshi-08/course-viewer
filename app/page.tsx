"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import React from "react"
import { BookOpen, FolderOpen, Github, Zap, Users, ArrowRight } from "lucide-react"
import Navbar from "@/components/navbar"

export default function Home() {
  const [folderInput, setFolderInput] = React.useState("")
  const router = useRouter()

  function handleGoClick() {
    var folderID = ""
    if (folderInput.includes("drive.google.com")) {
      const parts = folderInput.split("/")
      if (folderInput.endsWith("/")) {
        folderID = parts[parts.length - 2]
        console.log(parts)
      } else {
        folderID = parts[parts.length - 1]
      }
    } else {
      folderID = folderInput
    }

    router.push(`/course/${folderID}`)
  }

  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            Open Source Learning Tool
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Transform Your <span className="text-primary">Google Drive</span> into Structured Learning
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Simply provide a public Google Drive folder link and start learning with our organized course viewer. No
            setup required, completely free and open source.
          </p>

          {/* CTA Input */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto mb-8">
            <Input
              placeholder="Paste Google Drive folder URL or ID"
              value={folderInput}
              onChange={(e) => setFolderInput(e.target.value)}
              className="flex-1 h-12 text-base"
            />
            <Button
              size="lg"
              disabled={folderInput === "" || folderInput === null || folderInput.length < 1}
              onClick={handleGoClick}
              className="h-12 px-8 flex items-center gap-2"
            >
              Start Learning
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Try it with any public Google Drive folder containing learning materials
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">1. Share Your Folder</h4>
              <p className="text-muted-foreground">Make your Google Drive folder public and copy the link</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-semibold mb-2">2. Paste & Transform</h4>
              <p className="text-muted-foreground">Our tool instantly organizes your files into a structured course</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold mb-2">3. Start Learning</h4>
              <p className="text-muted-foreground">
                Navigate through your materials with our intuitive course interface
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Course Viewer?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Instant Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  No registration, no downloads. Just paste your Google Drive link and start learning immediately.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="h-5 w-5 text-primary" />
                  Open Source
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Completely free and open source. Contribute, customize, or self-host as needed.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-accent" />
                  Structured Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Automatically organizes your files into a logical course structure for better learning flow.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderOpen className="h-5 w-5 text-primary" />
                  Any File Type
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Works with PDFs, videos, documents, images, and any file type stored in Google Drive.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-accent" />
                  Share Easily
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Share your course viewer link with students, colleagues, or anyone who needs access.
                </CardDescription>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  No Limits
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Create unlimited courses from any number of Google Drive folders. No restrictions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">Ready to Transform Your Learning Materials?</h3>
          <p className="text-xl text-muted-foreground mb-8">
            Join educators and learners who are already using Course Viewer to organize their Google Drive content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              placeholder="Paste Google Drive folder URL or ID"
              value={folderInput}
              onChange={(e) => setFolderInput(e.target.value)}
              className="flex-1 h-12 text-base"
            />
            <Button
              size="lg"
              disabled={folderInput === "" || folderInput === null || folderInput.length < 1}
              onClick={handleGoClick}
              className="h-12 px-8 flex items-center gap-2"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="font-semibold text-foreground">Course Viewer</span>
            </div>
            <div className="flex items-center gap-6">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/adityajoshi-08/course-viewer" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/adityajoshi-08/course-viewer/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Issues
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/adityajoshi-08/course-viewer/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border text-center text-sm text-muted-foreground">
            <p>Open source learning tool. Made with ❤️ for educators and learners.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
