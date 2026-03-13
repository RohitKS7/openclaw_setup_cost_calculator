import type { Metadata } from "next";

import { LandingPageContent } from "@/components/landing/LandingPageContent";

export const metadata: Metadata = {
  title: "OpenClaw Setup Cost Calculator Overview | GuardClaw",
  description:
    "See what the OpenClaw setup cost calculator covers, community pain points, and jump into the tool before your config drains budget.",
};

export default function HomePage() {
  return <LandingPageContent />;
}
