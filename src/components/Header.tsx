import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import Login from './Login'

function Header() {
  return (
    <header className="bg-background @container sticky top-0 border-b px-4 py-2 shadow-2xs">
      <div className="mx-auto flex items-center justify-between lg:max-w-[1400px]">
        <Link href="/">kreigh8</Link>

        <div className="flex">
          <ThemeToggle />

          <Login />
        </div>
      </div>
    </header>
  )
}

export default Header
