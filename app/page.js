"use client";
import { useState } from "react";

export default function SummerGolfLeagueWebsite() {
  const [teams, setTeams] = useState([
    { name: "Banana Hammocks", players: ["Tyler Mull", "Marco Morrison"], wins: 0, losses: 0, draws: 0, strokeDiff: 0, points: 0 },
    { name: "Smoove Operators", players: ["Paul Carr", "Grant Dzierwa"], wins: 0, losses: 0, draws: 0, strokeDiff: 0, points: 0 },
    { name: "Brown Nosers", players: ["Ben Seals", "Austin Radwanski"], wins: 0, losses: 0, draws: 0, strokeDiff: 0, points: 0 },
    { name: "The Nursery", players: ["Zach Kemmer", "Tommy Ling"], wins: 0, losses: 0, draws: 0, strokeDiff: 0, points: 0 },
    { name: "Greenside Gamblers", players: ["Max Walton", "Jackson Fitzgerald"], wins: 0, losses: 0, draws: 0, strokeDiff: 0, points: 0 },
    { name: "Shock Tops", players: ["Jack Behnfeldt", "Cole Keefer"], wins: 0, losses: 0, draws: 0, strokeDiff: 0, points: 0 },
  ]);

  const [winner, setWinner] = useState("");
  const [opponent, setOpponent] = useState("");
  const [winnerScore, setWinnerScore] = useState("");
  const [loserScore, setLoserScore] = useState("");

  function submitMatch() {
    if (!winner || !opponent || winner === opponent) return;

    const w = parseInt(winnerScore);
    const l = parseInt(loserScore);
    if (isNaN(w) || isNaN(l)) return;

    // Golf logic: lower score wins
    const diff = l - w;

    setTeams(prev =>
      prev.map(team => {
        if (team.name === winner && w < l) {
          return {
            ...team,
            wins: team.wins + 1,
            points: team.points + 3,
            strokeDiff: team.strokeDiff + diff,
          };
        }

        if (team.name === opponent && w < l) {
          return {
            ...team,
            losses: team.losses + 1,
            strokeDiff: team.strokeDiff - diff,
          };
        }

        if (w === l && (team.name === winner || team.name === opponent)) {
          return {
            ...team,
            draws: team.draws + 1,
            points: team.points + 1,
          };
        }

        return team;
      })
    );

    setWinner("");
    setOpponent("");
    setWinnerScore("");
    setLoserScore("");
  }

  const sorted = [...teams].sort((a, b) => b.points - a.points);

  const seed1 = sorted[0];
  const seed2 = sorted[1];
  const seed3 = sorted[2];
  const seed4 = sorted[3];
  const seed5 = sorted[4];
  const seed6 = sorted[5];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 text-white">

      {/* NAV BAR */}
      <nav className="w-full bg-green-900 text-white py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-10 text-base font-semibold">
          <span className="tracking-[0.25em] text-xs uppercase text-green-200">
            SUMMER 2026 GOLF LEAGUE
          </span>
          <div className="flex gap-6 ml-auto">
            <a href="#" className="hover:text-green-300">Home</a>
            <a href="#standings" className="hover:text-green-300">Standings</a>
            <a href="#submit" className="hover:text-green-300">Submit Score</a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] uppercase">
            Summer 2026 Golf League
          </h1>
          <p className="text-green-200 mt-3 text-base">
            Live standings automatically update after each match
          </p>
        </header>

        {/* STANDINGS TABLE */}
        <section id="standings" className="bg-white text-slate-900 rounded-2xl shadow-lg overflow-hidden w-full">

          <div className="px-6 py-4 border-b bg-slate-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Live Standings</h2>
            <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold">LIVE</div>
          </div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f1f5f9", borderBottom: "2px solid #cbd5e1" }}>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>Rank</th>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>Team</th>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>Players</th>
                  <th style={{ padding: "10px 40px" }}></th>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>Wins</th>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>Losses</th>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>Draws</th>
                  <th style={{ padding: "10px", borderRight: "2px solid #cbd5e1" }}>+/−</th>
                  <th style={{ padding: "10px" }}>Points</th>
                </tr>
              </thead>

              <tbody>
                {sorted.map((team, index) => (
                  <tr key={team.name} style={{ borderBottom: "2px solid #cbd5e1" }}>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", fontWeight: "600" }}>#{index + 1}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", fontWeight: "700" }}>{team.name}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", color: "#475569" }}>{team.players.join(" & ")}</td>
                    <td style={{ padding: "12px 40px" }}></td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center" }}>{team.wins}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center" }}>{team.losses}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center" }}>{team.draws}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center", fontWeight: "600" }}>{team.strokeDiff}</td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: "700", color: "#166534" }}>{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 50/50 SPLIT SECTION */}
        <section id="submit" className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* LEFT HALF — UPLOAD SCORE TABLE */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg flex justify-center flex-col h-full">
            <div style={{ width: "100%", maxWidth: "420px" }}>
              <h2 className="text-2xl font-bold mb-4">Submit Match Result</h2>

              <div
                style={{
                  width: "100%",
                  border: "2px solid #cbd5e1",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <tbody>
                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600", width: "30%", background: "#f8fafc" }}>
                        Winning Team
                      </td>
                      <td style={{ padding: "12px" }}>
                        <select
                          value={winner}
                          onChange={e => setWinner(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <option>Select Winning Team</option>
                          {teams.map(team => (
                            <option key={team.name}>{team.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600", background: "#f8fafc" }}>
                        Winner Score
                      </td>
                      <td style={{ padding: "12px" }}>
                        <input
                          type="number"
                          value={winnerScore}
                          onChange={e => setWinnerScore(e.target.value)}
                          placeholder="Enter winner score"
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600", background: "#f8fafc" }}>
                        Opponent
                      </td>
                      <td style={{ padding: "12px" }}>
                        <select
                          value={opponent}
                          onChange={e => setOpponent(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <option>Select Opponent</option>
                          {teams.map(team => (
                            <option key={team.name}>{team.name}</option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600", background: "#f8fafc" }}>
                        Loser Score
                      </td>
                      <td style={{ padding: "12px" }}>
                        <input
                          type="number"
                          value={loserScore}
                          onChange={e => setLoserScore(e.target.value)}
                          placeholder="Enter loser score"
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                          }}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={submitMatch}
                className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl text-sm transition-colors mt-4"
              >
                Upload Final Score
              </button>
            </div>
          </div>

          {/* RIGHT HALF — BRACKET TABLE */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg flex justify-center flex-col h-full">
            <div style={{ width: "100%", maxWidth: "420px" }}>
              <h2 className="text-2xl font-bold mb-4">Tournament Bracket</h2>

              <div
                style={{
                  width: "100%",
                  border: "2px solid #cbd5e1",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <tbody>
                    {/* Play-In Round */}
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "700" }}>Play‑In Round</td>
                      <td></td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600" }}>
                        #{sorted.indexOf(seed3) + 1} {seed3.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs #{sorted.indexOf(seed6) + 1} {seed6.name}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600" }}>
                        #{sorted.indexOf(seed4) + 1} {seed4.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs #{sorted.indexOf(seed5) + 1} {seed5.name}
                      </td>
                    </tr>

                    {/* Semifinals */}
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "700" }}>Semifinals</td>
                      <td></td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600" }}>
                        #{sorted.indexOf(seed1) + 1} {seed1.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs Winner of #{sorted.indexOf(seed4) + 1} / #{sorted.indexOf(seed5) + 1}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "600" }}>
                        #{sorted.indexOf(seed2) + 1} {seed2.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs Winner of #{sorted.indexOf(seed3) + 1} / #{sorted.indexOf(seed6) + 1}
                      </td>
                    </tr>

                    {/* Championship */}
                    <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                      <td style={{ padding: "12px", fontWeight: "700" }}>Championship</td>
                      <td></td>
                    </tr>

                    <tr>
                      <td style={{ padding: "12px", fontWeight: "600" }}>Winner</td>
                      <td style={{ padding: "12px" }}>________________________</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
