'use client'

import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme()

  const [hasMounted, setHasMounted] = useState(false) // <-- add this

  useEffect(() => {
    setHasMounted(true) // <-- toggle on client-side, because useEffect doesn't run on server-side/during SSG build
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(() => (theme === 'light' ? 'dark' : 'light'))}
      suppressHydrationWarning
    >
      {hasMounted && theme === 'light' ? (
        <Sun suppressHydrationWarning />
      ) : (
        <Moon suppressHydrationWarning />
      )}
      <span className="sr-only">Toggle Theme</span>
    </Button>
  )
}

export default ThemeToggle
