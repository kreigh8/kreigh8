'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import { Button } from '@/components/ui/button'
import { LogIn, LogOutIcon, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignOutButton } from '@clerk/clerk-react'

export default function Login() {
  const router = useRouter()

  return (
    <>
      <Authenticated>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/admin')}
            variant="outline"
            size="icon"
          >
            <Settings />
          </Button>
          <SignOutButton>
            <Button variant="outline" size="icon">
              <LogOutIcon />
            </Button>
          </SignOutButton>
        </div>
      </Authenticated>

      <Unauthenticated>
        <Button
          variant="outline"
          onClick={() => router.push('/sign-in')}
          size="icon"
        >
          <LogIn />
        </Button>
      </Unauthenticated>
    </>
  )
}
