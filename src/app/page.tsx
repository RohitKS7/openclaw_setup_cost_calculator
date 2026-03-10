import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container-brand py-16 md:py-20">
        <section className="rounded-brand border bg-secondary/60 p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            A field guide for the OpenClaw community
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Free OpenClaw Tools by GuardClaw
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Practical utilities for OpenClaw users and developers. Built in public, open source,
            and free forever.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools/openclaw-token-calculator"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
            >
              Open Field Note #001
            </Link>
            <Link
              href="https://guardclaw.dev"
              target="_blank"
              className="rounded-full border border-primary/30 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-primary hover:text-primary-foreground"
            >
              Ecosystem Hub
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

