import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import GoogleAnalytics  from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: "GuardClaw - Open Source Tools for the OpenClaw Community",
  description:
    "GuardClaw finds real pain in the OpenClaw community and ships free, open source tools that fix it.",
  authors: [{ name: "Rohit / GuardClaw" }],
  metadataBase: new URL("https://guardclaw.dev"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    type: "website",
    title: "GuardClaw - Open Source Tools for the OpenClaw Community",
    description:
      "GuardClaw finds real pain in the OpenClaw community and ships free, open source tools that fix it.",
    url: "https://guardclaw.dev",
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

