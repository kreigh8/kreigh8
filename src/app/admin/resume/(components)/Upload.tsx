'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ResumeUploadForm } from './ResumeUploadForm'

export const Upload = () => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus /> Add
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Resume</DialogTitle>
            <DialogDescription className="sr-only">
              Upload Resume
            </DialogDescription>
          </DialogHeader>
          <ResumeUploadForm setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </>
  )
}
