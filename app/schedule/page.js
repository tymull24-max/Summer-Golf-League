"use client";

export default function SchedulePage() {
  const schedule = [
    {
      week: 1,
      date: "June 3",
      matches: [
        "Banana Hammocks vs The Nursery",
        "Smoove Operators vs Brown Nosers",
        "Greenside Gamblers vs Shock Tops",
      ],
    },
    {
      week: 2,
      date: "June 10",
      matches: [
        "Banana Hammocks vs Smoove Operators",
        "The Nursery vs Greenside Gamblers",
        "Brown Nosers vs Shock Tops",
      ],
    },
    {
      week: 3,
      date: "June 17",
      matches: [
        "Banana Hammocks vs Brown Nosers",
        "Smoove Operators vs Shock Tops",
        "The Nursery vs Greenside Gamblers",
      ],
    },
    {
      week: 4,
      date: "June 24",
      matches: [
        "Banana Hammocks vs Greenside Gamblers",
        "Brown Nosers vs The Nursery",
        "Smoove Operators vs Shock Tops",
      ],
    },
    {
      week: 5,
      date: "July 1",
      matches: [
        "Banana Hammocks vs Shock Tops",
        "Smoove Operators vs The Nursery",
        "Brown Nosers vs Greenside Gamblers",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-950 via-green-900 to-green-800 text-white">
      
      {/* HEADER */}
      <header className="w-full bg-green-900 text-white py-12 shadow-xl border-b-4 border-green-700">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-extrabold tracking-wide">League Schedule</h1>

          <div className="w-64 h-2 bg-green-300 mt-4 mb-6 rounded-full"></div>

          <nav className="flex gap-12 text-2xl font-semibold text-green-100">
            <a href="/" className="hover:text-white transition">Home</a>
            <a href="/#standings" className="hover:text-white transition">Standings</a>
            <a href="/schedule" className="hover:text-white transition">Schedule</a>
            <a href="/#submit" className="hover:text-white transition">Submit Score</a>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">

        <section className="bg-white text-slate-900 rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-extrabold mb-6">2026 Regular Season Schedule</h2>

          <div className="space-y-10">
            {schedule.map((week) => (
              <div key={week.week} className="border-b pb-6 last:border-none">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Week {week.week} — {week.date}
                </h3>

                <ul className="list-disc ml-6 text-lg space-y-1">
                  {week.matches.map((match, index) => (
                    <li key={index}>{match}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
