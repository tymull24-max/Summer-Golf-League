import { teams, matches } from "../lib/data";

function computePlayerStats() {
  const players = [];

  // Initialize players
  teams.forEach((team) => {
    team.players.forEach((p) => {
      players.push({
        name: p,
        teamName: team.name,
        rounds: 0,
        totalStrokes: 0,
      });
    });
  });

  // Assign strokes to each player (team score shared)
  matches.forEach((m) => {
    if (m.team1Strokes == null || m.team2Strokes == null) return;

    const t1 = teams.find((t) => t.id === m.team1Id);
    const t2 = teams.find((t) => t.id === m.team2Id);

    t1.players.forEach((p) => {
      const ps = players.find((x) => x.name === p);
      ps.rounds += 1;
      ps.totalStrokes += m.team1Strokes;
    });

    t2.players.forEach((p) => {
      const ps = players.find((x) => x.name === p);
      ps.rounds += 1;
      ps.totalStrokes += m.team2Strokes;
    });
  });

  return players
    .filter((p) => p.rounds > 0)
    .map((p) => ({
      ...p,
      avg: p.totalStrokes / p.rounds,
    }))
    .sort((a, b) => a.avg - b.avg);
}

export default function Leaderboard() {
  const rows = computePlayerStats();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Player Leaderboard</h2>

      {rows.length === 0 ? (
        <p className="text-gray-500">No rounds recorded yet.</p>
      ) : (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">Player</th>
              <th>Team</th>
              <th>Rounds</th>
              <th>Avg Strokes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.name} className="border-b">
                <td className="py-2">{p.name}</td>
                <td>{p.teamName}</td>
                <td>{p.rounds}</td>
                <td>{p.avg.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
