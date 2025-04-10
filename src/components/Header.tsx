import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import Login from './Login'

function Header() {
  return (
    <div className="@container px-4 py-2">
      <header className="mx-auto flex justify-between lg:max-w-[1400px]">
        <Link href="/">kreigh8</Link>

        <div className="flex">
          <ThemeToggle />

          <Login />
        </div>
      </header>
    </div>
  )
}

export default Header
