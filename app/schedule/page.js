// app/admin/page.js

"use client";

import { useState } from "react";
import { teams, matches } from "../../lib/data";

export default function AdminPage() {
  const [updatedMatches, setUpdatedMatches] = useState(matches);

  const handleScoreChange = (matchId, field, value) => {
    setUpdatedMatches(prev =>
      prev.map(m =>
        m.id === matchId ? { ...m, [field]: value === "" ? null : Number(value) } : m
      )
    );
  };

  const handleSave = () => {
    console.log("Updated Matches:", updatedMatches);
    alert("Scores saved! (Console log only for now)");
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
    </div>
  );
}
