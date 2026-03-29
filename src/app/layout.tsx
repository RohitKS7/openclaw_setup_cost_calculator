import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "GuardClaw - Free Tools for the OpenClaw Community",
  description:
    "GuardClaw is a growing toolkit of free open source utilities built for the OpenClaw community. Created in public by indie developer Rohit Kumar Suman.",
  authors: [{ name: "Rohit Kumar Suman / GuardClaw" }],
  metadataBase: new URL("https://calculator.guardclaw.dev"),
  alternates: {
    canonical: "https://guardclaw.dev/calculator",
  },
  robots: {
    index: false,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "GuardClaw - OpenClaw Cost Calculator",
    description:
      "Estimate OpenClaw token cost by model, heartbeat interval, fallback behavior, and multi-agent usage before spending your budget.",
    url: "https://guardclaw.dev/calculator",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}
        <Analytics />
        <GoogleAnalytics GA_MEASUREMENT_ID="G-9P4049TPFT" />
      </body>
    </html>
  );
}
