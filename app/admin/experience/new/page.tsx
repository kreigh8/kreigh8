import ExperienceForm from '@/components/forms/ExperienceForm'

export default function CreateExperiencePage() {
  return (
    <section className="flex flex-col gap-4">
      <h1>New Experience</h1>

      <ExperienceForm />
    </section>
  )
}
