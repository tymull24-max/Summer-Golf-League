import { teams, schedule } from '../../lib/data'

export default function AdminPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <div className="space-y-6">
        <section>
          <h3 className="font-semibold text-lg">Teams</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(teams, null, 2)}</pre>
        </section>

        <section>
          <h3 className="font-semibold text-lg">Schedule</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(schedule, null, 2)}</pre>
        </section>
      </div>
    </div>
  )
}
