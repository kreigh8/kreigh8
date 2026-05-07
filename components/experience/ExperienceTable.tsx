'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Check, X } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'
import { EditDeleteExperienceCell } from './EditDeleteExperience'

type Experience = {
  _id: Id<'experience'>
  title: string
  subTitle?: string
  clientName: string
  description: string
  start: number | string
  end?: number | string
  active: boolean
  technologies: string[]
}

const columns: ColumnDef<Experience>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    size: 140,
    cell: ({ getValue }) => (
      <span className="block truncate" title={getValue<string>()}>
        {getValue<string>()}
      </span>
    )
  },
  {
    accessorKey: 'subTitle',
    header: 'SubTitle',
    size: 110,
    cell: ({ getValue }) => (
      <span className="block truncate" title={getValue<string>()}>
        {getValue<string>()}
      </span>
    )
  },
  {
    accessorKey: 'clientName',
    header: 'Company',
    size: 110,
    cell: ({ getValue }) => (
      <span className="block truncate" title={getValue<string>()}>
        {getValue<string>()}
      </span>
    )
  },
  {
    accessorKey: 'description',
    header: 'Description',
    size: 160,
    cell: ({ getValue }) => (
      <span className="block truncate" title={getValue<string>()}>
        {getValue<string>()}
      </span>
    )
  },
  {
    accessorKey: 'start',
    header: 'Start',
    size: 70
  },
  {
    accessorKey: 'end',
    header: 'End',
    size: 70
  },
  {
    accessorKey: 'technologies',
    header: 'Technologies',
    size: 120,
    cell: ({ getValue }) => {
      const techs = getValue<string[]>()
      const preview = techs.slice(0, 2).join(', ')
      const title = techs.join(', ')
      return (
        <span className="block truncate" title={title}>
          {preview}
          {techs.length > 2 ? ` +${techs.length - 2}` : ''}
        </span>
      )
    }
  },
  {
    accessorKey: 'active',
    header: 'Active',
    size: 60,
    cell: ({ row }) =>
      row.original.active ? (
        <Check className="mx-auto" />
      ) : (
        <X className="mx-auto" />
      )
  },
  {
    accessorKey: 'actions',
    header: undefined,
    size: 90,
    cell: ({ row }) => <EditDeleteExperienceCell<Experience> row={row} />
  }
]

export default function ExperienceTable(props: {
  preloadedExperience: Preloaded<typeof api.experience.listExperience>
}) {
  const experience = usePreloadedQuery(props.preloadedExperience)

  return <DataTable data={experience} columns={columns} />
}
