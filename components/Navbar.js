import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="font-bold text-xl">Summer Golf League</h1>
        <div className="space-x-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/schedule">Schedule</Link>
          <Link href="/teams">Team Stats</Link>
          <Link href="/submit-score">Submit Score</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </div>
    </nav>
  )
}
