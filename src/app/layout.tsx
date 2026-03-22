import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "Award-winning portfolio website showcasing creative development skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body className="min-h-full flex flex-col bg-background text-text-primary">
          {children}
        </body>
      </html>
    </ThemeProvider>
  );
}
