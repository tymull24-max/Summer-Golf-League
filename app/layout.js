import "./globals.css";

export const metadata = {
  title: "Summer Golf League",
  description: "Live standings and match tracking",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
