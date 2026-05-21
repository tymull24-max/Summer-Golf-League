import { teams } from '../../lib/data'

export default function TeamsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Team Stats</h2>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-green-700 text-white">
          <tr>
            <th className="p-2">Team</th>
            <th className="p-2">Wins</th>
            <th className="p-2">Losses</th>
            <th className="p-2">Avg Score</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((t) => (
            <tr key={t.name} className="border-b text-center">
              <td className="p-2">{t.name}</td>
              <td className="p-2">{t.wins}</td>
              <td className="p-2">{t.losses}</td>
              <td className="p-2">{t.avg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
