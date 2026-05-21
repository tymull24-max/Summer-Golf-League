import Link from "next/link";
import StandingsTable from "../components/StandingsTable";

export default function Home() {
  return (
    <div className="space-y-12">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-green-700 to-green-500 text-white py-20 rounded-xl shadow-lg text-center">
        <h1 className="text-5xl font-extrabold mb-4">Summer 2026 Golf League</h1>
        <p className="text-xl opacity-90">Pool Play • Weekly Matchups • Live Standings • Championship Bracket</p>
      </section>

      {/* QUICK LINKS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/schedule" className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">📅 Schedule</h2>
          <p>View all matchups for the 2026 season.</p>
        </Link>

        <Link href="/teams" className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">⛳ Teams</h2>
          <p>Meet the squads and players.</p>
        </Link>

        <Link href="/standings" className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition">
          <h2 className="text-xl font-bold mb-2">🏆 Standings</h2>
          <p>Live rankings and stroke differential.</p>
        </Link>
      </section>

      {/* LEADERBOARD PREVIEW */}
      <section>
        <h2 className="text-3xl font-bold mb-4">Current Standings</h2>
        <StandingsTable />
      </section>

    </div>
  );
}
