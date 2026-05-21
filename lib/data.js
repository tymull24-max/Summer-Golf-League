// lib/data.js

export const teams = [
  { id: 1, name: "Banana Hammocks", players: ["Tyler Mull", "Marco Morrison"] },
  { id: 2, name: "Smoove Operators", players: ["Paul Carr", "Grant Dzierwa"] },
  { id: 3, name: "Brown Nosers", players: ["Austin Radwanski", "Ben Seals"] },
  { id: 4, name: "Team 4", players: ["Tommy Ling", "Zach Kemmer"] },
  { id: 5, name: "Team 5", players: ["Max Walton", "Jackson Fitzgerald"] },
  { id: 6, name: "Shock Tops", players: ["Jack Benhfeldt", "Cole Keefer"] },
];

export const matches = [
  { id: 1, round: 1, team1Id: 1, team2Id: 6, team1Strokes: null, team2Strokes: null },
  { id: 2, round: 1, team1Id: 2, team2Id: 5, team1Strokes: null, team2Strokes: null },
  { id: 3, round: 1, team1Id: 3, team2Id: 4, team1Strokes: null, team2Strokes: null },

  { id: 4, round: 2, team1Id: 1, team2Id: 5, team1Strokes: null, team2Strokes: null },
  { id: 5, round: 2, team1Id: 2, team2Id: 6, team1Strokes: null, team2Strokes: null },
  { id: 6, round: 2, team1Id: 3, team2Id: 4, team1Strokes: null, team2Strokes: null },

  { id: 7, round: 3, team1Id: 1, team2Id: 3, team1Strokes: null, team2Strokes: null },
  { id: 8, round: 3, team1Id: 2, team2Id: 4, team1Strokes: null, team2Strokes: null },
  { id: 9, round: 3, team1Id: 5, team2Id: 6, team1Strokes: null, team2Strokes: null },

  { id: 10, round: 4, team1Id: 1, team2Id: 2, team1Strokes: null, team2Strokes: null },
  { id: 11, round: 4, team1Id: 3, team2Id: 6, team1Strokes: null, team2Strokes: null },
  { id: 12, round: 4, team1Id: 5, team2Id: 4, team1Strokes: null, team2Strokes: null },

  { id: 13, round: 5, team1Id: 1, team2Id: 4, team1Strokes: null, team2Strokes: null },
  { id: 14, round: 5, team1Id: 2, team2Id: 6, team1Strokes: null, team2Strokes: null },
  { id: 15, round: 5, team1Id: 3, team2Id: 5, team1Strokes: null, team2Strokes: null },
];

// Add these so imports stop breaking
export const schedule = [];
export const standings = [];
