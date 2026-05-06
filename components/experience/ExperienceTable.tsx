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
    header: 'Title'
  },
  {
    accessorKey: 'subTitle',
    header: 'SubTitle'
  },
  {
    accessorKey: 'clientName',
    header: 'Company'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'startYear',
    header: 'Start Year'
  },
  {
    accessorKey: 'endYear',
    header: 'End Year'
  },
  {
    accessorKey: 'technologies',
    header: 'Technologies'
  },
  {
    accessorKey: 'active',
    header: 'Active',
    cell: ({ row }) => {
      if (row.original.active) {
        return <Check />
      } else {
        return <X />
      }
    }
  },
  {
    accessorKey: 'actions',
    header: undefined,
    maxSize: 80,
    cell: ({ row }) => <EditDeleteExperienceCell<Experience> row={row} />
  }
]

export default function ExperienceTable(props: {
  preloadedExperience: Preloaded<typeof api.experience.listExperience>
}) {
  const experience = usePreloadedQuery(props.preloadedExperience)

  return <DataTable data={experience} columns={columns} />
}
