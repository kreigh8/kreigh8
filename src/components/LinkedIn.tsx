import { Linkedin } from 'lucide-react'

function LinkedIn() {
  return (
    <a
      href="https://www.linkedin.com/in/kreigh-hirschy-2018b212/"
      target="_blank"
      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive hover:bg-accent-background hover:text-accent-foreground dark:hover:bg-accent/50 inline-flex size-9 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
    >
      <Linkedin />
    </a>
  )
}

export default LinkedIn
