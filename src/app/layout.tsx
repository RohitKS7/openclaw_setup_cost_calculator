import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import GoogleAnalytics  from "@/components/analytics/GoogleAnalytics";

export const metadata: Metadata = {
  title: "GuardClaw — Free Tools for the OpenClaw Community",
  description:
    "GuardClaw is a growing toolkit of free open source utilities built for the OpenClaw community. Created in public by indie developer Rohit Kumar Suman.",
  authors: [{ name: "Rohit Kumar Suman / GuardClaw" }],
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
    title: "GuardClaw — Free Tools for the OpenClaw Community",
    description:
      "GuardClaw is a growing toolkit of free open source utilities built for the OpenClaw community. Created in public by indie developer Rohit Kumar Suman.",
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

