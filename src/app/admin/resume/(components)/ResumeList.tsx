import { Button } from '@/components/ui/button'
import { deleteResume } from '@/lib/actions/resume/delete-resume'
import { getResumes } from '@/lib/actions/resume/get-resume'
import { Trash } from 'lucide-react'
import { ResumeCard } from './ResumeCard'

async function ResumeList() {
  const resumes = await getResumes()

  return (
    <article className="mt-4">
      <div className="flex flex-col gap-4">
        {resumes.map((resume, index) => (
          <ResumeCard key={index} resume={resume} />
        ))}
      </div>
    </article>
  )
}

export default ResumeList
