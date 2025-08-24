"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import React from "react"

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

    router.push(`/view/${folderID}`)
  }

  return (
    <div>
      <Input
        placeholder="Folder ID or URL"
        value={folderInput}
        onChange={(e) => setFolderInput(e.target.value)}
        className="w-full max-w-xs"
      />
      <Button
        className="ml-2"
        disabled={folderInput == "" || folderInput == null || folderInput.length < 1}
        onClick={handleGoClick}
      >
        Go
      </Button>
    </div>
  )
}
