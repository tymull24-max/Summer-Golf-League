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
      name: "Greenside Gamblers",
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
        if (team.name === winner && wScore > lScore) {
          return {
            ...team,
            wins: team.wins + 1,
            points: team.points + 3,
            strokeDiff: team.strokeDiff + (lScore - wScore),
          };
        }

        if (team.name === opponent && wScore > lScore) {
          return {
            ...team,
            losses: team.losses + 1,
            strokeDiff: team.strokeDiff + (wScore - lScore),
          };
        }

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
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 text-white">

      {/* NAV BAR */}
      <nav className="w-full bg-green-800 text-white py-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-center gap-10 text-lg font-semibold">
          <a href="#" className="hover:text-green-300">Home</a>
          <a href="#standings" className="hover:text-green-300">Standings</a>
          <a href="#schedule" className="hover:text-green-300">Schedule</a>
          <a href="#submit" className="hover:text-green-300">Submit Score</a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6 space-y-12">

        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mt-6">
          <div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight drop-shadow-lg">
              Summer 2026 Golf League
            </h1>
            <p className="text-green-200 mt-4 text-xl">
              Live standings, score uploads, and tournament tracking
            </p>
          </div>

          <div className="bg-green-700/40 border border-green-500 rounded-3xl px-10 py-6 shadow-xl backdrop-blur-sm">
            <p className="text-green-200 text-sm uppercase tracking-widest">
              Mobile Friendly
            </p>
            <p className="text-3xl font-bold mt-2">
              Shareable League Dashboard
            </p>
          </div>
        </header>

        {/* STANDINGS */}
        <section id="standings" className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden w-full">
          <div className="px-8 py-6 border-b bg-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Live Standings</h2>
              <p className="text-slate-500 text-sm mt-1">
                Automatically updated after each match
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-5 py-2 rounded-full text-sm font-bold animate-pulse">
              LIVE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
                <tr>
                  <th className="text-left px-8 py-4">Rank</th>
                  <th className="text-left px-8 py-4">Team</th>
                  <th className="text-left px-8 py-4">Players</th>
                  <th className="text-center px-8 py-4">Wins</th>
                  <th className="text-center px-8 py-4">Draws</th>
                  <th className="text-center px-8 py-4">Losses</th>
                  <th className="text-center px-8 py-4">+/−</th>
                  <th className="text-center px-8 py-4">Points</th>
                </tr>
              </thead>

              <tbody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <tr
                      key={team.name}
                      className="border-b hover:bg-green-50 transition-colors"
                    >
                      <td className="px-8 py-5 font-bold">#{index + 1}</td>
                      <td className="px-8 py-5 font-semibold">{team.name}</td>
                      <td className="px-8 py-5 text-slate-600">
                        {team.players.join(" & ")}
                      </td>
                      <td className="px-8 py-5 text-center">{team.wins}</td>
                      <td className="px-8 py-5 text-center">{team.draws}</td>
                      <td className="px-8 py-5 text-center">{team.losses}</td>
                      <td className="px-8 py-5 text-center font-bold">
                        {team.strokeDiff}
                      </td>
                      <td className="px-8 py-5 text-center font-bold text-green-700">
                        {team.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SUBMIT + BRACKET */}
        <section id="submit" className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* SUBMIT SCORE */}
          <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">Submit Match Result</h2>

            <div className="space-y-5">
              <select
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 text-black"
                value={winner}
                onChange={(e) => setWinner(e.target.value)}
              >
                <option>Select Winning Team</option>
                {teams.map((team) => (
                  <option key={team.name}>{team.name}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-5">
                <input
                  type="number"
                  placeholder="Winner Score"
                  className="border border-slate-300 rounded-2xl px-5 py-4 text-black"
                  value={winnerScore}
                  onChange={(e) => setWinnerScore(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Loser Score"
                  className="border border-slate-300 rounded-2xl px-5 py-4 text-black"
                  value={loserScore}
                  onChange={(e) => setLoserScore(e.target.value)}
                />
              </div>

              <select
                className="w-full border border-slate-300 rounded-2xl px-5 py-4 text-black"
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
                className="w-full bg-black hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-colors"
              >
                Upload Final Score
              </button>
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-2xl p-5 text-sm text-green-800">
              Example: Banana Hammocks def. Shock Tops 82–87
            </div>
          </div>

          {/* EMPTY BRACKET */}
          <div className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-3xl font-bold mb-6">Live Championship Bracket</h2>

            <div className="space-y-8">

              {/* PLAY-IN ROUND */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-700">Play-In Round</h3>
                <div className="space-y-3">
                  <div className="bg-slate-100 p-4 rounded-xl border">
                    <p>#3 __________________ vs #6 __________________</p>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-xl border">
                    <p>#4 __________________ vs #5 __________________</p>
                  </div>
                </div>
              </div>

              {/* SEMIFINALS */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-700">Semifinals</h3>
                <div className="space-y-3">
                  <div className="bg-slate-100 p-4 rounded-xl border">
                    <p>#1 __________________ vs __________________</p>
                  </div>
                  <div className="bg-slate-100 p-4 rounded-xl border">
                    <p>#2 __________________ vs __________________</p>
                  </div>
                </div>
              </div>

              {/* CHAMPIONSHIP */}
              <div>
                <h3 className="text-xl font-bold mb-3 text-green-700">Championship</h3>
                <div className="bg-slate-100 p-6 rounded-xl border text-center">
                  <p className="text-lg font-semibold">__________________</p>
                </div>
              </div>

            </div>
          </div>

        </section>
      </div>
    </div>
  );
}
