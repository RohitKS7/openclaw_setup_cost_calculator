import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AnnouncementBar } from "@/components/shared/AnnouncementBar";
import { SOCIAL_LINKS } from "@/data/ecosystem";

import {
  FallbackBehaviourIcon,
  HeartbeatBudgetIcon,
  ModelCostIcon,
  MultiAgentModeIcon,
} from "./CalculatorCoverageIcons";

const communityQuotes = [
  {
    quote: "Spent $25 in 10 minutes in a loop.",
    source: "Discord - #general",
  },
  {
    quote: "Burned through my $200 plan in under an hour.",
    source: "Reddit - r/openclaw",
  },
  {
    quote: "Drained my Codex weekly limit in a single afternoon.",
    source: "X - @openclaw",
  },
  {
    quote: "How are you supposed to use openclaw without going broke?",
    source: "Discord - #users-helping-users",
  },
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

const heroCardRotations = ["md:-rotate-1", "md:rotate-1", "md:-rotate-1", "md:rotate-1"];
const heroBadges = [
  "Free and open source",
  "No paywalls",
  "No hidden limits",
  "No account",
  "No data stored",
  "Runs entirely in your browser",
];

function StarBadgeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.5l2.6 5.26 5.8.85-4.2 4.1.99 5.79L12 16.74 6.81 19.5l.99-5.79-4.2-4.1 5.8-.85L12 3.5z" />
    </svg>
  );
}

function SupportBadgeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20s-6.5-3.94-8.5-8.17C2.07 8.92 3.72 6 6.93 6c2.02 0 3.18 1.05 4.02 2.3C11.89 7.05 13.05 6 15.07 6c3.21 0 4.86 2.92 3.43 5.83C18.5 16.06 12 20 12 20z" />
      <path d="M8.5 12h2.1l1.02-2.07L13.4 14l.93-2H16" />
    </svg>
  );
}

export function LandingPageContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBar
        badge="LIVE"
        message="Field Note #002 - OpenClaw Model Picker is Live"
        linkLabel="Try It &#x2192;"
        linkHref="https://picker.guardclaw.dev/"
        external
      />
      <main className="pb-8">
        <section className="container-brand relative flex items-center py-8 sm:py-10 lg:min-h-[calc(100vh-10rem)] lg:py-12">
          <div className="absolute w-max left-1/2 top-8 z-10 -translate-x-1/2 sm:top-10 lg:top-12">
            <div className="mx-auto inline-flex max-w-full items-center justify-center rounded-full bg-accent px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary-foreground shadow-sm reveal-up">
              Part of GuardClaw Ecosystem - Built by Rohit
            </div>
          </div>
          <div className="grid w-full gap-12 md:gap-8 lg:grid-cols-[minmax(0,55%)_minmax(0,45%)] lg:items-center">
            <div className="mx-auto flex max-w-[40rem] flex-col justify-center text-center lg:mx-0 lg:text-left md:relative md:bottom-12">
              <p className="mt-16 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:mt-20 lg:mt-24 reveal-up">
                Field Note #001
              </p>
              <h1 className="mt-3 text-[2rem] font-bold leading-[1.03] text-foreground sm:text-[2.5rem] md:text-[3.25rem] lg:text-[3.5rem] reveal-up reveal-delay-1">
                <span className="relative inline-block">
                  <span className="block">Running blind is</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 260 22"
                    className="pointer-events-none absolute left-0 top-full mt-1 h-4 w-[105%] overflow-visible"
                  >
                    <path
                      d="M3 13C35 18 61 5 91 10C125 15 157 18 190 10C215 4 236 7 257 11"
                      fill="none"
                      stroke="hsl(var(--accent))"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="underline-draw"
                    />
                  </svg>
                </span>
                <span className="mt-3 block">the default state for</span>
                <span className="block">OpenClaw users.</span>
              </h1>

              <p className="mx-auto mt-8 max-w-[21rem] text-[1.02rem] leading-[1.9] text-muted-foreground sm:max-w-[34rem] sm:text-[1.125rem] lg:mx-0 lg:mt-6 lg:max-w-[26rem] lg:text-left reveal-up reveal-delay-2">
                <span className="block">Paste your model config, heartbeat settings, and fallback behaviour to see your real daily and monthly cost - before it drains.</span>
              </p>

              <div className="mx-auto mt-8 flex max-w-[22rem] flex-wrap items-center justify-center gap-2.5 text-center lg:mx-0 lg:max-w-[30rem] lg:justify-start reveal-up reveal-delay-2">
                {heroBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center rounded-full border border-border/70 bg-background/70 px-3 py-1 text-[0.72rem] font-medium leading-5 text-muted-foreground"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex justify-center lg:justify-start reveal-up reveal-delay-3">
                <div className="inline-flex w-full sm:w-auto pulse-cta">
                  <Link
                    href="/calculate"
                    className="inline-flex w-full items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition hover:brightness-105 sm:w-auto"
                  >
                    Calculate my setup cost -&gt;
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-xl max-md:border max-md:border-border/70 max-md:bg-primary max-md:p-4 rounded-lg lg:mx-0 lg:block reveal-up reveal-delay-2">
              <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.15em] max-sm:text-primary-foreground sm:mb-4">
                Seen across Discord, Reddit, and X
              </p>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {communityQuotes.map((item, index) => (
                  <article
                    key={item.quote}
                    className={`rounded-[10px] bg-secondary p-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover-lift ${heroCardRotations[index]}`}
                  >
                    <p className="font-serif text-[1.1rem] italic leading-relaxed text-foreground sm:text-[1.2rem] lg:text-[1.35rem]">
                      {item.quote}
                    </p>
                    <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground [font-variant:small-caps]">
                      {item.source}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container-brand space-y-6 pb-12 sm:space-y-8 max-md:mt-6">
          <section className="space-y-5 reveal-up">
            <div className="flex items-center gap-3 sm:gap-4">
              <p className="shrink-0 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                What the calculator covers
              </p>
              <div className="h-px flex-1 bg-border/80" aria-hidden="true" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-md:text-center">
              {calculatorCoverage.map((item) => (
                <article key={item.label} className="rounded-brand border bg-background/80 p-5 text-center md:text-left hover-lift">
                  <div className="flex justify-center text-3xl md:justify-start">{item.icon}</div>
                  <h2 className="mt-4 text-2xl font-bold">{item.label}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-5 pt-6 pb-8 reveal-up">
          <div className="flex items-center gap-3 sm:gap-4 ">
            <p className=" shrink-0  text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">What you'll see</p>
            <div className="h-px flex-1 bg-border/80" aria-hidden="true" />
            </div>
           
            <div className="grid gap-4 lg:grid-cols-3 max-md:text-center">
              {previewCards.map((card) => (
                <article
                  key={card.before}
                  className="rounded-brand border border-border bg-background/85 p-6 transition-colors duration-200"
                  
                >
                  <p className="text-lg leading-relaxed">
                    {card.before}
                    <span className="font-semibold text-accent">${card.value}</span>
                    {card.after}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-brand border bg-secondary/45 p-6 reveal-up">
            <h2 className="text-2xl font-bold">Why This Tool Exists</h2>
            <p className="mt-3 whitespace-pre-line text-muted-foreground">
              {`Every week, the same pattern shows up in OpenClaw communities:

Someone's budget is gone.
They don't know why.

It's not one big mistake.
It's small things:

- Heartbeats firing every 30 minutes
- A fallback model left on
- Thinking mode running silently

None of it visible.
All of it expensive.

This tool exists to make that visible - before it costs you.

- Rohit`}
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Observed from community pain in Discord and GitHub threads discussing unexpected token burn.
            </p>
          </section>

          <section className="reveal-up">
            <p className="mb-8 mt-3 whitespace-pre-line text-center text-lg font-semibold italic leading-tight text-accent sm:mb-10 sm:text-xl">
              {`"This is just one piece.

More tools are coming to solve the rest." - Rohit`}
            </p>
          </section>

          <div className="grid gap-6 lg:grid-cols-2 reveal-up">
            <section className="rounded-brand border bg-background/85 p-6 hover-lift">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Field Note #002</p>
                <div className="inline-flex overflow-hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  <span className="coming-soon-shimmer">Coming soon</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-5  lg:items-start lg:justify-between">
                <div className="max-w-2xl">
                  <h2 className="text-2xl font-bold">OpenClaw Model Picker</h2>
                  <p className="mt-3 text-base text-muted-foreground">
                    Every new OpenClaw user hits the same wall: which model should I use, and what will it cost? This
                    tool asks what you're trying to do and gives you a clear answer. No Discord thread required.
                  </p>
                </div>
                <Link
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  className="inline-flex w-full items-center justify-center rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground sm:w-auto"
                >
                  Follow on Twitter -&gt;
                </Link>
              </div>
            </section>

            <section className="rounded-brand border bg-background/80 p-6 hover-lift">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold">GuardClaw Ecosystem</h2>
                  <p className="mt-3 text-muted-foreground">
                    GuardClaw is a growing set of small tools built around real problems OpenClaw users face. Each tool
                    solves one specific issue. Together, they form a usable system.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground"># Built in public by Rohit Kumar Suman</p>
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    href={SOCIAL_LINKS.website}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
                  >
                    Visit Ecosystem Hub
                  </Link>
                  <Link
                    href={SOCIAL_LINKS.tools}
                    target="_blank"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
                  >
                    Explore GuardClaw Tools
                  </Link>
                </div>
              </div>
            </section>
          </div>

          <section className="grid gap-6 md:grid-cols-2 reveal-up">
            <article className="rounded-brand border bg-secondary/45 p-6 hover-lift">
              <StarBadgeIcon />
              <h2 className="mt-4 text-2xl font-bold">Star on GitHub</h2>
              <p className="mt-3 text-muted-foreground">If this tool saved you money, a star helps others find it.</p>
              <Link
                href={SOCIAL_LINKS.tool_github}
                target="_blank"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground sm:w-auto"
              >
                Star the repo -&gt;
              </Link>
            </article>

            <article className="rounded-brand border border-accent bg-background/80 p-6 hover-lift">
              <SupportBadgeIcon />
              <h2 className="mt-4 text-2xl font-bold">Sponsor the build</h2>
              <p className="mt-3 text-muted-foreground">Support independent tools built for the OpenClaw community.</p>
              <Link
                href="https://github.com/sponsors/RohitKS7"
                target="_blank"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground sm:w-auto"
              >
                Sponsor on GitHub -&gt;
              </Link>
            </article>
          </section>

          <section className="rounded-brand border bg-background/85 p-6 max-md:text-center reveal-up">
            <h2 className="text-2xl font-bold">Builder Identity</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-brand border border-primary/20 md:mx-0 md:max-w-none">
                <Image
                  src="/headshot-bg.png"
                  alt="Rohit Kumar"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-lg font-semibold">Built by Rohit Kumar Suman</p>
                <p className="mt-2 text-muted-foreground">
                  I build tools based on repeated problems I see in OpenClaw communities. Then I ship them fast.
                  Feedback shapes what comes next.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  If this tool was useful, a{" "}
                  <Link href="https://github.com/RohitKS7" target="_blank" className="underline underline-offset-2">
                    GitHub star genuinely helps. -&gt; github.com/RohitKS7
                  </Link>
                </p>
                <div className="mt-4 grid gap-3 text-sm font-semibold sm:flex sm:flex-wrap">
                  <Link href={SOCIAL_LINKS.github} target="_blank" className="inline-flex items-center justify-center rounded-full border border-primary/30 px-4 py-2">
                    GitHub
                  </Link>
                  <Link href={SOCIAL_LINKS.twitter} target="_blank" className="inline-flex items-center justify-center rounded-full border border-primary/30 px-4 py-2">
                    Twitter/X
                  </Link>
                  <Link href={SOCIAL_LINKS.linkedin} target="_blank" className="inline-flex items-center justify-center rounded-full border border-primary/30 px-4 py-2">
                    LinkedIn
                  </Link>
                  <Link href={SOCIAL_LINKS.website} target="_blank" className="inline-flex items-center justify-center rounded-full border border-primary/30 px-4 py-2">
                    Journey
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
