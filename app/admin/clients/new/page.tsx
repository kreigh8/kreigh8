import ClientForm from '@/components/forms/ClientForm'

export default function CreateClientPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1>New Client</h1>

      <ClientForm />
    </section>
  )
}
