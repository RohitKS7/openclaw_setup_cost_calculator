"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionSection } from "@/components/shared/MotionSection";
import { SOCIAL_LINKS } from "@/data/ecosystem";

import { AnimatedCountUp } from "./AnimatedCountUp";

const communityQuotes = [
  {
    quote: "Spent $25 in 10 minutes in a loop.",
    source: "Discord — #users-helping-users",
  },
  {
    quote: "Burned through my $200 plan in under an hour.",
    source: "Discord — #general",
  },
  {
    quote: "Drained my Codex weekly limit in a single afternoon.",
    source: "Discord — #general",
  },
  {
    quote: "How are you supposed to use this without going broke?",
    source: "Discord — #users-helping-users",
  },
];

const calculatorCoverage = [
  {
    icon: "🧠",
    label: "Model cost",
    description: "Primary and fallback model spend per day and month",
  },
  {
    icon: "💓",
    label: "Heartbeat budget",
    description: "How much your heartbeat interval costs at idle",
  },
  {
    icon: "🔀",
    label: "Fallback behaviour",
    description: "Blended cost when sessions fall back to a cheaper model",
  },
  {
    icon: "🤖",
    label: "Multi-agent mode",
    description: "Total spend across simultaneous agents",
  },
];

const previewCards = [
  {
    value: 38,
    before: "Your heartbeat alone costs ",
    after: "/month",
  },
  {
    value: 200,
    before: "At this rate you'll drain your ",
    after: " plan in 4 hours",
  },
  {
    value: 22,
    before: "Switching to Kimi as your fallback saves you ",
    after: "/month",
  },
];

export function LandingPageContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-8">
        <section className="container-brand py-14 md:py-20">
          <div className="max-w-4xl rounded-[2rem] border border-border/80 bg-background/80 p-8 shadow-[0_24px_80px_-48px_rgba(30,72,54,0.45)] backdrop-blur-sm md:p-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl"
            >
              Running blind is the default state for OpenClaw users.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              className="mt-5 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              Paste your model config, heartbeat settings, and fallback behaviour to see your real daily and monthly
              cost — before it drains.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
              className="mt-8"
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                className="inline-flex"
              >
                <Link
                  href="/calculate"
                  className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-accent-foreground shadow-[0_12px_28px_-16px_rgba(191,95,43,0.8)] transition hover:opacity-95"
                >
                  Calculate my setup cost →
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="container-brand space-y-8 pb-12">
          <MotionSection className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Community proof
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              {communityQuotes.map((item, index) => (
                <motion.article
                  key={item.quote}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.08 }}
                  whileHover={{
                    y: -4,
                    boxShadow: "0 18px 30px -24px rgba(30, 72, 54, 0.5)",
                  }}
                  className="rounded-brand border border-border bg-secondary p-6"
                >
                  <p className="font-serif text-xl italic leading-relaxed">{item.quote}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                    {item.source}
                  </p>
                </motion.article>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              What the calculator covers
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {calculatorCoverage.map((item, index) => (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
                  className="rounded-brand border bg-background/80 p-5"
                >
                  <motion.div
                    initial={{ y: 0 }}
                    whileInView={{ y: [0, -6, 0] }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.1 }}
                    className="text-3xl"
                  >
                    {item.icon}
                  </motion.div>
                  <h2 className="mt-4 text-2xl font-bold">{item.label}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </motion.article>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              What you'll see
            </p>
            <div className="grid gap-4 lg:grid-cols-3">
              {previewCards.map((card, index) => (
                <motion.article
                  key={card.before}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.12 }}
                  whileHover={{ borderColor: "hsl(var(--accent))" }}
                  className="rounded-brand border border-border bg-background/85 p-6 transition-colors duration-200"
                >
                  <p className="text-lg leading-relaxed">
                    {card.before}
                    <AnimatedCountUp value={card.value} prefix="$" className="font-semibold text-accent" />
                    {card.after}
                  </p>
                </motion.article>
              ))}
            </div>
          </MotionSection>

          <MotionSection className="rounded-brand border bg-secondary/45 p-6">
            <h2 className="text-2xl font-bold">Why This Tool Exists</h2>
            <p className="mt-3 text-muted-foreground">
             Every week, the same thread appears in OpenClaw Discord. Someone's budget is gone. They don't know why. It wasn't one big thing. It was heartbeats firing every 30 minutes. A fallback model they forgot was set. A thinking mode left on high. None of it visible. All of it expensive. This tool exists because the feedback loop was missing. Now it isn't.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Observed from community pain in Discord and GitHub threads discussing unexpected token burn.
            </p>
          </MotionSection>

          <MotionSection className="rounded-brand border bg-background/85 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Field Note #002
            </p>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
              <div className="max-w-2xl">
                <div className="inline-flex overflow-hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  <span className="coming-soon-shimmer">Coming soon</span>
                </div>
                <h2 className="mt-4 text-3xl font-bold">OpenClaw Model Picker</h2>
                <p className="mt-3 text-muted-foreground">
                  Every new OpenClaw user hits the same wall: which model should I use, and what will it cost?
                  This tool asks what you&apos;re trying to do and gives you a clear answer. No Discord thread required.
                </p>
              </div>
              <Link
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
              >
                Follow on Twitter →
              </Link>
            </div>
          </MotionSection>

          <MotionSection className="rounded-brand border bg-background/80 p-6">
            <h2 className="text-2xl font-bold">GuardClaw Ecosystem</h2>
            <p className="mt-3 text-muted-foreground">
              This tool is part of the GuardClaw ecosystem. GuardClaw ships focused, free utilities that solve real
              OpenClaw developer problems and connect into a single trusted toolkit.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href={SOCIAL_LINKS.website}
                target="_blank"
                className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
              >
                Visit Ecosystem Hub
              </Link>
              <Link
                href={SOCIAL_LINKS.tools}
                target="_blank"
                className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Explore GuardClaw Tools
              </Link>
            </div>
          </MotionSection>

          <MotionSection className="grid gap-6 md:grid-cols-2">
            <article className="rounded-brand border bg-secondary/45 p-6">
              <p className="text-2xl leading-none">⭐</p>
              <h2 className="mt-4 text-2xl font-bold">Star on GitHub</h2>
              <p className="mt-3 text-muted-foreground">
                If this tool saved you money, a star helps others find it.
              </p>
              <Link
                href={SOCIAL_LINKS.tool_github}
                target="_blank"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Star the repo →
              </Link>
            </article>

            <article className="rounded-brand border border-accent bg-background/80 p-6">
              <p className="text-2xl leading-none">💜</p>
              <h2 className="mt-4 text-2xl font-bold">Sponsor the build</h2>
              <p className="mt-3 text-muted-foreground">
                Support independent tools built for the OpenClaw community.
              </p>
              <Link
                href="https://github.com/sponsors/RohitKS7"
                target="_blank"
                className="mt-4 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
              >
                Sponsor on GitHub →
              </Link>
            </article>
          </MotionSection>

          <MotionSection className="rounded-brand border bg-background/85 p-6">
            <h2 className="text-2xl font-bold">Builder Identity</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
              <div className="overflow-hidden rounded-brand border border-primary/20">
                <Image src="/headshot-bg.png" alt="Rohit Kumar" width={640} height={640} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="text-lg font-semibold">Built by Rohit Kumar</p>
                <p className="mt-2 text-muted-foreground">
                  Building practical tools in public for OpenClaw developers. Feedback and collaboration are welcome.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  If this tool was useful, a{" "}
                  <Link href="https://github.com/RohitKS7" target="_blank" className="underline underline-offset-2">
                    GitHub star genuinely helps. → github.com/RohitKS7
                  </Link>
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
                  <Link href={SOCIAL_LINKS.github} target="_blank" className="rounded-full border border-primary/30 px-4 py-2">
                    GitHub
                  </Link>
                  <Link href={SOCIAL_LINKS.twitter} target="_blank" className="rounded-full border border-primary/30 px-4 py-2">
                    Twitter/X
                  </Link>
                  <Link href={SOCIAL_LINKS.linkedin} target="_blank" className="rounded-full border border-primary/30 px-4 py-2">
                    LinkedIn
                  </Link>
                  <Link href={SOCIAL_LINKS.website} target="_blank" className="rounded-full border border-primary/30 px-4 py-2">
                    Journey
                  </Link>
                </div>
              </div>
            </div>
          </MotionSection>
        </div>
      </main>
      <Footer />
    </div>
  );
}
