"use client";

import { useState } from "react";

export default function SummerGolfLeagueWebsite() {

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
<div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
<h1 style={{ fontSize: "48px", fontWeight: 900, letterSpacing: "0.08em", textTransform: "uppercase" }}>
2026 Summer Golf League
</h1>

<div style={{ width: "260px", height: "8px", backgroundColor: "#6ee7b7", marginTop: "16px", marginBottom: "24px", borderRadius: "999px" }}></div>

<nav style={{ display: "flex", gap: "32px", fontSize: "18px", fontWeight: 600, color: "#bbf7d0" }}>
<a href="#" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
<a href="#standings" style={{ color: "inherit", textDecoration: "none" }}>Standings</a>
<a href="#schedule" style={{ color: "inherit", textDecoration: "none" }}>Schedule</a>
<a href="#submit" style={{ color: "inherit", textDecoration: "none" }}>Submit Score</a>
</nav>
</div>
</header>

{/* MAIN CONTENT */}
<main style={{ maxWidth: "1120px", margin: "0 auto", padding: "40px 16px 60px" }}>

{/* STANDINGS */}
<section id="standings" style={{
backgroundColor: "white",
color: "#0f172a",
borderRadius: "16px",
boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
overflow: "hidden",
width: "100%",
marginBottom: "40px",
}}>
{/* standings table remains unchanged */}
</section>

{/* ⭐⭐⭐ ADDED SCHEDULE SECTION ⭐⭐⭐ */}
<section
id="schedule"
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
<h2 style={{ fontSize: "26px", fontWeight: 900, marginBottom: "16px" }}>
2026 Regular Season Schedule
</h2>

<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

<div>
<h3 style={{ fontSize: "20px", fontWeight: 800, color: "#065f46" }}>Week 1 — June 3</h3>
<ul style={{ marginLeft: "20px", marginTop: "8px" }}>
<li>Banana Hammocks vs The Nursery</li>
<li>Smoove Operators vs Brown Nosers</li>
<li>Greenside Gamblers vs Shock Tops</li>
</ul>
</div>

<div>
<h3 style={{ fontSize: "20px", fontWeight: 800, color: "#065f46" }}>Week 2 — June 10</h3>
<ul style={{ marginLeft: "20px", marginTop: "8px" }}>
<li>Banana Hammocks vs Smoove Operators</li>
<li>The Nursery vs Greenside Gamblers</li>
<li>Brown Nosers vs Shock Tops</li>
</ul>
</div>

<div>
<h3 style={{ fontSize: "20px", fontWeight: 800, color: "#065f46" }}>Week 3 — June 17</h3>
<ul style={{ marginLeft: "20px", marginTop: "8px" }}>
<li>Banana Hammocks vs Brown Nosers</li>
<li>Smoove Operators vs Shock Tops</li>
<li>The Nursery vs Greenside Gamblers</li>
</ul>
</div>

<div>
<h3 style={{ fontSize: "20px", fontWeight: 800, color: "#065f46" }}>Week 4 — June 24</h3>
<ul style={{ marginLeft: "20px", marginTop: "8px" }}>
<li>Banana Hammocks vs Greenside Gamblers</li>
<li>Brown Nosers vs The Nursery</li>
<li>Smoove Operators vs Shock Tops</li>
</ul>
</div>

<div>
<h3 style={{ fontSize: "20px", fontWeight: 800, color: "#065f46" }}>Week 5 — July 1</h3>
<ul style={{ marginLeft: "20px", marginTop: "8px" }}>
<li>Banana Hammocks vs Shock Tops</li>
<li>Smoove Operators vs The Nursery</li>
<li>Brown Nosers vs Greenside Gamblers</li>
</ul>
</div>

</div>
</section>

{/* SUBMIT + BRACKET SECTION */}
<section id="submit">
{/* your entire submit + bracket code stays exactly the same */}
</section>

</main>
</div>
);
}
