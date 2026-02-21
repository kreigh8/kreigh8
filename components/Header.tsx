'use client'

import Link from 'next/link'
import Login from './Login'
import ThemeToggle from './ThemeToggle'
import { Authenticated } from 'convex/react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const currentPathname = usePathname()

  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800">
        <div className="container flex justify-between items-center mx-auto">
          <Link href="/">
            <Image
              src="/kreigh8-logo.svg"
              className="dark:invert"
              alt="kreigh8"
              width={125}
              height={40}
            />
          </Link>

          <div className="flex gap-2">
            <ThemeToggle />
            <Login />
          </div>
        </div>
      </nav>

      {currentPathname.includes('/admin') && (
        <Authenticated>
          <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex-row items-center">
            <div className="container flex justify-start mx-auto gap-4">
              <Link href="/admin">Home</Link>
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
