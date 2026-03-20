"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/shared/AnnouncementBar";
import { MotionSection } from "@/components/shared/MotionSection";
import { SOCIAL_LINKS } from "@/data/ecosystem";

import { AnimatedCountUp } from "./AnimatedCountUp";
import {
  FallbackBehaviourIcon,
  HeartbeatBudgetIcon,
  ModelCostIcon,
  MultiAgentModeIcon,
} from "./CalculatorCoverageIcons";

const communityQuotes = [
  {
    quote: "Spent $25 in 10 minutes in a loop.",
    source: "Discord \u2014 #general",
  },
  {
    quote: "Burned through my $200 plan in under an hour.",
    source: "Reddit \u2014 r/openclaw",
  },
  {
    quote: "Drained my Codex weekly limit in a single afternoon.",
    source: "X \u2014 @openclaw",
  },
  {
    quote: "How are you supposed to use this without going broke?",
    source: "Discord \u2014 #users-helping-users",
  },
];

const heroCardRotations = [
  { desktop: -1.5, mobile: -0.5 },
  { desktop: 1, mobile: 0.5 },
  { desktop: -0.8, mobile: -0.4 },
  { desktop: 1.2, mobile: 0.5 },
];

const calculatorCoverage = [
  {
    icon: <ModelCostIcon className="h-12 w-12" />,
    label: "Model cost",
    description: "Where your money actually goes",
  },
  {
    icon: <HeartbeatBudgetIcon className="h-12 w-12" />,
    label: "Heartbeat budget",
    description: "Silent cost while idle",
  },
  {
    icon: <FallbackBehaviourIcon className="h-12 w-12" />,
    label: "Fallback behaviour",
    description: "Hidden cost switches",
  },
  {
    icon: <MultiAgentModeIcon className="h-12 w-12" />,
    label: "Multi-agent mode",
    description: "Seen across Discord, Reddit, and X",
  },
];

const previewCards = [
  {
    value: 38,
    before: "Your heartbeat alone is costing you ",
    after: "/month",
  },
  {
    value: 200,
    before: "You'll drain your ",
    after: " plan in ~4 hours",
  },
  {
    value: 22,
    before: "Switching fallback saves ",
    after: "/month instantly",
  },
];

export function LandingPageContent() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBar
        badge="COMING SOON"
        message="Field Note #002 — OpenClaw Model Picker is coming soon."
        linkLabel="Follow along →"
        linkHref={SOCIAL_LINKS.twitter}
        external
      />
      <main className="pb-8">
        <section className="container-brand flex min-h-[calc(100vh-10rem)] items-center py-10 md:py-12">
          <div className="grid w-full gap-12 md:grid-cols-[minmax(0,55%)_minmax(0,45%)] md:items-center">
            <div className="flex max-w-[40rem] flex-col justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-[2.25rem] font-bold leading-[1.15] text-foreground md:text-[3.5rem]"
              >
                <span className="relative inline-block">
                  <span>Running blind</span>
                  <motion.svg
                    aria-hidden="true"
                    viewBox="0 0 260 22"
                    className="pointer-events-none absolute left-0 top-full mt-1 h-4 w-[105%] overflow-visible"
                  >
                    <motion.path
                      d="M3 13C35 18 61 5 91 10C125 15 157 18 190 10C215 4 236 7 257 11"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
                    />
                  </motion.svg>
                </span>{" "}
                is the default state for OpenClaw users.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                className="mt-6 max-w-[30rem] text-[1.125rem] text-muted-foreground"
              >
                Paste your model config, heartbeat settings, and fallback behaviour to see your real daily and monthly
                cost {"\u2014"} <br />
                before it drains.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
                className="mt-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
                  whileHover={{ scale: 1.05, filter: "brightness(1.05)" }}
                  className="inline-flex"
                >
                  <Link
                    href="/calculate"
                    className="rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition"
                  >
                    {"Calculate my setup cost \u2192"}
                  </Link>
                </motion.div>
              </motion.div>

              <p className="mt-4 text-sm text-muted-foreground">
                Built by{" "}
                <Link href={SOCIAL_LINKS.github} target="_blank" className="hover:text-foreground transition">
                  Rohit
                </Link>{" "}
                • Part of{" "}
                <Link href={SOCIAL_LINKS.tools} target="_blank" className="hover:text-foreground transition">
                  GuardClaw toolkit
                </Link>
              </p>
            </div>

            <div className="relative">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground text-center ">
              Seen across Discord, Reddit, and X
              </p>
              {/* <p className="absolute left-0 top-1/2 hidden -translate-x-[1.9rem] -translate-y-[-5rem] -rotate-90 origin-bottom-left text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-muted-foreground md:block">
                The problem, in their words
              </p> */}

              <div className="grid gap-4 sm:grid-cols-2">
                {communityQuotes.map((item, index) => (
                  <motion.article
                    key={item.quote}
                    initial={{ opacity: 0, y: 16, rotate: 0 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      rotate: isMobile ? heroCardRotations[index].mobile : heroCardRotations[index].desktop,
                    }}
                    transition={{ duration: 0.35, ease: "easeOut", delay: index * 0.08 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.13)",
                    }}
                    className="rounded-[6px] bg-secondary px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
                  >
                    <p className="font-serif text-[1.35rem] italic leading-relaxed text-foreground">{item.quote}</p>
                    <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground [font-variant:small-caps]">
                      {item.source}
                    </p>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container-brand space-y-8 pb-12">
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
            <p className="mt-3 whitespace-pre-line text-muted-foreground">
              {`Every week, the same pattern shows up in OpenClaw communities:

Someone’s budget is gone.
They don’t know why.

It’s not one big mistake.
It’s small things:

• Heartbeats firing every 30 minutes
• A fallback model left on
• Thinking mode running silently

None of it visible.
All of it expensive.

This tool exists to make that visible — before it costs you.

— Rohit`}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Observed from community pain in Discord and GitHub threads discussing unexpected token burn.
            </p>
          </MotionSection> 

<MotionSection>

          <p className="mt-3 mb-10 text-accent font-semibold text-center italic whitespace-pre-line text-xl leading-tight ">
            {`"This is just one piece.

More tools are coming to solve the rest." — Rohit`}
          </p>
</MotionSection>

          <div className="grid gap-6 lg:grid-cols-2">
            <MotionSection className="rounded-brand border bg-background/85 p-6">
            <div className="flex justify-between">

              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Field Note #002
              </p>
              <div className="inline-flex overflow-hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                    <span className="coming-soon-shimmer">Coming soon</span>
                  </div>
            </div>
              <div className=" flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-2xl">
                  <h2 className="mt-4 text-2xl font-bold">OpenClaw Model Picker</h2>
                  <p className="mt-3 text-muted-foreground text-base">
                    Every new OpenClaw user hits the same wall: which model should I use, and what will it cost? This
                    tool asks what you&apos;re trying to do and gives you a clear answer. No Discord thread required.
                  </p>
                </div>
                <Link
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
                >
                  {"Follow on Twitter \u2192"}
                </Link>
              </div>
            </MotionSection>

            <MotionSection className="rounded-brand border bg-background/80 p-6">
            <div className="flex flex-col justify-between h-full">
              <div>

              <h2 className="text-2xl font-bold">GuardClaw Ecosystem</h2>
              <p className="mt-3 text-muted-foreground">
                GuardClaw is a growing set of small tools built around real problems OpenClaw users face. Each
                tool solves one specific issue. Together, they form a usable system.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                # Built in public by Rohit Kumar Suman
              </p>
              </div>
           
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
              </div>
            </MotionSection>
          </div>

          <MotionSection className="grid gap-6 md:grid-cols-2">
            <article className="rounded-brand border bg-secondary/45 p-6">
              <p className="text-2xl leading-none">⭐</p>
              <h2 className="mt-4 text-2xl font-bold">Star on GitHub</h2>
              <p className="mt-3 text-muted-foreground">If this tool saved you money, a star helps others find it.</p>
              <Link
                href={SOCIAL_LINKS.tool_github}
                target="_blank"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                {"Star the repo \u2192"}
              </Link>
            </article>

            <article className="rounded-brand border border-accent bg-background/80 p-6">
              <p className="text-2xl leading-none">💞</p>
              <h2 className="mt-4 text-2xl font-bold">Sponsor the build</h2>
              <p className="mt-3 text-muted-foreground">Support independent tools built for the OpenClaw community.</p>
              <Link
                href="https://github.com/sponsors/RohitKS7"
                target="_blank"
                className="mt-4 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
              >
                {"Sponsor on GitHub \u2192"}
              </Link>
            </article>
          </MotionSection>

          <MotionSection className="rounded-brand border bg-background/85 p-6">
            <h2 className="text-2xl font-bold">Builder Identity</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
              <div className="overflow-hidden rounded-brand border border-primary/20">
                <Image
                  src="/headshot-bg.png"
                  alt="Rohit Kumar"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Built by Rohit Kumar</p>
                <p className="mt-2 text-muted-foreground">
                I build tools based on repeated problems I see in OpenClaw communities. Then I ship them fast. Feedback shapes what comes next.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  If this tool was useful, a{" "}
                  <Link href="https://github.com/RohitKS7" target="_blank" className="underline underline-offset-2">
                    {"GitHub star genuinely helps. \u2192 github.com/RohitKS7"}
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
