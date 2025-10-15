import ClientForm from '@/components/forms/TechnologyForm'

export default function EditTechnologyPage({
  params
}: {
  params: { id: string }
}) {
  const { id } = params

  console.log('id', id)

  return (
    <section className="flex flex-col gap-4">
      <h1>Edit Client</h1>

      <ClientForm />
    </section>
  )
}
