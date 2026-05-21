// app/layout.js

export const metadata = {
  title: "Summer Golf League",
  description: "Official website for the Summer Golf League",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Segoe UI, Roboto, Helvetica, Arial, sans-serif",
          background: "linear-gradient(180deg, #e8f5e9, #c8e6c9)",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            background: "#1b5e20",
            padding: "1rem 2rem",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          }}
        >
          <h2 style={{ margin: 0, fontWeight: 600 }}>🏌️ Summer Golf League</h2>

          <nav style={{ display: "flex", gap: "1.5rem" }}>
            <a href="/" style={{ color: "white", textDecoration: "none", fontWeight: 500 }}>
              Home
            </a>
            <a href="/standings" style={{ color: "white", textDecoration: "none", fontWeight: 500 }}>
              Standings
            </a>
            <a href="/schedule" style={{ color: "white", textDecoration: "none", fontWeight: 500 }}>
              Schedule
            </a>
            <a href="/submit-score" style={{ color: "white", textDecoration: "none", fontWeight: 500 }}>
              Submit Score
            </a>
          </nav>
        </header>

        <main
          style={{
            maxWidth: "900px",
            margin: "2rem auto",
            background: "white",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
