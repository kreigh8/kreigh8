import SkillForm from '@/components/forms/SkillForm'

export default function CreateSkillPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1>New Skill</h1>

      <SkillForm />
    </section>
  )
}
