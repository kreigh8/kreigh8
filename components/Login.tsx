import { Authenticated, Unauthenticated } from 'convex/react'
import { Button } from '@/components/ui/button'
import { LogIn, LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { SignOutButton } from '@clerk/clerk-react'

export default function Login() {
  const router = useRouter()

  return (
    <>
      <Authenticated>
        <SignOutButton>
          <Button size="icon" variant="outline">
            <LogOutIcon />
          </Button>
        </SignOutButton>
      </Authenticated>

      <Unauthenticated>
        <Button onClick={() => router.push('/sign-in')} size="icon">
          <LogIn />
        </Button>
      </Unauthenticated>
    </>
  )
}
