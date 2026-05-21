import { teams, matches } from "../lib/data";

function computeStandings() {
  const map = new Map();

  teams.forEach((t) => {
    map.set(t.id, { teamId: t.id, name: t.name, wins: 0, strokesDiff: 0 });
  });

  matches.forEach((m) => {
    if (m.team1Strokes == null || m.team2Strokes == null) return;

    const t1 = map.get(m.team1Id);
    const t2 = map.get(m.team2Id);
    const diff = m.team1Strokes - m.team2Strokes;

    if (diff < 0) t1.wins += 1;
    else if (diff > 0) t2.wins += 1;

    t1.strokesDiff += -diff;
    t2.strokesDiff += diff;
  });

  return Array.from(map.values()).sort(
    (a, b) => b.wins - a.wins || a.strokesDiff - b.strokesDiff
  );
}

export default function Bracket() {
  const seeds = computeStandings();

  if (seeds.length < 6) return <p>Bracket will appear once standings populate.</p>;

  const [s1, s2, s3, s4, s5, s6] = seeds;

  return (
    <div className="bg-white shadow rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Championship Bracket</h2>

      <div className="grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <h3 className="font-semibold mb-2">First Round</h3>
          <p>Match 1: {s6.name} (6) vs {s3.name} (3)</p>
          <p>Match 2: {s5.name} (5) vs {s4.name} (4)</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Quarterfinals</h3>
          <p>QF1: {s1.name} (1) vs Winner Match 1</p>
          <p>QF2: {s2.name} (2) vs Winner Match 2</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Semifinals & Final</h3>
          <p>SF1: Winner QF1 vs Winner QF2</p>
          <p>Championship: Winner SF1 vs Winner SF2</p>
        </div>
      </div>

      <p className="text-gray-500 text-xs mt-2">
        Bracket updates automatically as pool play results are entered.
      </p>
    </div>
  );
}
