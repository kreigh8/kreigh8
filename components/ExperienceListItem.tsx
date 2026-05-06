import type { Doc } from '@/convex/_generated/dataModel'
import { Badge } from './ui/badge'

type ExperienceListItemProps = {
  experience: Doc<'experience'>
}

export default function ExperienceListItem({
  experience
}: ExperienceListItemProps) {
  return (
    <li className="overflow-hidden rounded border p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[25%_75%]">
        <h1 className="text-sm text-muted-foreground">
          {experience.start} - {experience.end ? experience.end : 'Present'}
        </h1>

        <div className="min-w-0 flex-col px-2">
          <h3 className="text-lg font-semibold">
            {experience.title}, {experience.company}
          </h3>
          {experience.subTitle && (
            <p className="text-sm text-muted-foreground">
              {experience.subTitle}
            </p>
          )}
          <p>{experience.description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {experience.technologies.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>
        </div>
      </div>
    </li>
  )
}
