'use client'

import { Authenticated, Unauthenticated } from 'convex/react'
import Link from 'next/link'
import { SignUpButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Login from '@/components/Login'

export default function Home() {
  return (
    <>
      <main className="p-8 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-center">
          Convex + Next.js + Clerk
        </h1>
        <Authenticated>
          <p>Test</p>
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  )
}

function SignInForm() {
  const router = useRouter()
  return (
    <div className="flex flex-col gap-8 w-96 mx-auto">
      <p>Log in to see the numbers</p>
      <Button onClick={() => router.push('/sign-in')}>Sign in</Button>
      <SignUpButton mode="modal">
        <button className="bg-foreground text-background px-4 py-2 rounded-md">
          Sign up
        </button>
      </SignUpButton>
    </div>
  )
}
