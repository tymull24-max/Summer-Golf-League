export default function Home() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Welcome to the Summer Golf League</h2>
      <p className="text-gray-700">
        Track weekly matchups, team standings, and submit your scores online.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href="/schedule" className="p-4 bg-white shadow rounded">View Schedule</a>
        <a href="/teams" className="p-4 bg-white shadow rounded">Team Stats</a>
        <a href="/submit-score" className="p-4 bg-white shadow rounded">Submit Score</a>
        <a href="/admin" className="p-4 bg-white shadow rounded">Admin Dashboard</a>
      </div>
    </div>
  )
}
