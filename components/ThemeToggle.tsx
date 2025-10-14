'use client'

import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <Sun className="hidden dark:block" />
      <Moon className="block dark:hidden" />
    </Button>
  )
}
