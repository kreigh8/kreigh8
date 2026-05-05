'use client'

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel
} from '@/components/ui/field'
import { MinimalTiptapEditor } from '../ui/minimal-tiptap'

interface FormMinimalTiptapFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>
  name: Path<TFieldValues>
  label: string
  description?: string
  placeholder?: string
  id?: string
  className?: string
  editorContentClassName?: string
}

export function FormMinimalTiptapField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  placeholder,
  id,
  className,
  editorContentClassName
}: FormMinimalTiptapFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>{label}</FieldLabel>
          <MinimalTiptapEditor
            value={field.value ?? ''}
            onChange={field.onChange}
            onBlur={() => field.onBlur()}
            output="html"
            placeholder={placeholder}
            className={className}
            editorContentClassName={editorContentClassName}
          />
          {description ? (
            <FieldDescription>{description}</FieldDescription>
          ) : null}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
