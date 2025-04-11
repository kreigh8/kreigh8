'use client'

import { Button } from '@/components/ui/button'
import { deleteResume } from '@/lib/actions/resume/delete-resume'
import { Trash } from 'lucide-react'

type Props = {
  resume: {
    name: string
    extension: string
    fileSizeInBytes: number
    dateOfUpload: Date
  }
}

export function ResumeCard({ resume }: Props) {
  const handleDeleteResume = (resumeName: string) => {
    deleteResume(resumeName)
  }

  return (
    <div>
      <span>{resume.name}</span>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => handleDeleteResume(resume.name)}
      >
        <Trash />
      </Button>
    </div>
  )
}
