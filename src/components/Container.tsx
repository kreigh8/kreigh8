import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div className={cn('@container', className)}>
      <div className="m-auto flex lg:max-w-[1400px]">{children}</div>
    </div>
  )
}

export default Container
