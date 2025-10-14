import Link from 'next/link'
import Login from './Login'

export default function Header() {
  return (
    <header className="sticky top-0 z-10">
      <nav className="bg-background p-4 border-b-2 border-slate-200 dark:border-slate-800 flex flex-row justify-between items-center">
        <Link href="/">kreigh8</Link>

        <Login />
      </nav>
    </header>
  )
}
