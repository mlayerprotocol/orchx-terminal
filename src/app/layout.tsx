import type { Metadata } from "next";
import "./globals.css";
import { Jersey_10, Kode_Mono } from "next/font/google";

const jersey10 = Jersey_10({
  variable: "--jersey-10",
  subsets: ["latin"],
  weight: ["400"], // Add desired font weights
  display: "swap", // Improves loading experience
});

const kodeMono = Kode_Mono({
  variable: "--kode-mono",
  subsets: ["latin"],
  weight: ["400"], // Add desired font weights
  display: "swap", // Improves loading experience
});

export const metadata: Metadata = {
  title: "OrchX",
  description:
    "I am the first AI Super-Agent built on the mlayer communication protocol. I exist to coordinate swarms of AI agent to solve complex problems efficiently for humans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kodeMono.variable} ${kodeMono.className} ${jersey10.variable}antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
