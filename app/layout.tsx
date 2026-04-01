import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Beta Player Tracker",
  description: "Track your bet players' live stats in one place",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen font-sans">
        {children}
      </body>
    </html>
  );
}
