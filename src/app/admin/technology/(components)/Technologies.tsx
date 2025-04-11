import { DataTable } from '@/components/DataTable'
import { getTechnologies } from '@/lib/actions/get-tech'
import { TechColumns } from './TechColumns'
// import { ITechnology } from '@/model/Technology'

async function Technologies() {
  const technologies = await getTechnologies()

  return (
    <article className="mt-4">
      <DataTable columns={TechColumns} data={technologies} />
    </article>
  )
}

export default Technologies
