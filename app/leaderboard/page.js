// app/leaderboard/page.js

import { teams, matches } from "../../lib/data";

function calculateStandings() {
  const standings = teams.map(team => ({
    id: team.id,
    name: team.name,
    wins: 0,
    losses: 0,
    totalStrokes: 0,
    roundsPlayed: 0,
    logo: `/logos/${team.id}.png`, // placeholder logo path
  }));

  const getTeam = (id) => standings.find(t => t.id === id);

  matches.forEach(match => {
    if (match.team1Strokes === null || match.team2Strokes === null) return;

    const t1 = getTeam(match.team1Id);
    const t2 = getTeam(match.team2Id);

    t1.totalStrokes += match.team1Strokes;
    t2.totalStrokes += match.team2Strokes;
    t1.roundsPlayed++;
    t2.roundsPlayed++;

    if (match.team1Strokes < match.team2Strokes) {
      t1.wins++;
      t2.losses++;
    } else {
      t2.wins++;
      t1.losses++;
    }
  });

  standings.forEach(team => {
    team.avg = team.roundsPlayed > 0
      ? Math.round(team.totalStrokes / team.roundsPlayed)
      : null;
  });

  return standings.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    if (a.losses !== b.losses) return a.losses - b.losses;
    if (a.avg !== b.avg) return a.avg - b.avg;
    return 0;
  });
}

export default function LeaderboardPage() {
  const standings = calculateStandings();

  return (
    <div>
      <h1>Team Leaderboard</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "1.5rem" }}>
        {standings.map((team, index) => (
          <div
            key={team.id}
            style={{
              display: "flex",
              alignItems: "center",
              background: "#f1f8e9",
              padding: "1rem",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <div style={{ fontSize: "24px", width: "40px" }}>{index + 1}</div>

            <img
              src={team.logo}
              alt={team.name}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "8px",
                marginRight: "1rem",
                objectFit: "cover",
              }}
            />

            <div style={{ flexGrow: 1 }}>
              <strong>{team.name}</strong>
              <div style={{ fontSize: "14px", color: "#555" }}>
                {team.wins}W – {team.losses}L
              </div>
            </div>

            <div style={{ fontSize: "18px", fontWeight: 600 }}>
              {team.avg !== null ? `${team.avg} avg` : "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
