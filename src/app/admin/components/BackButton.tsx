'use client'

import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function BackButton() {
  const router = useRouter()

  return (
    <Button variant="secondary" onClick={() => router.back()}>
      <MoveLeft /> Back
    </Button>
  )
}

export default BackButton
