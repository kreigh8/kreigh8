import { currentUser } from '@clerk/nextjs/server'
import { SignedOut, SignInButton, SignOutButton, SignedIn } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { LogOut, User } from 'lucide-react'
import { Avatar, AvatarFallback } from './ui/avatar'

export default async function Login() {
  const user = await currentUser()

  if (!user) {
    return (
      <SignedOut>
        <SignInButton>
          <Button variant="ghost" size="icon">
            <User />
            <span className="sr-only">Sign In</span>
          </Button>
        </SignInButton>
      </SignedOut>
    )
  }

  return (
    <SignedIn>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarFallback>{`${user.firstName?.charAt(0)}${user.lastName?.charAt(
            0
          )}`}</AvatarFallback>
        </Avatar>
        <SignOutButton>
          <LogOut />
        </SignOutButton>
      </div>
    </SignedIn>
  )
}
