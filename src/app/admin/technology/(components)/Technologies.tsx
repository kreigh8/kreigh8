import { getTechnologies } from '@/lib/actions/get-tech'
import { ITechnology } from '@/model/Technology'

async function Technologies() {
  const technologies = await getTechnologies()
  return (
    <div>
      {technologies.map((technology: ITechnology) => {
        return <p key={technology._id}>{technology.techName}</p>
      })}
    </div>
  )
}

export default Technologies
