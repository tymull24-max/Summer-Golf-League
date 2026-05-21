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
        // WINNER
        if (team.name === winner && wScore > lScore) {
          return {
            ...team,
            wins: team.wins + 1,
            points: team.points + 3,
            strokeDiff: team.strokeDiff + (lScore - wScore),
          };
        }

        // LOSER
        if (team.name === opponent && wScore > lScore) {
          return {
            ...team,
            losses: team.losses + 1,
            strokeDiff: team.strokeDiff + (wScore - lScore),
          };
        }

        // DRAW
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
    <div className="min-h-screen bg-gray-100 text-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-10">
