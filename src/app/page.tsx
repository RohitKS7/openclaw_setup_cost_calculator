import type { Metadata } from "next";

import { LandingPageContent } from "@/components/landing/LandingPageContent";

export const metadata: Metadata = {
  title: "OpenClaw Setup Cost Calculator Overview | GuardClaw",
  description:
    "Running blind is the default state for OpenClaw users. Paste your model config, heartbeat settings, and fallback behavior to see your real daily and monthly cost before it drains.",
  alternates: {
    canonical: "https://guardclaw.dev/calculator",
  },
  openGraph: {
    title: "OpenClaw Setup Cost Calculator Overview | GuardClaw",
    description:
      "Paste your model config, heartbeat settings, and fallback behavior to see real OpenClaw daily and monthly cost.",
    type: "website",
    url: "https://guardclaw.dev/calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Setup Cost Calculator Overview | GuardClaw",
    description:
      "Estimate OpenClaw spend with model, heartbeat, fallback, and multi-agent assumptions before deployment.",
  },
};

export default function HomePage() {
  return <LandingPageContent />;
}
