'use client'

import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

export default function AdminPage() {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  if (!isSignedIn) {
    return <p>Sign in...</p>
  }

  return <p>Admin</p>
}
