'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

export default function ResumeDownloadButton() {
  const resume = useQuery(api.resume.getResume)

  if (!resume?.resumeUrl) {
    return null
  }

  return (
    <Button variant="ghost" size="icon" asChild>
      <a
        href="/resume/download"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download resume"
      >
        <Download className="size-5 text-primary" />
      </a>
    </Button>
  )
}
