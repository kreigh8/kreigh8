'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from './ui/button'
import { Download } from 'lucide-react'

export default function ResumeDownloadButton() {
  const resume = useQuery(api.resume.getResume)

  const handleDownload = async () => {
    if (!resume?.resumeUrl) return

    try {
      // Create a temporary anchor element and trigger download
      const link = document.createElement('a')
      link.href = resume.resumeUrl
      link.download = resume.name as string
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Failed to download resume:', error)
    }
  }

  return (
    <Button onClick={handleDownload} disabled={!resume?.resumeUrl}>
      <Download /> Resume
    </Button>
  )
}
