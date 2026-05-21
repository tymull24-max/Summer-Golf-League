import { schedule } from '../../lib/data'

export default function SchedulePage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">League Schedule</h2>

      <div className="bg-white shadow rounded p-4">
        {schedule.map((week) => (
          <div key={week.week} className="border-b py-2">
            <p className="font-semibold">Week {week.week}</p>
            <p>{week.date}</p>
            <p className="text-sm text-gray-600">{week.matchup}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
