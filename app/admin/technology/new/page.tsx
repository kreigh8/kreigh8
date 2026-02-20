import TechnologyForm from '@/components/forms/TechnologyForm'

export default function CreateTechnologyPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1>New Technology</h1>

      <TechnologyForm />
    </section>
  )
}
