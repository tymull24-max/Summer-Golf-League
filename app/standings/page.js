// app/standings/page.js

import { teams, matches } from "../../lib/data";

function calculateStandings() {
  // Create a standings map keyed by team ID
  const standings = teams.map(team => ({
    id: team.id,
    name: team.name,
    wins: 0,
    losses: 0,
    totalStrokes: 0,
    roundsPlayed: 0,
  }));

  // Helper to find team entry
  const getTeam = (id) => standings.find(t => t.id === id);

  // Process each match
  matches.forEach(match => {
    const { team1Id, team2Id, team1Strokes, team2Strokes } = match;

    // Skip matches without scores yet
    if (team1Strokes === null || team2Strokes === null) return;

    const t1 = getTeam(team1Id);
    const t2 = getTeam(team2Id);

    // Add strokes + rounds
    t1.totalStrokes += team1Strokes;
    t2.totalStrokes += team2Strokes;
    t1.roundsPlayed++;
    t2.roundsPlayed++;

    // Determine winner
    if (team1Strokes < team2Strokes) {
      t1.wins++;
      t2.losses++;
    } else {
      t2.wins++;
      t1.losses++;
    }
  });

  // Compute averages
  standings.forEach(team => {
    team.avg = team.roundsPlayed > 0
      ? Math.round(team.totalStrokes / team.roundsPlayed)
      : null;
  });

  // Sort standings:
  // 1. Most wins
  // 2. Fewest losses
  // 3. Lowest average strokes
  return standings.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (a.losses !== b.losses) return a.losses - b.losses;
    if (a.avg !== b.avg) return a.avg - b.avg;
    return 0;
  });
}

export default function StandingsPage() {
  const standings = calculateStandings();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>League Standings</h1>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #000", textAlign: "left" }}>Team</th>
            <th style={{ borderBottom: "2px solid #000" }}>Wins</th>
            <th style={{ borderBottom: "2px solid #000" }}>Losses</th>
            <th style={{ borderBottom: "2px solid #000" }}>Avg Strokes</th>
          </tr>
        </thead>

        <tbody>
          {standings.map(team => (
            <tr key={team.id}>
              <td style={{ padding: "8px 0" }}>{team.name}</td>
              <td style={{ textAlign: "center" }}>{team.wins}</td>
              <td style={{ textAlign: "center" }}>{team.losses}</td>
              <td style={{ textAlign: "center" }}>
                {team.avg !== null ? team.avg : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
