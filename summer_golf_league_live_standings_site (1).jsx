export default function SummerGolfLeagueWebsite() {
  const teams = [
  // In production, this data should come from Firebase or Supabase for live syncing

  {
    name: "Banana Hammocks",
    players: ["Tyler Mull", "Marco Morrison"],
    wins: 0,
    losses: 0,
    strokeDiff: 0,
    points: 0,
    seed: 1,
    lastMatch: "-",
  },
  {
    name: "Smoove Operators",
    players: ["Paul Carr", "Grant Dzierwa"],
    wins: 0,
    losses: 0,
    strokeDiff: 0,
    points: 0,
    seed: 2,
    lastMatch: "-",
  },
  {
    name: "Brown Nosers",
    players: ["Ben Seals", "Austin Radwanski"],
    wins: 0,
    losses: 0,
    strokeDiff: 0,
    points: 0,
    seed: 3,
    lastMatch: "-",
  },
  {
    name: "Team 4",
    players: ["Zach Kemmer", "Tommy Ling"],
    wins: 0,
    losses: 0,
    strokeDiff: 0,
    points: 0,
    seed: 4,
    lastMatch: "-",
  },
  {
    name: "Team 5",
    players: ["Max Walton", "Jackson Fitzgerald"],
    wins: 0,
    losses: 0,
    strokeDiff: 0,
    points: 0,
    seed: 5,
    lastMatch: "-",
  },
  {
    name: "Shock Tops",
    players: ["Jack Behnfeldt", "Cole Keefer"],
    wins: 0,
    losses: 0,
    strokeDiff: 0,
    points: 0,
    seed: 6,
    lastMatch: "-",
  },
];

  const upcomingMatches = [
  {
    matchup: "Banana Hammocks vs Shock Tops",
    date: "Round 1",
    teeTime: "5:30 PM",
  },
  {
    matchup: "Smoove Operators vs Team 5",
    date: "Round 1",
    teeTime: "5:40 PM",
  },
  {
    matchup: "Brown Nosers vs Team 4",
    date: "Round 1",
    teeTime: "5:50 PM",
  },
  {
    matchup: "Banana Hammocks vs Team 5",
    date: "Round 2",
    teeTime: "5:30 PM",
  },
  {
    matchup: "Smoove Operators vs Shock Tops",
    date: "Round 2",
    teeTime: "5:40 PM",
  },
  {
    matchup: "Brown Nosers vs Team 4",
    date: "Round 2",
    teeTime: "5:50 PM",
  },
];

  const topTeam = teams.reduce((best, current) =>
  current.points > best.points ? current : best
);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white p-3 sm:p-6">
      {/* Mobile + sharing optimized layout */}
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Summer Golf League
            </h1>
            <p className="text-green-200 mt-2 text-base sm:text-lg">
              Live standings, scores, and weekly matchups
            </p>
          </div>

          <div className="bg-green-700/40 border border-green-500 rounded-3xl px-4 sm:px-6 py-4 shadow-2xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <p className="text-sm uppercase tracking-widest text-green-200">
              Current Leader
            </p>
            <h2 className="text-2xl font-bold mt-1">{topTeam.name}</h2>
            <p className="text-green-100">
              {topTeam.players.join(" & ")} • {topTeam.points} pts
            </p>

            <div className="flex gap-2 pt-3 sm:pt-0">
              <button className="bg-white text-black text-sm font-bold px-4 py-2 rounded-xl hover:bg-green-100 transition-colors">
                Share League
              </button>

              <button className="bg-green-500 text-black text-sm font-bold px-4 py-2 rounded-xl hover:bg-green-400 transition-colors">
                Download App
              </button>
            </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-5 border-b bg-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Live Standings</h2>
                <p className="text-slate-500 text-sm">
                  Updated after each round
                </p>
              </div>

              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
                LIVE
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-green-700">
              <table className="w-full min-w-[850px]">
                <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
                  <tr>
                    <th className="text-left px-6 py-4">Rank</th>
                    <th className="text-left px-6 py-4">Team</th>
                    <th className="text-left px-6 py-4">Players</th>
                    <th className="text-center px-6 py-4">Wins</th>
                    <th className="text-center px-6 py-4">Losses</th>
                    <th className="text-center px-6 py-4">+/−</th>
                    <th className="text-center px-6 py-4">Last Match</th>
                  </tr>
                </thead>

                <tbody>
                  {teams.map((team, index) => (
                    <tr
                      key={team.name}
                      className="border-b hover:bg-green-50 transition-colors"
                    >
                      <td className="px-6 py-5 font-bold text-lg">
                        #{index + 1}
                      </td>
                      <td className="px-6 py-5">
                        <p className="font-semibold">{team.name}</p>
                      </td>
                      <td className="px-6 py-5 text-slate-600">
                        {team.players.join(" & ")}
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-green-700">
                        {team.wins}
                      </td>
                      <td className="px-6 py-5 text-center">
                        {team.losses}
                      </td>
                      <td className={`px-6 py-5 text-center font-bold ${
                        team.strokeDiff > 0
                          ? "text-green-600"
                          : team.strokeDiff < 0
                          ? "text-red-600"
                          : "text-slate-500"
                      }`}>
                        {team.strokeDiff > 0 ? "+" : ""}
                        {team.strokeDiff}
                      </td>
                      <td className="px-6 py-5 text-center font-bold text-green-700">
                        {team.points}
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-slate-200 text-slate-700">
                          {team.lastMatch}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500 to-green-400 text-black rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-black">Mobile Friendly</h3>
              <p className="mt-2 font-medium">
                This league dashboard is optimized for phones, tablets, and desktop devices.
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="bg-black text-white font-bold py-3 rounded-2xl hover:bg-slate-800 transition-colors">
                  Send League Link
                </button>

                <button className="bg-white text-black font-bold py-3 rounded-2xl hover:bg-slate-100 transition-colors">
                  Add to Home Screen
                </button>
              </div>
            </div>
            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold">Join Your Team</h3>
                  <p className="text-slate-500 text-sm mt-1">
                    Players can join and update scores live from any device
                  </p>
                </div>

                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  LIVE ACCESS
                </div>
              </div>

              <div className="space-y-4">
                <select className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Select Your Team</option>
                  {teams.map((team) => (
                    <option key={team.name}>{team.name}</option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Enter Player Name"
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition-colors shadow-lg">
                  Join League Dashboard
                </button>
              </div>

              <div className="mt-6 border-t pt-6">
                <h4 className="text-xl font-bold mb-4">Submit Match Result</h4>

                <div className="space-y-4">
                  <select className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Select Winning Team</option>
                    {teams.map((team) => (
                      <option key={team.name}>{team.name}</option>
                    ))}
                  </select>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Winner Score"
                      className="border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <input
                      type="number"
                      placeholder="Loser Score"
                      className="border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <select className="w-full border border-slate-300 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500">
                    <option>Select Opponent</option>
                    {teams.map((team) => (
                      <option key={team.name}>{team.name}</option>
                    ))}
                  </select>

                  <button className="w-full bg-black hover:bg-slate-800 text-white font-bold py-3 rounded-2xl transition-colors shadow-lg">
                    Upload Final Score
                  </button>
                </div>

                <div className="mt-5 bg-green-50 border border-green-200 rounded-2xl p-4 text-sm text-green-800">
                  Example Result: Banana Hammocks def. Shock Tops 82–87
                </div>
              </div>

              <div className="mt-5 bg-slate-100 rounded-2xl p-4 text-sm text-slate-600">
                Connected players can submit live match results, automatically update standings, and track season-long stroke differential (+/−).
              </div>
            </div>
            <div className="bg-white/10 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-md">
              <h3 className="text-2xl font-bold mb-4">League Stats</h3>

              <div className="space-y-4">
                <div className="bg-black/20 rounded-2xl p-4">
                  <p className="text-sm text-green-200">Rounds Played</p>
                  <p className="text-3xl font-black">5</p>
                </div>

                <div className="bg-black/20 rounded-2xl p-4">
                  <p className="text-sm text-green-200">Players</p>
                  <p className="text-3xl font-black">12</p>
                </div>

                <div className="bg-black/20 rounded-2xl p-4">
                  <p className="text-sm text-green-200">Format</p>
                  <p className="text-3xl font-black">2v2</p>
                </div>
              </div>
            </div>

            <div className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                Upcoming Matchups
              </h3>

              <div className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.matchup}
                    className="border border-slate-200 rounded-2xl p-4 hover:border-green-400 transition-colors"
                  >
                    <h4 className="font-bold text-lg">{match.matchup}</h4>
                    <p className="text-slate-600 mt-1">{match.date}</p>
                    <p className="text-green-700 font-semibold mt-1">
                      Tee Time: {match.teeTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold">Official League Schedule</h2>
              <p className="text-slate-500 mt-1">
                View the complete 2026 pool play and championship bracket
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
              Summer 2026
            </div>
          </div>

          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg">
            <img
              src="/schedule.jpg"
              alt="Summer 2026 Golf League Schedule"
              className="w-full object-contain max-h-[1200px] bg-white"
            />
          </div>
        </section>

        </div>
    </div>
  );
}
