'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  // If user preference is "system", toggle from the resolved OS theme.
  const effectiveTheme = theme === 'system' ? resolvedTheme : theme

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(effectiveTheme === 'dark' ? 'light' : 'dark')}
    >
      <Sun className="hidden dark:block text-primary" />
      <Moon className="block dark:hidden text-primary" />
    </Button>
  )
}
