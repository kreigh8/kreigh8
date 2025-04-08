import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'

const Header = () => {
  return (
    <header className="@container sticky top-0 border-b py-4 shadow-2xs">
      <div className="m-auto flex justify-between lg:px-4 @lg:max-w-[1400px]">
        <Link href="/">kreigh8</Link>

        <div className="flex gap-2">
          <ThemeToggle />

          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}

export default Header
