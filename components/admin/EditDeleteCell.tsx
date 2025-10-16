import { useState } from 'react'

export function EditDeleteCell({ row, getValue }) {
  const [value, setValue] = useState(getValue())

  return <p>Cell</p>
}
