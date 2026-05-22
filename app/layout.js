// app/layout.js

export const metadata = {
  title: "Summer Golf League",
  description: "Official website for the Summer Golf League",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 min-h-screen bg-gradient-to-b from-green-50 to-green-100 font-sans">

        {/* OLD HEADER REMOVED */}

        <main className="max-w-7xl mx-auto my-8 bg-white p-8 rounded-2xl shadow-xl">
          {children}
        </main>

      </body>
    </html>
  );
}
