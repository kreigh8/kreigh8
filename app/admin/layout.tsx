import Header from '@/components/Header'

export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <section className="container mx-auto flex flex-1 p-4">
        {children}
      </section>
    </div>
  )
}
