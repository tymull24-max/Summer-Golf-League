"use client";
import { useState } from "react";

export default function SummerGolfLeagueWebsite() {
  const [teams, setTeams] = useState([
    {
      name: "Banana Hammocks",
      players: ["Tyler Mull", "Marco Morrison"],
      wins: 0,
      losses: 0,
      draws: 0,
      strokeDiff: 0,
      points: 0,
    },
    {
      name: "Smoove Operators",
      players: ["Paul Carr", "Grant Dzierwa"],
      wins: 0,
      losses: 0,
      draws: 0,
      strokeDiff: 0,
      points: 0,
    },
    {
      name: "Brown Nosers",
      players: ["Ben Seals", "Austin Radwanski"],
      wins: 0,
      losses: 0,
      draws: 0,
      strokeDiff: 0,
      points: 0,
    },
    {
      name: "The Nursery",
      players: ["Zach Kemmer", "Tommy Ling"],
      wins: 0,
      losses: 0,
      draws: 0,
      strokeDiff: 0,
      points: 0,
    },
    {
      name: "Team 5",
      players: ["Max Walton", "Jackson Fitzgerald"],
      wins: 0,
      losses: 0,
      draws: 0,
      strokeDiff: 0,
      points: 0,
    },
    {
      name: "Shock Tops",
      players: ["Jack Behnfeldt", "Cole Keefer"],
      wins: 0,
      losses: 0,
      draws: 0,
      strokeDiff: 0,
      points: 0,
    },
  ]);

  const [winner, setWinner] = useState("");
  const [opponent, setOpponent] = useState("");
  const [winnerScore, setWinnerScore] = useState("");
  const [loserScore, setLoserScore] = useState("");

  function submitMatch() {
    if (!winner || !opponent || winner === opponent) return;

    const wScore = parseInt(winnerScore);
    const lScore = parseInt(loserScore);

    setTeams((prev) =>
      prev.map((team) => {
        // WINNER
        if (team.name === winner && wScore > lScore) {
          return {
            ...team,
            wins: team.wins + 1,
            points: team.points + 3,
            strokeDiff: team.strokeDiff + (lScore - wScore),
          };
        }

        // LOSER
        if (team.name === opponent && wScore > lScore) {
          return {
            ...team,
            losses: team.losses + 1,
            strokeDiff: team.strokeDiff + (wScore - lScore),
          };
        }

        // DRAW
        if (wScore === lScore) {
          if (team.name === winner || team.name === opponent) {
            return {
              ...team,
              draws: team.draws + 1,
              points: team.points + 1,
            };
          }
        }

        return team;
      })
    );

    setWinner("");
    setOpponent("");
    setWinnerScore("");
    setLoserScore("");
  }

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
              Summer 2026 Golf League
            </h1>
            <p className="text-slate-600 mt-3 text-lg">
              Live standings, score uploads, and tournament tracking
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl px-8 py-5 shadow-md">
            <p className="text-slate-500 text-sm uppercase tracking-widest">
              Mobile Friendly
            </p>
            <p className="text-2xl font-bold mt-2">
              Shareable League Dashboard
            </p>
          </div>
        </header>

        {/* STANDINGS */}
        <section className="bg-white rounded-3xl shadow-md overflow-hidden border border-slate-200">
          <div className="px-6 py-5 border-b bg-slate-50 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Live Standings</h2>
              <p className="text-slate-500 text-sm">
                Automatically updated after each match
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              LIVE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-100 text-slate-600 text-sm uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">Rank</th>
                  <th className="text-left px-6 py-4">Team</th>
                  <th className="text-left px-6 py-4">Players</th>
                  <th className="text-center px-6 py-4">Wins</th>
                  <th className="text-center px-6 py-4">Draws</th>
                  <th className="text-center px-6 py-4">Losses</th>
                  <th className="text-center px-6 py-4">+/−</th>
                  <th className="text-center px-6 py-4">Points</th>
                </tr>
              </thead>

              <tbody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <tr
                      key={team.name}
                      className="border-b hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-5 font-bold">#{index + 1}</td>
                      <td className="px-6 py-5 font-semibold">{team.name}</td>
                      <td className="px-6 py-5 text-slate-600">
                        {team.players.join(" & ")}
                      </td>
                      <td className="px-6 py-5 text-center">{team.wins}</td>
                      <td className="px-6 py-5 text-center">{team.draws}</td>
                      <td className="px-6 py-5 text-center">{team.losses}</td>
                      <td className="px-6 py-5 text-center font-bold">
                        {team.strokeDiff}
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-green-700">
                        {team.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SCORE SUBMISSION + SCHEDULE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* SCORE SUBMISSION */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold mb-4">Submit Match Result</h2>

            <div className="space-y-4">
              <select
                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
              >
                <option>Select Winning Team</option>
                {teams.map((team) => (
                  <option key={team.name}>{team.name}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Winner Score"
                  className="border border-slate-300 rounded-2xl px-4 py-3"
                  value={winnerScore}
                  onChange={(e) => setWinnerScore(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Loser Score"
                  className="border border-slate-300 rounded-2xl px-4 py-3"
                  value={loserScore}
                  onChange={(e) => setLoserScore(e.target.value)}
                />
              </div>

              <select
                className="w-full border border-slate-300 rounded-2xl px-4 py-3"
                value={opponent}
                onChange={(e) => setOpponent(e.target.value)}
              >
                <option>Select Opponent</option>
                {teams.map((team) => (
                  <option key={team.name}>{team.name}</option>
                ))}
              </select>

              <button
                onClick={submitMatch}
                className="w-full bg-black hover:bg-slate-800 text-white font-bold py-3 rounded-2xl transition-colors"
              >
                Upload Final Score
              </button>
            </div>

            <div className="mt-5 bg-slate-100 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700">
              Example: Banana Hammocks def. Shock Tops 82–87
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200">
            <h2 className="text-2xl font-bold mb-4">League Schedule</h2>

            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <img
                src="https://placehold.co/1200x1600?text=Upload+schedule.jpg+to+replace+this+image"
                alt="League Schedule"
                className="w-full"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
