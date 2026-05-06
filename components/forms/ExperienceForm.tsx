'use client'

import { useEffect, useMemo, useTransition } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Preloaded,
  useMutation,
  usePreloadedQuery,
  useQuery
} from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldSet
} from '@/components/ui/field'
import { Check, ChevronDown } from 'lucide-react'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'

const YEAR_REGEX = /^\d{4}$/
const YEAR_MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/

const temporalValueSchema = z
  .string()
  .trim()
  .refine(
    (value) => YEAR_REGEX.test(value) || YEAR_MONTH_REGEX.test(value),
    'Use YYYY or YYYY-MM format.'
  )

export const experienceFormSchema = z
  .object({
    title: z.string().min(1, 'Title is required.'),
    subTitle: z.string().optional(),
    clientId: z.string().min(1, 'Client is required.'),
    description: z.string().min(1, 'Description is required.'),
    technologies: z.array(z.string()).min(1, 'Choose at least one technology.'),
    active: z.boolean(),
    start: temporalValueSchema,
    end: z.string().optional()
  })
  .superRefine((values, ctx) => {
    const endValue = values.end?.trim()

    if (!values.active && !endValue) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end'],
        message: 'End is required unless this role is active.'
      })
      return
    }

    if (!endValue) {
      return
    }

    if (!YEAR_REGEX.test(endValue) && !YEAR_MONTH_REGEX.test(endValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end'],
        message: 'Use YYYY or YYYY-MM format.'
      })
      return
    }

    const startOrder = toTemporalOrder(values.start)
    const endOrder = toTemporalOrder(endValue)

    if (endOrder < startOrder) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['end'],
        message: 'End must be the same as or after start.'
      })
    }
  })

export type ExperienceFormValues = z.infer<typeof experienceFormSchema>

type ExperienceSubmitValue = {
  title: string
  subTitle?: string
  clientId: Id<'clients'>
  description: string
  technologies: string[]
  active: boolean
  start: string | number
  end?: string | number
}

type ExperienceFormProps = {
  preloadedExperience?: Preloaded<typeof api.experience.getExperience>
  initialValues?: Partial<ExperienceSubmitValue>
  experienceId?: Id<'experience'>
  onSubmit?: (values: ExperienceSubmitValue) => Promise<void> | void
  submitLabel?: string
}

function toTemporalOrder(value: string) {
  if (YEAR_REGEX.test(value)) {
    return Number(value) * 100
  }

  const [year, month] = value.split('-')
  return Number(year) * 100 + Number(month)
}

function toSubmitValue(value: string) {
  if (YEAR_REGEX.test(value)) {
    return Number(value)
  }

  return value
}

function stringifyTemporalValue(value?: string | number) {
  if (value === undefined || value === null) {
    return ''
  }

  return String(value)
}

export default function ExperienceForm({
  preloadedExperience,
  initialValues,
  experienceId,
  onSubmit,
  submitLabel = 'Submit'
}: ExperienceFormProps) {
  if (preloadedExperience) {
    return (
      <PreloadedExperienceForm
        preloadedExperience={preloadedExperience}
        onSubmit={onSubmit}
        submitLabel={submitLabel}
      />
    )
  }

  return (
    <ExperienceFormContent
      initialValues={initialValues}
      experienceId={experienceId}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
    />
  )
}

function PreloadedExperienceForm({
  preloadedExperience,
  onSubmit,
  submitLabel
}: {
  preloadedExperience: Preloaded<typeof api.experience.getExperience>
  onSubmit?: (values: ExperienceSubmitValue) => Promise<void> | void
  submitLabel?: string
}) {
  const experience = usePreloadedQuery(preloadedExperience)

  return (
    <ExperienceFormContent
      initialValues={experience}
      experienceId={experience._id}
      onSubmit={onSubmit}
      submitLabel={submitLabel ?? 'Update'}
    />
  )
}

function ExperienceFormContent({
  initialValues,
  experienceId,
  onSubmit,
  submitLabel = experienceId ? 'Update' : 'Submit'
}: {
  initialValues?: Partial<ExperienceSubmitValue>
  experienceId?: Id<'experience'>
  onSubmit?: (values: ExperienceSubmitValue) => Promise<void> | void
  submitLabel?: string
}) {
  const [isPending, startTransition] = useTransition()
  const createExperience = useMutation(api.experience.createExperience)
  const updateExperience = useMutation(api.experience.updateExperience)
  const clients = useQuery(api.clients.listClients, {})
  const technologies = useQuery(api.technology.listTechnologies, {})

  const clientOptions = useMemo(
    () =>
      (clients ?? [])
        .map((client) => ({ id: client._id, name: client.name }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    [clients]
  )

  const clientNameById = useMemo(
    () =>
      new Map<string, string>(
        clientOptions.map((client) => [String(client.id), client.name])
      ),
    [clientOptions]
  )

  const technologyOptions = useMemo(
    () =>
      (technologies ?? [])
        .map((technology) => technology.name)
        .filter((name, index, arr) => arr.indexOf(name) === index)
        .sort((a, b) => a.localeCompare(b)),
    [technologies]
  )

  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceFormSchema),
    defaultValues: {
      title: initialValues?.title ?? '',
      subTitle: initialValues?.subTitle ?? '',
      clientId: initialValues?.clientId ?? '',
      description: initialValues?.description ?? '',
      technologies: initialValues?.technologies ?? [],
      active: initialValues?.active ?? false,
      start: stringifyTemporalValue(initialValues?.start),
      end: stringifyTemporalValue(initialValues?.end)
    }
  })

  const isActive = form.watch('active')

  useEffect(() => {
    if (isActive) {
      form.setValue('end', '', { shouldValidate: true })
    }
  }, [isActive, form])

  async function handleSubmit(values: ExperienceFormValues) {
    const payload: ExperienceSubmitValue = {
      title: values.title,
      subTitle: values.subTitle?.trim() || undefined,
      clientId: values.clientId as Id<'clients'>,
      description: values.description,
      technologies: values.technologies,
      active: values.active,
      start: toSubmitValue(values.start),
      end: values.active
        ? undefined
        : values.end?.trim()
          ? toSubmitValue(values.end.trim())
          : undefined
    }

    startTransition(async () => {
      if (onSubmit) {
        await onSubmit(payload)
        return
      }

      if (experienceId) {
        await updateExperience({
          id: experienceId,
          body: payload
        })
        toast.success('Experience updated successfully!')
        return
      }

      await createExperience(payload)
      toast.success('Experience created successfully!')
      form.reset({
        title: '',
        subTitle: '',
        clientId: '',
        description: '',
        technologies: [],
        active: false,
        start: '',
        end: ''
      })
    })
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="experience-title">Title</FieldLabel>
              <Input
                {...field}
                id="experience-title"
                aria-invalid={fieldState.invalid}
                placeholder="Senior Software Engineer"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="subTitle"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="experience-subtitle">Sub Title</FieldLabel>
              <Input
                {...field}
                id="experience-subtitle"
                aria-invalid={fieldState.invalid}
                placeholder="Platform Team"
                autoComplete="off"
              />
              <FieldDescription>Optional.</FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="clientId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Client</FieldLabel>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between"
                    aria-invalid={fieldState.invalid}
                    disabled={!clientOptions.length}
                  >
                    {clientNameById.get(field.value) ||
                      (clientOptions.length
                        ? 'Select a client'
                        : 'No clients available')}
                    <ChevronDown className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-72">
                  <DropdownMenuLabel>Clients</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    {clientOptions.map((client) => (
                      <DropdownMenuRadioItem key={client.id} value={client.id}>
                        {client.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="experience-description">
                Description
              </FieldLabel>
              <Textarea
                {...field}
                id="experience-description"
                aria-invalid={fieldState.invalid}
                placeholder="Describe your role and impact"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="technologies"
          control={form.control}
          render={({ field, fieldState }) => {
            const selectedCount = field.value.length

            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Technologies</FieldLabel>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-between"
                      aria-invalid={fieldState.invalid}
                      disabled={!technologyOptions.length}
                    >
                      {selectedCount
                        ? `${selectedCount} selected`
                        : technologyOptions.length
                          ? 'Select technologies'
                          : 'No technologies available'}
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-72">
                    <DropdownMenuLabel>Technologies</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {technologyOptions.map((technologyName) => {
                      const isChecked = field.value.includes(technologyName)

                      return (
                        <DropdownMenuCheckboxItem
                          key={technologyName}
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange([...field.value, technologyName])
                              return
                            }

                            field.onChange(
                              field.value.filter(
                                (name) => name !== technologyName
                              )
                            )
                          }}
                        >
                          {technologyName}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
                {selectedCount > 0 && (
                  <div className="text-muted-foreground flex flex-wrap gap-2 text-sm">
                    {field.value.map((technologyName) => (
                      <span
                        key={technologyName}
                        className="bg-muted inline-flex items-center gap-1 rounded-md px-2 py-1"
                      >
                        <Check className="size-3" />
                        {technologyName}
                      </span>
                    ))}
                  </div>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />

        <FieldSet>
          <Controller
            name="active"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal">
                <Switch
                  id="experience-active"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="experience-active" className="font-normal">
                  Active
                </FieldLabel>
              </Field>
            )}
          />
        </FieldSet>

        <Controller
          name="start"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="experience-start">Start</FieldLabel>
              <Input
                {...field}
                id="experience-start"
                aria-invalid={fieldState.invalid}
                placeholder="2024 or 2024-08"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="end"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} data-disabled={isActive}>
              <FieldLabel htmlFor="experience-end">End</FieldLabel>
              <Input
                {...field}
                id="experience-end"
                aria-invalid={fieldState.invalid}
                placeholder={
                  isActive ? 'Disabled while active' : '2026 or 2026-03'
                }
                autoComplete="off"
                disabled={isActive}
              />
              <FieldDescription>
                Required when active is off. Uses YYYY or YYYY-MM.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending && <Spinner />}
          {submitLabel}
        </Button>
      </form>
    </FormProvider>
  )
}
