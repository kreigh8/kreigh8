import Sidebar from '../../components/Sidebar'
import BackButton from '../../components/BackButton'
// import Clients from '../components/Clients'

export default async function Client({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const base_url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://kreigh8.vercel.app'

  const { slug } = await params

  const data = await fetch(`${base_url}/api/clients/${slug}`)

  const { client } = await data.json()

  console.log('client#####', client)

  return (
    <div className="m-auto flex min-h-max w-full max-w-[1400px] gap-2">
      <Sidebar />
      <main className="flex w-full flex-col gap-4 p-4">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1>Client</h1>
        </div>

        <section></section>
      </main>
    </div>
  )
}
