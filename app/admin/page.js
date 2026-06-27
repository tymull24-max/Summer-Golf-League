// app/admin/page.js

"use client";

import { useState } from "react";
import { teams, matches, standings } from "../../lib/data";

export default function AdminPage() {
  const [updatedMatches, setUpdatedMatches] = useState(matches);

  // Update match scores in local state
  const handleScoreChange = (matchId, field, value) => {
    setUpdatedMatches(prev =>
      prev.map(m =>
        m.id === matchId
          ? { ...m, [field]: value === "" ? null : Number(value) }
          : m
      )
    );
  };

  // Save scores (currently console only)
  const handleSave = () => {
    // Write updated scores back into the global matches array
    updatedMatches.forEach((um) => {
      const original = matches.find(m => m.id === um.id);
      original.team1Strokes = um.team1Strokes;
      original.team2Strokes = um.team2Strokes;
    });

    console.log("Updated Matches:", matches);
    alert("Scores saved! (Console log only for now)");
  };

  // ⭐ RESET LEAGUE — clears all scores + clears standings (+/- strokes)
  const handleReset = () => {
    // Reset match scores
    matches.forEach(m => {
      m.team1Strokes = null;
      m.team2Strokes = null;
    });

    // Reset standings (this clears your +/- strokes)
    standings.length = 0;

    // Update UI state
    setUpdatedMatches([...matches]);

    alert("League reset!");
  };

  const getTeamName = (id) => teams.find(t => t.id === id)?.name || "Unknown";

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Admin Score Entry</h1>
      <p>Enter strokes for each match. Leave blank if not played yet.</p>

      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #000" }}>Round</th>
            <th style={{ borderBottom: "2px solid #000" }}>Match</th>
            <th style={{ borderBottom: "2px solid #000" }}>Team 1</th>
            <th style={{ borderBottom: "2px solid #000" }}>Team 1 Strokes</th>
            <th style={{ borderBottom: "2px solid #000" }}>Team 2</th>
            <th style={{ borderBottom: "2px solid #000" }}>Team 2 Strokes</th>
          </tr>
        </thead>

        <tbody>
          {updatedMatches.map(match => (
            <tr key={match.id}>
              <td style={{ padding: "8px 0", textAlign: "center" }}>{match.round}</td>
              <td style={{ padding: "8px 0", textAlign: "center" }}>{match.id}</td>

              <td style={{ padding: "8px 0" }}>{getTeamName(match.team1Id)}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="number"
                  value={match.team1Strokes ?? ""}
                  onChange={(e) =>
                    handleScoreChange(match.id, "team1Strokes", e.target.value)
                  }
                  style={{ width: "80px", padding: "4px" }}
                />
              </td>

              <td style={{ padding: "8px 0" }}>{getTeamName(match.team2Id)}</td>
              <td style={{ textAlign: "center" }}>
                <input
                  type="number"
                  value={match.team2Strokes ?? ""}
                  onChange={(e) =>
                    handleScoreChange(match.id, "team2Strokes", e.target.value)
                  }
                  style={{ width: "80px", padding: "4px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save Scores */}
      <button
        onClick={handleSave}
        style={{
          marginTop: "1.5rem",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Save Scores
      </button>

      {/* RESET LEAGUE BUTTON */}
      <button
        onClick={handleReset}
        style={{
          marginTop: "1rem",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#f44336",
          color: "white",
        }}
      >
        Reset League
      </button>
    </div>
  );
}
