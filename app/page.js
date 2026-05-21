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
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-green-800 text-white p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* HEADER */}
        <header className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight drop-shadow-lg">
              Summer 2026 Golf League
            </h1>
            <p className="text-green-200 mt-3 text-lg">
              Live standings, score uploads, and tournament tracking
            </p>
          </div>

          <div className="bg-green-700/40 border border-green-500 rounded-3xl px-8 py-5 shadow-xl backdrop-blur-sm">
            <p className="text-green-200 text-sm uppercase tracking-widest">
              Mobile Friendly
            </p>
            <p className="text-2xl font-bold mt-2">
              Shareable League Dashboard
            </p>
          </div>
        </header>

        {/* STANDINGS */}
        <section className="bg-white text-slate-900 rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-6 py-5 border-b bg-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Live Standings</h2>
              <p className="text-slate-500 text-sm">
                Automatically updated after each match
              </p>
            </div>

            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              LIVE
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
