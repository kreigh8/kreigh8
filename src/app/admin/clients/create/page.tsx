import BackButton from '../../components/BackButton'

const CreateClient = () => {
  return (
    <div className="m-auto my-4 flex min-h-max w-full max-w-[1400px] gap-2">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <BackButton />
          <h1>Create Client</h1>
        </div>
      </div>
    </div>
  )
}

export default CreateClient
