'use client'

import { Preloaded, usePreloadedQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { DataTable } from '@/components/DataTable'
import { ColumnDef } from '@tanstack/react-table'
import { Id } from '@/convex/_generated/dataModel'
import { EditDeleteSkillCell } from './EditDeleteSkillCell'

type Skill = {
  _id: Id<'skills'>
  name: string
  description: string
  imageUrl: string | null
}

const columns: ColumnDef<Skill>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      const imageUrl = row.original.imageUrl
      return (
        <img
          src={imageUrl!}
          alt="Client Image"
          className="h-10 w-10 rounded-full object-cover"
        />
      )
    }
  },
  {
    accessorKey: 'actions',
    header: undefined,
    maxSize: 80,
    cell: ({ row }) => <EditDeleteSkillCell<Skill> row={row} />
  }
]

export default function Skills(props: {
  preloadedSkills: Preloaded<typeof api.skills.listSkills>
}) {
  const skills = usePreloadedQuery(props.preloadedSkills)

  return <DataTable data={skills} columns={columns} />
}
