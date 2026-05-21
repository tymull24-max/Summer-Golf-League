export default function SummerGolfLeagueWebsite() {
  const teams = [
    {
      name: "Banana Hammocks",
      players: ["Tyler Mull", "Marco Morrison"],
      wins: 4,
      losses: 1,
      strokeDiff: 12,
      points: 8,
    },
    {
      name: "Smoove Operators",
      players: ["Paul Carr", "Grant Dzierwa"],
      wins: 3,
      losses: 2,
      strokeDiff: 7,
      points: 6,
    },
    {
      name: "Brown Nosers",
      players: ["Ben Seals", "Austin Radwanski"],
      wins: 3,
      losses: 2,
      strokeDiff: 5,
      points: 6,
    },
    {
      name: "Team 4",
      players: ["Zach Kemmer", "Tommy Ling"],
      wins: 2,
      losses: 3,
      strokeDiff: -2,
      points: 4,
    },
    {
      name: "Team 5",
      players: ["Max Walton", "Jackson Fitzgerald"],
      wins: 2,
      losses: 3,
      strokeDiff: -6,
      points: 4,
    },
    {
      name: "Shock Tops",
      players: ["Jack Behnfeldt", "Cole Keefer"],
      wins: 1,
      losses: 4,
      strokeDiff: -16,
      points: 2,
    },
  ];

  const sortedTeams = [...teams].sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return b.strokeDiff - a.strokeDiff;
  });

  const seeds = sortedTeams.map((team, index) => ({
    seed: index + 1,
    ...team,
  }));

  const playIn1Winner =
    seeds[2].wins >= seeds[5].wins ? seeds[2] : seeds[5];

  const playIn2Winner =
    seeds[3].wins >= seeds[4].wins ? seeds[3] : seeds[4];

  const semifinal1Winner =
    seeds[0].wins >= playIn1Winner.wins
      ? seeds[0]
      : playIn1Winner;

  const semifinal2Winner =
    seeds[1].wins >= playIn2Winner.wins
      ? seeds[1]
      : playIn2Winner;

  const champion =
    semifinal1Winner.wins >= semifinal2Winner.wins
      ? semifinal1Winner
      : semifinal2Winner;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight">
              Summer 2026 Golf League
            </h1>

            <p className="text-green-200 mt-2 text-lg">
              Live standings, score uploads, and playoff bracket
            </p>
          </div>

          <div className="bg-green-700/40 border border-green-500 rounded-3xl px-6 py-4 shadow-2xl">
            <p className="text-green-200 text-sm uppercase tracking-widest">
              LIVE
            </p>

            <p className="text-2xl font-bold mt-2">
              Mobile League Dashboard
            </p>
          </div>
        </header>

        {/* STANDINGS */}

        <section className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-6 py-5 border-b bg-slate-100">
            <h2 className="text-2xl font-bold">
              Live Standings
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">Seed</th>
                  <th className="text-left px-6 py-4">Team</th>
                  <th className="text-left px-6 py-4">Players</th>
                  <th className="text-center px-6 py-4">Wins</th>
                  <th className="text-center px-6 py-4">Losses</th>
                  <th className="text-center px-6 py-4">+/−</th>
                  <th className="text-center px-6 py-4">Points</th>
                </tr>
              </thead>

              <tbody>
                {seeds.map((team) => (
                  <tr
                    key={team.name}
                    className="border-b hover:bg-green-50 transition-colors"
                  >
                    <td className="px-6 py-5 font-bold">
                      #{team.seed}
                    </td>

                    <td className="px-6 py-5 font-semibold">
                      {team.name}
                    </td>

                    <td className="px-6 py-5 text-slate-600">
                      {team.players.join(" & ")}
                    </td>

                    <td className="px-6 py-5 text-center">
                      {team.wins}
                    </td>

                    <td className="px-6 py-5 text-center">
                      {team.losses}
                    </td>

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

        {/* SCORE SUBMISSION */}

        <section className="bg-white text-slate-900 rounded-3xl p-6 shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">
            Submit Match Result
          </h2>

          <div className="grid md:grid-cols-4 gap-4">

            <select className="border border-slate-300 rounded-2xl px-4 py-3">
              <option>Winning Team</option>

              {teams.map((team) => (
                <option key={team.name}>
                  {team.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Winning Score"
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />

            <select className="border border-slate-300 rounded-2xl px-4 py-3">
              <option>Opponent</option>

              {teams.map((team) => (
                <option key={team.name}>
                  {team.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Opponent Score"
              className="border border-slate-300 rounded-2xl px-4 py-3"
            />

          </div>

          <button className="w-full mt-5 bg-black hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition-colors">
            Upload Final Score
          </button>
        </section>

        {/* LIVE BRACKET */}

        <section className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-black text-center mb-10">
            Live Championship Bracket
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* PLAY-IN */}

            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Play-In Round
              </h3>

              <div className="border-2 rounded-2xl p-5 mb-6">
                <p>#3 {seeds[2].name}</p>

                <p className="font-bold text-center my-3">
                  vs
                </p>

                <p>#6 {seeds[5].name}</p>

                <div className="mt-4 text-green-700 font-bold text-center">
                  Winner: {playIn1Winner.name}
                </div>
              </div>

              <div className="border-2 rounded-2xl p-5">
                <p>#4 {seeds[3].name}</p>

                <p className="font-bold text-center my-3">
                  vs
                </p>

                <p>#5 {seeds[4].name}</p>

                <div className="mt-4 text-green-700 font-bold text-center">
                  Winner: {playIn2Winner.name}
                </div>
              </div>
            </div>

            {/* SEMIFINALS */}

            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">
                Semifinals
              </h3>

              <div className="border-2 rounded-2xl p-5 mb-6">
                <p>#1 {seeds[0].name}</p>

                <p className="font-bold text-center my-3">
                  vs
                </p>

                <p>{playIn1Winner.name}</p>

                <div className="mt-4 text-green-700 font-bold text-center">
                  Winner: {semifinal1Winner.name}
                </div>
              </div>

              <div className="border-2 rounded-2xl p-5">
                <p>#2 {seeds[1].name}</p>

                <p className="font-bold text-center my-3">
                  vs
                </p>

                <p>{playIn2Winner.name}</p>

                <div className="mt-4 text-green-700 font-bold text-center">
                  Winner: {semifinal2Winner.name}
                </div>
              </div>
            </div>

            {/* CHAMPIONSHIP */}

            <div className="flex items-center">
              <div className="border-4 border-yellow-500 rounded-3xl p-8 w-full text-center">

                <h3 className="text-3xl font-black mb-8">
                  Championship
                </h3>

                <p className="text-xl">
                  {semifinal1Winner.name}
                </p>

                <p className="text-3xl font-black my-5">
                  vs
                </p>

                <p className="text-xl">
                  {semifinal2Winner.name}
                </p>

                <div className="mt-10">
                  <p className="text-5xl font-black text-green-700">
                    🏆
                  </p>

                  <p className="text-2xl font-bold mt-4">
                    {champion.name}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
