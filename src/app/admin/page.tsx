import Sidebar from './components/Sidebar'

export default function Home() {
  return (
    <div className="m-auto flex min-h-screen w-full max-w-[1400px] gap-2">
      <Sidebar />
      <main className="p-4">
        <h1>Dashboard Page</h1>
      </main>
    </div>
  )
}
