'use client'

import { MouseEvent, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { CircleSmall, InfinityIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'clients', label: 'Clients' }
] as const

export default function NavigationButtons() {
  const [activeId, setActiveId] = useState<string>(NAV_ITEMS[0].id)

  const sectionIds = useMemo(() => NAV_ITEMS.map((item) => item.id), [])

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    if (!sections.length) {
      return
    }

    const hashId = window.location.hash.replace('#', '')
    if (hashId && NAV_ITEMS.some((item) => item.id === hashId)) {
      setActiveId(hashId)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  function handleNavClick(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    setActiveId(id)

    const section = document.getElementById(id)
    if (!section) {
      return
    }

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    section.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start'
    })

    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeId === item.id
          const Indicator = isActive ? InfinityIcon : CircleSmall

          return (
            <li key={item.id}>
              <Link
                href={`#${item.id}`}
                className={cn(
                  'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors',
                  isActive && 'text-foreground font-medium'
                )}
                onClick={(event) => handleNavClick(event, item.id)}
              >
                <Indicator
                  aria-hidden
                  className={cn(
                    'size-4 transition-transform',
                    isActive && 'text-primary scale-105'
                  )}
                />
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
