'use client'

import Link from 'next/link'
import Login from './Login'
import ThemeToggle from './ThemeToggle'
import { Authenticated } from 'convex/react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const currentPathname = usePathname()

  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <Link href="/">kreigh8</Link>

        <div className="flex gap-2">
          <ThemeToggle />
          <Login />
        </div>
      </nav>

      {currentPathname.includes('/admin') && (
        <Authenticated>
          <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex-row items-center">
            <div className="container flex justify-start mx-auto gap-4">
              <Link href="/admin">Home</Link>
              <Link href="/admin/clients">Clients</Link>
              <Link href="/admin/technologies">Technolgies</Link>
            </div>
          </nav>
        </Authenticated>
      )}
    </header>
  )
}
