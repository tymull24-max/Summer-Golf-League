"use client";
import { useState } from "react";

export default function Page() {
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
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 text-white">

      {/* HEADER */}
      <header className="w-full bg-green-900 text-white py-12 shadow-xl border-b-4 border-green-700">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-extrabold tracking-wide">2026 Summer Golf League</h1>

          <div className="w-64 h-2 bg-green-300 mt-4 mb-6 rounded-full"></div>

          <nav className="flex gap-12 text-2xl font-semibold text-green-100">
            <a href="#" className="hover:text-white transition">Home</a>
            <a href="#standings" className="hover:text-white transition">Standings</a>
            <a href="#schedule" className="hover:text-white transition">Schedule</a>
            <a href="#submit" className="hover:text-white transition">Submit Score</a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        {/* STANDINGS */}
        <section id="standings" className="bg-white text-slate-900 rounded-2xl shadow-xl overflow-hidden w-full">
          <div className="px-6 py-4 border-b bg-slate-100 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Live Standings</h2>
            <div className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold">LIVE</div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b-2 border-slate-300">
                  <th className="p-3 border-r-2 border-slate-300">Rank</th>
                  <th className="p-3 border-r-2 border-slate-300">Team</th>
                  <th className="p-3 border-r-2 border-slate-300">Players</th>
                  <th className="p-3"></th>
                  <th className="p-3 border-r-2 border-slate-300">Wins</th>
                  <th className="p-3 border-r-2 border-slate-300">Losses</th>
                  <th className="p-3 border-r-2 border-slate-300">Draws</th>
                  <th className="p-3 border-r-2 border-slate-300">+/−</th>
                  <th className="p-3">Points</th>
                </tr>
              </thead>

              <tbody>
                {sorted.map((team, index) => (
                  <tr key={team.name} className="border-b-2 border-slate-300">
                    <td className="p-3 border-r-2 border-slate-300 font-semibold">#{index + 1}</td>
                    <td className="p-3 border-r-2 border-slate-300 font-bold">{team.name}</td>
                    <td className="p-3 border-r-2 border-slate-300 text-slate-600">{team.players.join(" & ")}</td>
                    <td className="p-3"></td>
                    <td className="p-3 border-r-2 border-slate-300 text-center">{team.wins}</td>
                    <td className="p-3 border-r-2 border-slate-300 text-center">{team.losses}</td>
                    <td className="p-3 border-r-2 border-slate-300 text-center">{team.draws}</td>
                    <td className="p-3 border-r-2 border-slate-300 text-center font-semibold">{team.strokeDiff}</td>
                    <td className="p-3 text-center font-bold text-green-700">{team.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SUBMIT SCORE */}
        <section id="submit" className="flex justify-center">
          <div className="bg-white text-slate-900 rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Submit Match Result</h2>

            <div className="border-2 border-slate-300 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b-2 border-slate-300">
                    <td className="p-3 font-semibold bg-slate-50 w-1/3">Winning Team</td>
                    <td className="p-3">
                      <select
                        value={winner}
                        onChange={e => setWinner(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option>Select Winning Team</option>
                        {teams.map(team => (
                          <option key={team.name}>{team.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr className="border-b-2 border-slate-300">
                    <td className="p-3 font-semibold bg-slate-50">Winner Score</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={winnerScore}
                        onChange={e => setWinnerScore(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </td>
                  </tr>

                  <tr className="border-b-2 border-slate-300">
                    <td className="p-3 font-semibold bg-slate-50">Opponent</td>
                    <td className="p-3">
                      <select
                        value={opponent}
                        onChange={e => setOpponent(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      >
                        <option>Select Opponent</option>
                        {teams.map(team => (
                          <option key={team.name}>{team.name}</option>
                        ))}
                      </select>
                    </td>
                  </tr>

                  <tr>
                    <td className="p-3 font-semibold bg-slate-50">Loser Score</td>
                    <td className="p-3">
                      <input
                        type="number"
                        value={loserScore}
                        onChange={e => setLoserScore(e.target.value)}
                        className="w-full p-2 border rounded-lg"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={submitMatch}
              className="w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3 rounded-xl mt-4 transition"
            >
              Upload Final Score
            </button>
          </div>
        </section>

        {/* FULL-WIDTH BRACKET */}
        <section className="bg-white text-slate-900 rounded-2xl shadow-xl p-6 w-full">
          <h2 className="text-2xl font-bold mb-4">Tournament Bracket</h2>

          <div className="border-2 border-slate-300 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <tbody>
                {/* Play-In */}
                <tr className="bg-slate-50 border-b-2 border-slate-300">
                  <td className="p-3 font-bold">Play‑In Round</td>
                  <td></td>
                </tr>

                <tr className="border-b-2 border-slate-300">
                  <td className="p-3 font-semibold">
                    #{sorted.indexOf(seed3) + 1} {seed3.name}
                  </td>
                  <td className="p-3">
                    vs #{sorted.indexOf(seed6) + 1} {seed6.name}
                  </td>
                </tr>

                <tr className="border-b-2 border-slate-300">
                  <td className="p-3 font-semibold">
                    #{sorted.indexOf(seed4) + 1} {seed4.name}
                  </td>
                  <td className="p-3">
                    vs #{sorted.indexOf(seed5) + 1} {seed5.name}
                  </td>
                </tr>

                {/* Semifinals */}
                <tr className="bg-slate-50 border-b-2 border-slate-300">
                  <td className="p-3 font-bold">Semifinals</td>
                  <td></td>
                </tr>

                <tr className="border-b-2 border-slate-300">
                  <td className="p-3 font-semibold">
                    #{sorted.indexOf(seed1) + 1} {seed1.name}
                  </td>
                  <td className="p-3">
                    vs Winner of #{sorted.indexOf(seed4) + 1} / #{sorted.indexOf(seed5) + 1}
                  </td>
                </tr>

                <tr className="border-b-2 border-slate-300">
                  <td className="p-3 font-semibold">
                    #{sorted.indexOf(seed2) + 1} {seed2.name}
                  </td>
                  <td className="p-3">
                    vs Winner of #{sorted.indexOf(seed3) + 1} / #{sorted.indexOf(seed6) + 1}
                  </td>
                </tr>

                {/* Championship */}
                <tr className="bg-slate-50 border-b-2 border-slate-300">
                  <td className="p-3 font-bold">Championship</td>
                  <td></td>
                </tr>

                <tr>
                  <td className="p-3 font-semibold">Winner</td>
                  <td className="p-3">________________________</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
