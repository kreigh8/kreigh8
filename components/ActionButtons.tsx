import { Button } from './ui/button'

export default async function ActionButtons() {
  return (
    <div className="flex gap-4">
      <Button>Download Resume</Button>
      <Button>Hire Me!</Button>
    </div>
  )
}
