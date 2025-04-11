import { getResumes } from '@/lib/actions/resume/get-resume'
import { DataTable } from '@/components/DataTable'
import { ResumeTableColumns } from './ResumeColumns'

async function ResumeList() {
  const resumes = await getResumes()

  return (
    <article className="mt-4">
      <div className="flex flex-col gap-4">
        <DataTable columns={ResumeTableColumns} data={resumes} />
      </div>
    </article>
  )
}

export default ResumeList
