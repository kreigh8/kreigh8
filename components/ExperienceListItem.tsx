import { Id } from '@/convex/_generated/dataModel'
import { Badge } from './ui/badge'

type ExperienceListItemProps = {
  experience: {
    _id: Id<'experience'>
    start: string | number
    end?: string | number
    title: string
    subTitle?: string
    description: string
    technologies: string[]
    clientName: string
    clientUrl?: string
  }
}

export default function ExperienceListItem({
  experience
}: ExperienceListItemProps) {
  const cardContent = (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[25%_75%]">
      <h1 className="text-sm text-muted-foreground">
        {experience.start} - {experience.end ? experience.end : 'Present'}
      </h1>

      <div className="min-w-0 flex-col px-2">
        <h3 className="text-lg font-semibold text-primary-foreground">
          {experience.title}, {experience.clientName}
        </h3>
        {experience.subTitle && (
          <p className="text-sm text-muted-foreground">{experience.subTitle}</p>
        )}
        <p>{experience.description}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {experience.technologies.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <li className="overflow-hidden rounded border p-4">
      {experience.clientUrl ? (
        <a
          href={experience.clientUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      ) : (
        cardContent
      )}
    </li>
  )
}
