import { Button } from './ui/button'
import ResumeDownloadButton from './ResumeButton'

export default function ActionButtons() {
  return (
    <div className="flex gap-4">
      <ResumeDownloadButton />
      <Button>Contact Me!</Button>
    </div>
  )
}
