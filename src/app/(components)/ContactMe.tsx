import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog'

function ContactMe() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-fit">Contact Me</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Contact Me</DialogTitle>
        <DialogDescription className="text-black dark:text-white">
          Let&apos;s work together! Drop me a line and I&apos;ll get back to you
          in a timely manner.
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" type="button">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ContactMe
