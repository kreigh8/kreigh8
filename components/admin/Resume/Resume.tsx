import ResumeForm from '@/components/forms/ResumeForm'

export default async function Resume() {
  return (
    <section className="flex flex-col gap-4">
      <h1>Resume</h1>

      <ResumeForm />
    </section>
  )
}
