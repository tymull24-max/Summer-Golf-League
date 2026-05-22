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

    const diff = l - w;

    setTeams(prev =>
      prev.map(team => {
        if (team.name === winner && w < l) {
          return { ...team, wins: team.wins + 1, points: team.points + 3, strokeDiff: team.strokeDiff + diff };
        }
        if (team.name === opponent && w < l) {
          return { ...team, losses: team.losses + 1, strokeDiff: team.strokeDiff - diff };
        }
        if (w === l && (team.name === winner || team.name === opponent)) {
          return { ...team, draws: team.draws + 1, points: team.points + 1 };
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #022c22, #064e3b, #065f46)",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          width: "100%",
          backgroundColor: "#064e3b",
          color: "white",
          padding: "40px 0",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          borderBottom: "4px solid #047857",
        }}
      >
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
          <h1 style={{ fontSize: "56px", fontWeight: 900, letterSpacing: "0.08em" }}>
            2026 Summer Golf League
          </h1>

          <div
            style={{
              width: "260px",
              height: "8px",
              backgroundColor: "#6ee7b7",
              marginTop: "16px",
              marginBottom: "24px",
              borderRadius: "999px",
            }}
          ></div>

          <nav style={{ display: "flex", gap: "32px", fontSize: "20px", fontWeight: 600, color: "#bbf7d0" }}>
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
            <a href="#standings" style={{ color: "inherit", textDecoration: "none" }}>Standings</a>
            <a href="#schedule" style={{ color: "inherit", textDecoration: "none" }}>Schedule</a>
            <a href="#submit" style={{ color: "inherit", textDecoration: "none" }}>Submit Score</a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main style={{ maxWidth: "1120px", margin: "0 auto", padding: "40px 16px 60px" }}>
        
        {/* FULL-WIDTH STANDINGS */}
        <section
          id="standings"
          style={{
            backgroundColor: "white",
            color: "#0f172a",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            overflow: "hidden",
            width: "100%",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e2e8f0",
              backgroundColor: "#f1f5f9",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: 800 }}>Live Standings</h2>
            <div
              style={{
                backgroundColor: "#dcfce7",
                color: "#166534",
                padding: "4px 16px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 800,
              }}
            >
              LIVE
            </div>
          </div>

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
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
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", fontWeight: 600 }}>#{index + 1}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", fontWeight: 700 }}>{team.name}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", color: "#475569" }}>
                      {team.players.join(" & ")}
                    </td>
                    <td style={{ padding: "12px 40px" }}></td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center" }}>{team.wins}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center" }}>{team.losses}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center" }}>{team.draws}</td>
                    <td style={{ padding: "12px", borderRight: "2px solid #cbd5e1", textAlign: "center", fontWeight: 600 }}>
                      {team.strokeDiff}
                    </td>
                    <td style={{ padding: "12px", textAlign: "center", fontWeight: 700, color: "#166534" }}>
                      {team.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SUBMIT SCORE — CENTERED */}
        <section style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          <div
            style={{
              backgroundColor: "white",
              color: "#0f172a",
              borderRadius: "16px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
              padding: "24px",
              width: "100%",
              maxWidth: "420px",
            }}
          >
            <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "16px" }}>
              Submit Match Result
            </h2>

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
                    <td style={{ padding: "12px", fontWeight: 600, background: "#f8fafc", width: "30%" }}>
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
                    <td style={{ padding: "12px", fontWeight: 600, background: "#f8fafc" }}>
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
                    <td style={{ padding: "12px", fontWeight: 600, background: "#f8fafc" }}>
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
                    <td style={{ padding: "12px", fontWeight: 600, background: "#f8fafc" }}>
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
              style={{
                marginTop: "16px",
                width: "100%",
                backgroundColor: "#065f46",
                color: "white",
                fontWeight: 600,
                padding: "12px",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Upload Final Score
            </button>
          </div>
        </section>

        {/* FULL-WIDTH BRACKET */}
        <section
          style={{
            backgroundColor: "white",
            color: "#0f172a",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            padding: "24px",
            width: "100%",
          }}
        >
          <h2 style={{ fontSize: "24px", fontWeight: 800, marginBottom: "16px" }}>
            Tournament Bracket
          </h2>

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
                {/* Play-In */}
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 700 }}>Play‑In Round</td>
                  <td></td>
                </tr>

                <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 600 }}>
                    #{sorted.indexOf(seed3) + 1} {seed3.name}
                  </td>
                  <td style={{ padding: "12px" }}>
                    vs #{sorted.indexOf(seed6) + 1} {seed6.name}
                  </td>
                </tr>

                <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 600 }}>
                    #{sorted.indexOf(seed4) + 1} {seed4.name}
                  </td>
                  <td style={{ padding: "12px" }}>
                    vs #{sorted.indexOf(seed5) + 1} {seed5.name}
                  </td>
                </tr>

                {/* Semifinals */}
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 700 }}>Semifinals</td>
                  <td></td>
                </tr>

                <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 600 }}>
                    #{sorted.indexOf(seed1) + 1} {seed1.name}
                  </td>
                  <td style={{ padding: "12px" }}>
                    vs Winner of #{sorted.indexOf(seed4) + 1} / #{sorted.indexOf(seed5) + 1}
                  </td>
                </tr>

                <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 600 }}>
                    #{sorted.indexOf(seed2) + 1} {seed2.name}
                  </td>
                  <td style={{ padding: "12px" }}>
                    vs Winner of #{sorted.indexOf(seed3) + 1} / #{sorted.indexOf(seed6) + 1}
                  </td>
                </tr>

                {/* Championship */}
                <tr style={{ background: "#f8fafc", borderBottom: "2px solid #cbd5e1" }}>
                  <td style={{ padding: "12px", fontWeight: 700 }}>Championship</td>
                  <td></td>
                </tr>

                <tr>
                  <td style={{ padding: "12px", font
