import type { Metadata } from "next";

import { LandingPageContent } from "@/components/landing/LandingPageContent";

export const metadata: Metadata = {
  title: "OpenClaw Setup Cost Calculator Overview | GuardClaw",
  description:
    "Running blind is the default state for OpenClaw users. Paste your model config, heartbeat settings, and fallback behaviour to see your real daily and monthly cost — before it drains.",
};

export default function HomePage() {
  return <LandingPageContent />;
}
