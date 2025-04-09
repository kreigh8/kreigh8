import Sidebar from '../components/Sidebar'
import Technology from '../components/Technology'

export default function ClientsHome() {
  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1400px] gap-2">
      <Sidebar />
      <main className="flex w-full flex-col gap-4 p-4">
        <h1>Technology Page</h1>

        <section>
          <Technology technologies={[]} />
        </section>
      </main>
    </div>
  )
}
