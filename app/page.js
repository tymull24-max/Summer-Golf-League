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
      <nav className="w-full bg-green-900 text-white py-3 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center gap-10 text-base font-semibold">
          <span className="tracking-[0.25em] text-xs uppercase text-green-200">
            SUMMER 2026 GOLF LEAGUE
          </span>
          <div className="flex gap-6 ml-auto">
            <a href="#" className="hover:text-green-300">Home</a>
            <a href="#standings" className="hover:text-green-300">Standings</a>
            <a href="#schedule" className="hover:text-green-300">Schedule</a>
            <a href="#submit" className="hover:text-green-300">Submit Score</a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">

        {/* HEADER */}
        <header className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-[0.25em] uppercase">
            Summer 2026 Golf League
          </h1>
          <p className="text-green-200 mt-3 text-base">
            Live standings automatically update after each match
          </p>
        </header>

        {/* STANDINGS */}
        <section
          id="standings"
          className="bg-white text-slate-900 rounded-2xl shadow-lg overflow-hidden w-full"
        >
          <div className="px-6 py-4 border-b bg-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Live Standings</h2>
              <p className="text-slate-500 text-xs mt-1">
                Updated after each submitted score
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold">
              LIVE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-3 w-16">Rank</th>
                  <th className="text-left px-4 py-3 w-48">Team</th>
                  <th className="text-left px-4 py-3">Players</th>
                  <th className="text-center px-3 py-3 w-16">Wins</th>
                  <th className="text-center px-3 py-3 w-16">Losses</th>
                  <th className="text-center px-3 py-3 w-16">+/−</th>
                  <th className="text-center px-3 py-3 w-20">Points</th>
                </tr>
              </thead>

              <tbody>
                {teams
                  .sort((a, b) => b.points - a.points)
                  .map((team, index) => (
                    <tr
                      key={team.name}
                      className="border-t hover:bg-green-50 transition-colors"
                    >
                      <td className="px-6 py-3 font-semibold">#{index + 1}</td>
                      <td className="px-4 py-3 font-semibold">{team.name}</td>
                      <td className="px-4 py-3 text-slate-600">
                        {team.players.join(" & ")}
                      </td>
                      <td className="px-3 py-3 text-center">{team.wins}</td>
                      <td className="px-3 py-3 text-center">{team.losses}</td>
                      <td className="px-3 py-3 text-center font-semibold">
                        {team.strokeDiff}
                      </td>
                      <td className="px-3 py-3 text-center font-semibold text-green-700">
                        {team.points}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SUBMIT + BRACKET */}
        <section
          id="submit"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
        >
          {/* SUBMIT SCORE */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Submit Match Result</h2>

            <div className="space-y-4 text-sm">
              <select
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-black"
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
                  className="border border-slate-300 rounded-xl px-4 py-3 text-black"
                  value={winnerScore}
                  onChange={(e) => setWinnerScore(e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Loser Score"
                  className="border border-slate-300 rounded-xl px-4 py-3 text-black"
                  value={loserScore}
                  onChange={(e) => setLoserScore(e.target.value)}
                />
              </div>

              <select
                className="w-full border border-slate-300 rounded-xl px-4 py-3 text-black"
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
                className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl text-sm transition-colors"
              >
                Upload Final Score
              </button>
            </div>

            <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4 text-xs text-green-800">
              Example: Banana Hammocks def. Shock Tops 82–87
            </div>
          </div>

          {/* EMPTY BRACKET */}
          <div className="bg-white text-slate-900 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Live Championship Bracket</h2>

            <div className="space-y-6 text-sm">

              {/* PLAY-IN ROUND */}
              <div>
                <h3 className="text-base font-bold mb-2 text-green-700">
                  Play-In Round
                </h3>
                <div className="space-y-2">
                  <div className="bg-slate-100 p-3 rounded-lg border text-xs">
                    #3 __________________ vs #6 __________________
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg border text-xs">
                    #4 __________________ vs #5 __________________
                  </div>
                </div>
              </div>

              {/* SEMIFINALS */}
              <div>
                <h3 className="text-base font-bold mb-2 text-green-700">
                  Semifinals
                </h3>
                <div className="space-y-2">
                  <div className="bg-slate-100 p-3 rounded-lg border text-xs">
                    #1 __________________ vs __________________
                  </div>
                  <div className="bg-slate-100 p-3 rounded-lg border text-xs">
                    #2 __________________ vs __________________
                  </div>
                </div>
              </div>

              {/* CHAMPIONSHIP */}
              <div>
                <h3 className="text-base font-bold mb-2 text-green-700">
                  Championship
                </h3>
                <div className="bg-slate-100 p-4 rounded-lg border text-center">
                  <p className="text-sm font-semibold">__________________</p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
