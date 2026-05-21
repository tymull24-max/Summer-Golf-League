import { teams, standings } from "../lib/data";

export default function StandingsTable() {
  const table = standings
    .map((s) => {
      const team = teams.find((t) => t.id === s.teamId);
      return {
        name: team.name,
        wins: s.wins,
        losses: s.losses,
        strokes: s.strokes,
      };
    })
    .sort((a, b) => b.wins - a.wins || a.strokes - b.strokes);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">League Standings</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Team</th>
            <th>W</th>
            <th>L</th>
            <th>+/– Strokes</th>
          </tr>
        </thead>
        <tbody>
          {table.map((row, i) => (
            <tr key={i} className="border-b">
              <td className="py-2">{row.name}</td>
              <td>{row.wins}</td>
              <td>{row.losses}</td>
              <td className={row.strokes < 0 ? "text-green-600" : "text-red-600"}>
                {row.strokes > 0 ? `+${row.strokes}` : row.strokes}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
