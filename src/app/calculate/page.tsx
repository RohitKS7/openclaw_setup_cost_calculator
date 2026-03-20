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
};

export default function CalculatePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-brand py-10 md:py-14">
        <Link href="/" className="text-sm font-semibold text-muted-foreground transition hover:text-foreground">
          ← Back to overview
        </Link>
        <h2 className="mt-4 text-xl font-bold leading-snug text-foreground md:text-2xl">
          Field Note #001 — Estimate your real OpenClaw cost based on your setup.
          <span className="mt-1 block text-sm font-normal text-muted-foreground md:text-base">
            Small changes here can save you $20–$200/month.
          </span>
        </h2>
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
