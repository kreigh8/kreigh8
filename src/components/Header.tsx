import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import Login from './Login'
import LinkedIn from './LinkedIn'

function Header() {
  return (
    <header className="bg-background @container sticky top-0 z-10 overflow-hidden border-b px-4 py-2 shadow-2xs">
      <div className="mx-auto flex items-center justify-between lg:max-w-[1400px]">
        <Link href="/">kreigh8</Link>

        <div className="flex gap-2">
          <LinkedIn />
          <ThemeToggle />

          <Login />
        </div>
      </div>
    </header>
  )
}

export default Header
