"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DEFAULT_PLAYERS = {
  "Banana Hammocks": ["Tyler Mull", "Marco Morrison"],
  "Smoove Operators": ["Paul Carr", "Grant Dzierwa"],
  "Brown Nosers": ["Ben Seals", "Austin Radwanski"],
  "The Nursery": ["Zach Kemmer", "Tommy Ling"],
  "Greenside Gamblers": ["Max Walton", "Jackson Fitzgerald"],
  "Shock Tops": ["Jack Behnfeldt", "Cole Keefer"],
};

const DEFAULT_TEAMS_FALLBACK = [
  { name: "Banana Hammocks", wins: 0, losses: 0, draws: 0, stroke_diff: 0, points: 0 },
  { name: "Smoove Operators", wins: 0, losses: 0, draws: 0, stroke_diff: 0, points: 0 },
  { name: "Brown Nosers", wins: 0, losses: 0, draws: 0, stroke_diff: 0, points: 0 },
  { name: "The Nursery", wins: 0, losses: 0, draws: 0, stroke_diff: 0, points: 0 },
  { name: "Greenside Gamblers", wins: 0, losses: 0, draws: 0, stroke_diff: 0, points: 0 },
  { name: "Shock Tops", wins: 0, losses: 0, draws: 0, stroke_diff: 0, points: 0 },
];

export default function SummerGolfLeagueWebsite() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState(""); // feedback message

  const [winner, setWinner] = useState("");
  const [opponent, setOpponent] = useState("");
  const [winnerScore, setWinnerScore] = useState("");
  const [loserScore, setLoserScore] = useState("");

  useEffect(() => {
    fetchTeams();
  }, []);

  async function fetchTeams() {
    setLoading(true);

    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("points", { ascending: false })
      .order("wins", { ascending: false });

    const base =
      !error && data && data.length > 0 ? data : DEFAULT_TEAMS_FALLBACK;

    setTeams(
      base.map((t) => ({
        ...t,
        players: DEFAULT_PLAYERS[t.name] || ["Unknown", "Unknown"],
        wins: t.wins ?? 0,
        losses: t.losses ?? 0,
        draws: t.draws ?? 0,
        points: t.points ?? 0,
        strokeDiff: t.stroke_diff ?? 0,
      }))
    );

    setLoading(false);
  }

  async function submitMatch() {
    // Validation
    if (!winner || winner === "Select Winning Team") {
      setSubmitStatus("❌ Please select a winning team.");
      return;
    }
    if (!opponent || opponent === "Select Opponent") {
      setSubmitStatus("❌ Please select an opponent.");
      return;
    }
    if (winner === opponent) {
      setSubmitStatus("❌ Winner and opponent cannot be the same team.");
      return;
    }
    if (winnerScore === "" || loserScore === "") {
      setSubmitStatus("❌ Please enter both scores.");
      return;
    }

    const w = Number(winnerScore);
    const l = Number(loserScore);

    if (isNaN(w) || isNaN(l)) {
      setSubmitStatus("❌ Scores must be numbers.");
      return;
    }
    if (w > l) {
      setSubmitStatus("❌ In golf, the winner has a LOWER score. Please check your scores.");
      return;
    }

    setSubmitStatus("⏳ Saving...");

    const winningTeam = teams.find((t) => t.name.trim() === winner.trim());
    const losingTeam = teams.find((t) => t.name.trim() === opponent.trim());

    if (!winningTeam || !losingTeam) {
      setSubmitStatus("❌ Could not find team data. Try refreshing.");
      return;
    }

    const diff = Math.abs(l - w);

    if (w === l) {
      // DRAW — both teams get 1 point, no stroke diff change
      const { error: e1 } = await supabase
        .from("teams")
        .update({
          draws: (winningTeam.draws ?? 0) + 1,
          points: (winningTeam.points ?? 0) + 1,
        })
        .eq("name", winner);

      if (e1) { setSubmitStatus("❌ Error saving draw: " + e1.message); return; }

      const { error: e2 } = await supabase
        .from("teams")
        .update({
          draws: (losingTeam.draws ?? 0) + 1,
          points: (losingTeam.points ?? 0) + 1,
        })
        .eq("name", opponent);

      if (e2) { setSubmitStatus("❌ Error saving draw: " + e2.message); return; }

    } else {
      // WIN — winner gets 3 points, loser gets 0
      const { error: winErr } = await supabase
        .from("teams")
        .update({
          wins: (winningTeam.wins ?? 0) + 1,
          points: (winningTeam.points ?? 0) + 3,
          stroke_diff: (winningTeam.strokeDiff ?? winningTeam.stroke_diff ?? 0) + diff,
        })
        .eq("name", winner);

      if (winErr) { setSubmitStatus("❌ Error saving winner: " + winErr.message); return; }

      const { error: lossErr } = await supabase
        .from("teams")
        .update({
          losses: (losingTeam.losses ?? 0) + 1,
          stroke_diff: (losingTeam.strokeDiff ?? losingTeam.stroke_diff ?? 0) - diff,
        })
        .eq("name", opponent);

      if (lossErr) { setSubmitStatus("❌ Error saving opponent: " + lossErr.message); return; }
    }

    setWinner("");
    setOpponent("");
    setWinnerScore("");
    setLoserScore("");
    setSubmitStatus("✅ Score saved successfully!");

    fetchTeams();

    setTimeout(() => setSubmitStatus(""), 4000);
  }

  const sorted = [...teams].sort(
    (a, b) => (b.points ?? 0) - (a.points ?? 0)
  );

  const seed1 = sorted[0] || {};
  const seed2 = sorted[1] || {};
  const seed3 = sorted[2] || {};
  const seed4 = sorted[3] || {};
  const seed5 = sorted[4] || {};
  const seed6 = sorted[5] || {};

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
          padding: "32px 0",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          borderBottom: "4px solid #047857",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "0 24px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 900,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
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

          <nav
            style={{
              display: "flex",
              gap: "32px",
              fontSize: "18px",
              fontWeight: 600,
              color: "#bbf7d0",
            }}
          >
            <a href="#" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </a>
            <a
              href="#standings"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Standings
            </a>
            <a
              href="#schedule"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Schedule
            </a>
            <a
              href="#submit"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Submit Score
            </a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          maxWidth: "1120px",
          margin: "0 auto",
          padding: "40px 16px 60px",
        }}
      >
        {/* STANDINGS */}
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
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h2 style={{ fontSize: "22px", fontWeight: 800 }}>
              Live Standings
            </h2>

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
            {loading ? (
              <div
                style={{
                  padding: "24px",
                  textAlign: "center",
                  color: "#64748b",
                  fontSize: "14px",
                }}
              >
                Loading standings...
              </div>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#f8fafc",
                      borderBottom: "2px solid #cbd5e1",
                    }}
                  >
                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      Rank
                    </th>

                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      Team
                    </th>

                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      Players
                    </th>

                    <th style={{ padding: "10px 40px" }}></th>

                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      Wins
                    </th>

                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      Losses
                    </th>

                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      Draws
                    </th>

                    <th
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #cbd5e1",
                      }}
                    >
                      +/−
                    </th>

                    <th style={{ padding: "10px" }}>Points</th>
                  </tr>
                </thead>

                <tbody>
                  {sorted.map((team, index) => (
                    <tr
                      key={team.name}
                      style={{ borderBottom: "2px solid #cbd5e1" }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          fontWeight: 600,
                        }}
                      >
                        #{index + 1}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          fontWeight: 700,
                        }}
                      >
                        {team.name}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          color: "#475569",
                        }}
                      >
                        {team.players?.length
                          ? team.players.join(" & ")
                          : "—"}
                      </td>

                      <td style={{ padding: "12px 40px" }}></td>

                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        {team.wins ?? 0}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        {team.losses ?? 0}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          textAlign: "center",
                        }}
                      >
                        {team.draws ?? 0}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          borderRight: "2px solid #cbd5e1",
                          textAlign: "center",
                          fontWeight: 600,
                        }}
                      >
                        {team.strokeDiff ?? 0}
                      </td>

                      <td
                        style={{
                          padding: "12px",
                          textAlign: "center",
                          fontWeight: 700,
                          color: "#166534",
                        }}
                      >
                        {team.points ?? 0}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* TEAMS SECTION */}
        <section
          id="teams"
          style={{
            backgroundColor: "white",
            color: "#0f172a",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            padding: "24px",
            width: "100%",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 900,
              marginBottom: "20px",
            }}
          >
            Teams
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px",
              justifyContent: "center",
            }}
          >
            {[
              {
                name: "Banana Hammocks",
                logo: "/team-logos/Banana-Hammocks-Logo.png",
              },
              {
                name: "Smoove Operators",
                logo: "/team-logos/Smoove-Operators-Logo.png",
              },
              {
                name: "Brown Nosers",
                logo: "/team-logos/The-Brown-Nosers-Logo.png",
              },
              {
                name: "The Nursery",
                logo: "/team-logos/The-Nursery-Logo.png",
              },
              {
                name: "Greenside Gamblers",
                logo: "/team-logos/Greenside-Gamblers-Logo.png",
              },
              {
                name: "Shock Tops",
                logo: "/team-logos/Shock-Tops-Logo.png",
              },
            ].map((team) => (
              <div
                key={team.name}
                style={{
                  backgroundColor: "white",
                  color: "#0f172a",
                  borderRadius: "16px",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
                  padding: "20px",
                  width: "100%",
                  maxWidth: "420px",
                  textAlign: "center",
                }}
              >
                <img
                  src={team.logo}
                  alt={team.name}
                  style={{
                    maxWidth: "300px",
                    height: "auto",
                    marginBottom: "16px",
                    borderRadius: "12px",
                  }}
                />
                <h3 style={{ fontSize: "22px", fontWeight: 800 }}>
                  {team.name}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* SUBMIT + BRACKET SECTION */}
        <section
          id="submit"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT CARD — Submit Match */}
            <div
              style={{
                backgroundColor: "white",
                color: "#0f172a",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                padding: "24px",
                width: "100%",
                maxWidth: "420px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  marginBottom: "16px",
                }}
              >
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
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <tbody>
                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                          background: "#f8fafc",
                          width: "30%",
                        }}
                      >
                        Winning Team
                      </td>
                      <td style={{ padding: "12px" }}>
                        <select
                          value={winner}
                          onChange={(e) => setWinner(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <option value="">Select Winning Team</option>
                          {teams.map((team) => (
                            <option key={team.name} value={team.name}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                          background: "#f8fafc",
                        }}
                      >
                        Winner Score
                      </td>
                      <td style={{ padding: "12px" }}>
                        <input
                          type="number"
                          value={winnerScore}
                          onChange={(e) => setWinnerScore(e.target.value)}
                          placeholder="Winner's strokes (lower)"
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
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                          background: "#f8fafc",
                        }}
                      >
                        Opponent
                      </td>
                      <td style={{ padding: "12px" }}>
                        <select
                          value={opponent}
                          onChange={(e) => setOpponent(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                          }}
                        >
                          <option value="">Select Opponent</option>
                          {teams.map((team) => (
                            <option key={team.name} value={team.name}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                          background: "#f8fafc",
                        }}
                      >
                        Loser Score
                      </td>
                      <td style={{ padding: "12px" }}>
                        <input
                          type="number"
                          value={loserScore}
                          onChange={(e) => setLoserScore(e.target.value)}
                          placeholder="Loser's strokes (higher)"
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

              {/* STATUS MESSAGE */}
              {submitStatus && (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 600,
                    backgroundColor: submitStatus.startsWith("✅")
                      ? "#dcfce7"
                      : submitStatus.startsWith("⏳")
                      ? "#fefce8"
                      : "#fee2e2",
                    color: submitStatus.startsWith("✅")
                      ? "#166534"
                      : submitStatus.startsWith("⏳")
                      ? "#854d0e"
                      : "#991b1b",
                  }}
                >
                  {submitStatus}
                </div>
              )}
            </div>

            {/* RIGHT CARD — Bracket */}
            <div
              style={{
                backgroundColor: "white",
                color: "#0f172a",
                borderRadius: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
                padding: "24px",
                width: "100%",
                maxWidth: "420px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h2
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  marginBottom: "16px",
                }}
              >
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
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "14px",
                  }}
                >
                  <tbody>
                    {/* Play-In */}
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "2px solid #cbd5e1",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 700,
                        }}
                      >
                        Play‑In Round
                      </td>
                      <td></td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        #{sorted.indexOf(seed3) + 1} {seed3.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs #{sorted.indexOf(seed6) + 1} {seed6.name}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        #{sorted.indexOf(seed4) + 1} {seed4.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs #{sorted.indexOf(seed5) + 1} {seed5.name}
                      </td>
                    </tr>

                    {/* Semifinals */}
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "2px solid #cbd5e1",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 700,
                        }}
                      >
                        Semifinals
                      </td>
                      <td></td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        #{sorted.indexOf(seed1) + 1} {seed1.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs Winner of #{sorted.indexOf(seed4) + 1} /{" "}
                        {sorted.indexOf(seed5) + 1}
                      </td>
                    </tr>

                    <tr style={{ borderBottom: "2px solid #cbd5e1" }}>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        #{sorted.indexOf(seed2) + 1} {seed2.name}
                      </td>
                      <td style={{ padding: "12px" }}>
                        vs Winner of #{sorted.indexOf(seed3) + 1} /{" "}
                        {sorted.indexOf(seed6) + 1}
                      </td>
                    </tr>

                    {/* Championship */}
                    <tr
                      style={{
                        background: "#f8fafc",
                        borderBottom: "2px solid #cbd5e1",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 700,
                        }}
                      >
                        Championship
                      </td>
                      <td></td>
                    </tr>

                    <tr>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 600,
                        }}
                      >
                        Winner
                      </td>
                      <td style={{ padding: "12px" }}>
                        ________________________
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* SCHEDULE AT THE BOTTOM */}
        <section
          id="schedule"
          style={{
            backgroundColor: "white",
            color: "#0f172a",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
            padding: "24px",
            width: "100%",
            marginTop: "40px",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              fontSize: "26px",
              fontWeight: 900,
              marginBottom: "16px",
            }}
          >
            2026 Regular Season Schedule
          </h2>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "24px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#065f46",
                }}
              >
                Week 1 — June 3
              </h3>
              <ul
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                }}
              >
                <li>Banana Hammocks vs The Nursery</li>
                <li>Smoove Operators vs Brown Nosers</li>
                <li>Greenside Gamblers vs Shock Tops</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#065f46",
                }}
              >
                Week 2 — June 10
              </h3>
              <ul
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                }}
              >
                <li>Banana Hammocks vs Smoove Operators</li>
                <li>The Nursery vs Greenside Gamblers</li>
                <li>Brown Nosers vs Shock Tops</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#065f46",
                }}
              >
                Week 3 — June 17
              </h3>
              <ul
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                }}
              >
                <li>Banana Hammocks vs Brown Nosers</li>
                <li>Smoove Operators vs Shock Tops</li>
                <li>The Nursery vs Greenside Gamblers</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#065f46",
                }}
              >
                Week 4 — June 24
              </h3>
              <ul
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                }}
              >
                <li>Banana Hammocks vs Greenside Gamblers</li>
                <li>Brown Nosers vs The Nursery</li>
                <li>Smoove Operators vs Shock Tops</li>
              </ul>
            </div>

            <div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: 800,
                  color: "#065f46",
                }}
              >
                Week 5 — July 1
              </h3>
              <ul
                style={{
                  marginLeft: "20px",
                  marginTop: "8px",
                }}
              >
                <li>Banana Hammocks vs Shock Tops</li>
                <li>Smoove Operators vs The Nursery</li>
                <li>Brown Nosers vs Greenside Gamblers</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
