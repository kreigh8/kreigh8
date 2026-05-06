import Link from 'next/link'

export default function NavigationButtons() {
  return (
    <div className="flex flex-col gap-4">
      <ul>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#experience">Experience</Link>
        </li>
        <li>
          <Link href="#clients">Clients</Link>
        </li>
      </ul>
    </div>
  )
}
