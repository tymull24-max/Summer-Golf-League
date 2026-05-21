// app/layout.js

export const metadata = {
  title: "Summer Golf League",
  description: "Official website for the Summer Golf League",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif" }}>
        <header
          style={{
            background: "#2c7a7b",
            padding: "1rem",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>Summer Golf League</h2>

          <nav>
            <a href="/" style={{ color: "white", marginRight: "1rem" }}>Home</a>
            <a href="/standings" style={{ color: "white", marginRight: "1rem" }}>Standings</a>
            <a href="/schedule" style={{ color: "white", marginRight: "1rem" }}>Schedule</a>
            <a href="/admin" style={{ color: "white" }}>Admin</a>
          </nav>
        </header>

        <main style={{ padding: "2rem" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
