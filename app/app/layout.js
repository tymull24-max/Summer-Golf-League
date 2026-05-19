import "./globals.css";

export const metadata = {
  title: "Summer Golf League",
  description: "Live standings and tournament tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
