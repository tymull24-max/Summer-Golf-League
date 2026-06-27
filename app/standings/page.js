import { teams, matches } from "../lib/data";

function computeStandings() {
  // one entry per team
  const table = teams.map(team => ({
    teamId: team.id,
    name: team.name,
    wins: 0,
    losses: 0,
    strokesDiff: 0, // this is your +/- strokes
  }));

  const getRow = (id) => table.find(t => t.teamId === id);

  matches.forEach(m => {
    if (m.team1Strokes == null || m.team2Strokes == null) return;

    const t1 = getRow(m.team1Id);
    const t2 = getRow(m.team2Id);

    // wins / losses
    if (m.team1Strokes < m.team2Strokes) {
      t1.wins += 1;
      t2.losses += 1;
    } else if (m.team2Strokes < m.team1Strokes) {
      t2.wins += 1;
      t1.losses += 1;
    }

    // +/- strokes (negative is good)
    const diff = m.team1Strokes - m.team2Strokes;
    t1.strokesDiff += diff;      // team1 gets diff
    t2.strokesDiff -= diff;      // team2 gets opposite
  });

  // sort: wins desc, then strokesDiff asc (more negative is better)
  return table.sort(
    (a, b) => b.wins - a.wins || a.strokesDiff - b.strokesDiff
  );
}

export default function StandingsTable() {
  const table = computeStandings();

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
              <td className={row.strokesDiff < 0 ? "text-green-600" : "text-red-600"}>
                {row.strokesDiff > 0 ? `+${row.strokesDiff}` : row.strokesDiff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
