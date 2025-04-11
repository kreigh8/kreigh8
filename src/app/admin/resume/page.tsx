import AdminSidebar from '@/components/AdminSidebar'
import ResumeList from './(components)/ResumeList'
import { Upload } from './(components)/Upload'

function ResumePage() {
  return (
    <main className="flex h-full min-h-[calc(100svh-53px)]">
      <AdminSidebar />
      <section className="flex w-full flex-col p-4">
        <div className="flex items-center justify-between">
          <h1>Resume Upload</h1>

          <Upload />
        </div>

        <article className="mt-4 w-full">
          <ResumeList />
        </article>
      </section>
    </main>
  )
}

export default ResumePage
