'use client'

import Link from 'next/link'
import { Authenticated } from 'convex/react'
import { usePathname } from 'next/navigation'
import { Button } from './ui/button'
import { useClerk } from '@clerk/nextjs'

export default function Header() {
  const currentPathname = usePathname()
  const { signOut } = useClerk()

  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="container flex justify-between items-center mx-auto">
          <Link href="/">
            <h1>kreigh8</h1>
          </Link>

          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ redirectUrl: '/' })}
          >
            Logout
          </Button>
        </div>
      </nav>

      {currentPathname.includes('/admin') && (
        <Authenticated>
          <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex-row items-center">
            <div className="container flex justify-start mx-auto gap-4">
              <Link href="/admin">Home</Link>
              <Link href="/admin/social">Social</Link>
              <Link href="/admin/experience">Experience</Link>
              <Link href="/admin/clients">Clients</Link>
              <Link href="/admin/resume">Resume</Link>
              <Link href="/admin/skills">Skills</Link>
              <Link href="/admin/technology">Technolgies</Link>
            </div>
          </nav>
        </Authenticated>
      )}
    </header>
  )
}
