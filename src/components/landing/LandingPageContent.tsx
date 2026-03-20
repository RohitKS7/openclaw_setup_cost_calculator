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

const heroCardRotations = ["-rotate-1", "rotate-1", "-rotate-1", "rotate-1"];

export function LandingPageContent() {
  return (
    <div className="min-h-screen">
      <Header />
      <AnnouncementBar
        badge="COMING SOON"
        message="Field Note #002 - OpenClaw Model Picker is coming soon."
        linkLabel="Follow along -&gt;"
        linkHref={SOCIAL_LINKS.twitter}
        external
      />
      <main className="pb-8">
        <section className="container-brand flex min-h-[calc(100vh-10rem)] items-center py-10 md:py-12">
          <div className="grid w-full gap-12 md:grid-cols-[minmax(0,55%)_minmax(0,45%)] md:items-center">
            <div className="flex max-w-[40rem] flex-col justify-center">
              <h1 className="text-[2.25rem] font-bold leading-[1.15] text-foreground md:text-[3.5rem]">
                <span className="relative inline-block">
                  <span>Running blind</span>
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
                    />
                  </svg>
                </span>{" "}
                is the default state for OpenClaw users.
              </h1>

              <p className="mt-6 max-w-[30rem] text-[1.125rem] text-muted-foreground">
                Paste your model config, heartbeat settings, and fallback behaviour to see your real daily and monthly
                cost - <br />
                before it drains. <br />
                <span className="text-xs"> 
                Free and open source. No paywalls. No hidden limits. No account. No data stored. Runs entirely in your browser.
                  </span>
              </p>

              <div className="mt-8">
                <div className="inline-flex">
                  <Link
                    href="/calculate"
                    className="rounded-full bg-accent px-8 py-4 text-base font-semibold text-accent-foreground transition hover:brightness-105"
                  >
                    Calculate my setup cost -&gt;
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Built by{" "}
                <Link href={SOCIAL_LINKS.github} target="_blank" className="transition hover:text-foreground">
                  Rohit
                </Link>{" "}
                - Part of{" "}
                <Link href={SOCIAL_LINKS.tools} target="_blank" className="transition hover:text-foreground">
                  GuardClaw toolkit
                </Link>
              </p>
            </div>

            <div className="relative">
              <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Seen across Discord, Reddit, and X
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {communityQuotes.map((item, index) => (
                  <article
                    key={item.quote}
                    className={`rounded-[6px] bg-secondary px-6 py-5 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${heroCardRotations[index]}`}
                  >
                    <p className="font-serif text-[1.35rem] italic leading-relaxed text-foreground">{item.quote}</p>
                    <p className="mt-4 text-xs font-semibold tracking-[0.16em] text-muted-foreground [font-variant:small-caps]">
                      {item.source}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="container-brand space-y-8 pb-12">
          <section className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              What the calculator covers
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {calculatorCoverage.map((item) => (
                <article key={item.label} className="rounded-brand border bg-background/80 p-5">
                  <div className="text-3xl">{item.icon}</div>
                  <h2 className="mt-4 text-2xl font-bold">{item.label}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </article>
              ))}
            </div>
              <span className="text-sm text-muted-foreground">
              No account. No data stored. Runs entirely in your browser.
              </span>
          </section>

          <section className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">What you'll see</p>
            <div className="grid gap-4 lg:grid-cols-3">
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

          <section className="rounded-brand border bg-secondary/45 p-6">
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

          <section>
            <p className="mb-10 mt-3 text-center text-xl font-semibold italic leading-tight text-accent whitespace-pre-line">
              {`"This is just one piece.

More tools are coming to solve the rest." - Rohit`}
            </p>
          </section>

          <div className="grid gap-6 lg:grid-cols-2">
            <section className="rounded-brand border bg-background/85 p-6">
              <div className="flex justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Field Note #002</p>
                <div className="inline-flex overflow-hidden rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  <span className="coming-soon-shimmer">Coming soon</span>
                </div>
              </div>
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div className="max-w-2xl">
                  <h2 className="mt-4 text-2xl font-bold">OpenClaw Model Picker</h2>
                  <p className="mt-3 text-base text-muted-foreground">
                    Every new OpenClaw user hits the same wall: which model should I use, and what will it cost? This
                    tool asks what you're trying to do and gives you a clear answer. No Discord thread required.
                  </p>
                </div>
                <Link
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-primary hover:text-primary-foreground"
                >
                  Follow on Twitter -&gt;
                </Link>
              </div>
            </section>

            <section className="rounded-brand border bg-background/80 p-6">
              <div className="flex h-full flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold">GuardClaw Ecosystem</h2>
                  <p className="mt-3 text-muted-foreground">
                    GuardClaw is a growing set of small tools built around real problems OpenClaw users face. Each tool
                    solves one specific issue. Together, they form a usable system.
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground"># Built in public by Rohit Kumar Suman</p>
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
            </section>
          </div>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="rounded-brand border bg-secondary/45 p-6">
              <p className="text-2xl leading-none">Star</p>
              <h2 className="mt-4 text-2xl font-bold">Star on GitHub</h2>
              <p className="mt-3 text-muted-foreground">If this tool saved you money, a star helps others find it.</p>
              <Link
                href={SOCIAL_LINKS.tool_github}
                target="_blank"
                className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
              >
                Star the repo -&gt;
              </Link>
            </article>

            <article className="rounded-brand border border-accent bg-background/80 p-6">
              <p className="text-2xl leading-none">Support</p>
              <h2 className="mt-4 text-2xl font-bold">Sponsor the build</h2>
              <p className="mt-3 text-muted-foreground">Support independent tools built for the OpenClaw community.</p>
              <Link
                href="https://github.com/sponsors/RohitKS7"
                target="_blank"
                className="mt-4 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
              >
                Sponsor on GitHub -&gt;
              </Link>
            </article>
          </section>

          <section className="rounded-brand border bg-background/85 p-6">
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
                  I build tools based on repeated problems I see in OpenClaw communities. Then I ship them fast.
                  Feedback shapes what comes next.
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  If this tool was useful, a{" "}
                  <Link href="https://github.com/RohitKS7" target="_blank" className="underline underline-offset-2">
                    GitHub star genuinely helps. -&gt; github.com/RohitKS7
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
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}