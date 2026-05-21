// app/page.js

export default function HomePage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Summer Golf League</h1>
      <p>Welcome to the official league website. Use the links below to navigate.</p>

      <nav style={{ marginTop: "2rem" }}>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "18px" }}>
          <li style={{ marginBottom: "1rem" }}>
            <a href="/standings" style={{ textDecoration: "none", color: "blue" }}>
              📊 Standings
            </a>
          </li>

          <li style={{ marginBottom: "1rem" }}>
            <a href="/schedule" style={{ textDecoration: "none", color: "blue" }}>
              📅 Schedule
            </a>
          </li>

          <li style={{ marginBottom: "1rem" }}>
            <a href="/admin" style={{ textDecoration: "none", color: "blue" }}>
              📝 Admin Score Entry
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
