import Link from 'next/link'

export default function NavigationButtons() {
  return (
    <div className="flex flex-col gap-4">
      <ul>
        <li>
          <Link href="#about">About</Link>
        </li>
        <li>
          <Link href="#clients">Projects</Link>
        </li>
      </ul>
    </div>
  )
}
