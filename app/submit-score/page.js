// app/submit-score/page.js

"use client";

import { useState } from "react";
import { teams, matches } from "../../lib/data";

export default function SubmitScorePage() {
  const [updatedMatches, setUpdatedMatches] = useState(matches);
  const [success, setSuccess] = useState(false);

  const getTeamName = (id) => teams.find(t => t.id === id)?.name || "Unknown";

  const handleScoreChange = (matchId, field, value) => {
    setUpdatedMatches(prev =>
      prev.map(m =>
        m.id === matchId ? { ...m, [field]: value === "" ? null : Number(value) } : m
      )
    );
  };

  const handleSubmit = () => {
    console.log("Submitted Scores:", updatedMatches);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "1rem" }}>Submit Match Scores</h1>
      <p style={{ marginBottom: "1.5rem" }}>
        Anyone can submit scores. Enter strokes for each team below.
      </p>

      {success && (
        <div
          style={{
            background: "#c8e6c9",
            padding: "1rem",
            borderRadius: "8px",
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: 600,
            color: "#1b5e20",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
        >
          ✔ Scores submitted!
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {updatedMatches.map(match => (
          <div
            key={match.id}
            style={{
              background: "white",
              padding: "1.25rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              transition: "transform 0.15s",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: "0.75rem" }}>
              Round {match.round} — Match {match.id}
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px",
                alignItems: "center",
                gap: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <div>{getTeamName(match.team1Id)}</div>
              <input
                type="number"
                value={match.team1Strokes ?? ""}
                onChange={(e) =>
                  handleScoreChange(match.id, "team1Strokes", e.target.value)
                }
                placeholder="Strokes"
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 100px",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <div>{getTeamName(match.team2Id)}</div>
              <input
                type="number"
                value={match.team2Strokes ?? ""}
                onChange={(e) =>
                  handleScoreChange(match.id, "team2Strokes", e.target.value)
                }
                placeholder="Strokes"
                style={{
                  padding: "8px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: "2rem",
          width: "100%",
          padding: "14px",
          fontSize: "18px",
          fontWeight: 600,
          background: "#1b5e20",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
          transition: "background 0.2s",
        }}
      >
        Submit Scores
      </button>
    </div>
  );
}
