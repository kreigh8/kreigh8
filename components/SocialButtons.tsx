'use client'

import { api } from '@/convex/_generated/api'
import { Preloaded, usePreloadedQuery } from 'convex/react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import ThemeToggle from './ThemeToggle'
import { Mail } from 'lucide-react'

export default function SocialButtons(props: {
  preloadedSocialLinks: Preloaded<typeof api.social.getSocialLinks>
}) {
  const socialLinks = usePreloadedQuery(props.preloadedSocialLinks)

  return (
    <div className="flex gap-2">
      {socialLinks?.linkedIn && (
        <Button variant="ghost" size="icon" asChild>
          <a
            href={socialLinks.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Icons.linkedIn className="size-5" />
          </a>
        </Button>
      )}
      {socialLinks?.gitHub && (
        <Button variant="ghost" size="icon" asChild>
          <a
            href={socialLinks.gitHub}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <Icons.gitHub className="size-5" />
          </a>
        </Button>
      )}
      {socialLinks?.email && (
        <Button variant="ghost" size="icon" asChild>
          <a
            href={`mailto:${socialLinks.email}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email"
          >
            <Mail className="size-5" />
          </a>
        </Button>
      )}
      <ThemeToggle />
    </div>
  )
}
