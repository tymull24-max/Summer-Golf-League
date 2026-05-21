import './globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Summer Golf League',
  description: 'Weekly league schedule, stats, and score submission'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-green-50 text-gray-900 min-h-screen">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  )
}
