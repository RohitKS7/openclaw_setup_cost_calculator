import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { ToolPageContent } from "@/components/calculator/ToolPageContent";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "OpenClaw Setup Cost Calculator | GuardClaw",
  description:
    "Estimate OpenClaw token cost by model, heartbeat interval, fallback behavior, and multi-agent usage before spending your budget.",
  alternates: {
    canonical: "https://guardclaw.dev/calculator",
  },
  openGraph: {
    title: "OpenClaw Setup Cost Calculator | GuardClaw",
    description:
      "Estimate OpenClaw token cost by model, heartbeat interval, fallback behavior, and multi-agent usage before spending your budget.",
    type: "website",
    url: "https://guardclaw.dev/calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenClaw Setup Cost Calculator | GuardClaw",
    description:
      "Estimate OpenClaw cost by model, heartbeat, fallback, and multi-agent usage before spending your budget.",
  },
};

export default function CalculatePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-brand py-10 md:py-14">
        <Link href="/" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
          &larr; Back to overview
        </Link>
        <h2 className="mt-4 text-xl font-bold leading-snug text-foreground md:text-2xl">
          Field Note #001 - Estimate your real OpenClaw cost based on your setup.
          <span className="mt-1 block text-sm font-normal text-muted-foreground md:text-base">
            Small changes here can save you $20-$200/month.
          </span>
        </h2>
        <section className="mt-5 rounded-brand border border-primary/20 bg-secondary/30 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Field Note</p>
          <div className="mt-3 grid gap-2">
            <a
              href="https://guardclaw.dev/tools/why-openclaw-cost-high?source=calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-primary/15 bg-background/80 px-3 py-2 text-sm font-semibold transition hover:border-primary/40"
            >
              Most users underestimate hidden cost loops -&gt; learn why
            </a>
            <a
              href="https://guardclaw.dev/tools/opencost-heartbeat-cost?source=calculator"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-primary/15 bg-background/80 px-3 py-2 text-sm font-semibold transition hover:border-primary/40"
            >
              Heartbeat cost looks small in config but large in billing -&gt; learn why
            </a>
          </div>
        </section>
        <div className="mt-6">
          <Suspense fallback={<div className="py-10">Loading calculator...</div>}>
            <ToolPageContent />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}
