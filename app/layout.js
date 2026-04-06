import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ClassHive",
  description: "Modern classroom platform for students and teachers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="theme-dark">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
