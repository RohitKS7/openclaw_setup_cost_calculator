"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FallbackSection } from "@/components/calculator/FallbackSection";
import { HeartbeatSection } from "@/components/calculator/HeartbeatSection";
import { ModelSection } from "@/components/calculator/ModelSection";
import { MultiAgentSection } from "@/components/calculator/MultiAgentSection";
import { ShareButton } from "@/components/calculator/ShareButton";
import { SummaryCard } from "@/components/calculator/SummaryCard";
import { ShareResult } from "@/components/ShareResult";
import { ToolLayout } from "@/components/layout/ToolLayout";
import { MotionSection } from "@/components/shared/MotionSection";
import { DEFAULT_CALCULATOR_STATE } from "@/data/defaults";
import { FUTURE_TOOLS, SOCIAL_LINKS } from "@/data/ecosystem";
import {
  DEFAULT_HEARTBEAT_MODEL,
  DEFAULT_PRIMARY_MODEL,
  MODEL_PRICING,
  PRICING_LAST_UPDATED,
} from "@/data/pricing";
import type { CostTip } from "@/types/calculator";
import {
  calculateCosts,
  calculateFallbackCosts,
  calculateMultiAgentCosts,
  calculateRateLimitUsagePercent,
  type ExtendedCalculatorState,
  getCostReductionTips,
} from "@/utils/calculate";
import { decodeStateFromParams, encodeStateToParams } from "@/utils/urlState";

const buildInitialState = (): ExtendedCalculatorState => ({
  ...DEFAULT_CALCULATOR_STATE,
  primaryModel: DEFAULT_PRIMARY_MODEL,
  heartbeatModel: DEFAULT_HEARTBEAT_MODEL,
  fallbackModel: DEFAULT_HEARTBEAT_MODEL,
  billingMode: "payg",
  usagePhase: "steady",
  localServerCostPerHour: 0,
  fallbackTriggerRate: 0,
  multiAgentEnabled: false,
  numberOfAgents: 1,
  perAgentModel: DEFAULT_PRIMARY_MODEL,
});

const getDangerLevel = (monthlyCost: number) => {
  if (monthlyCost > 100) {
    return "critical" as const;
  }

  if (monthlyCost > 50) {
    return "high" as const;
  }

  if (monthlyCost > 20) {
    return "moderate" as const;
  }

  return "safe" as const;
};

const getSummaryMetrics = (state: ExtendedCalculatorState) => {
  const baseMetrics = calculateCosts(state);
  const fallbackMetrics = calculateFallbackCosts(state);
  const multiAgentMetrics = calculateMultiAgentCosts(state);
  const phaseMultiplier = state.usagePhase === "setup" ? 3 : 1;

  const fallbackAdjustedMessageDaily =
    (state.fallbackTriggerRate ?? 0) > 0
      ? fallbackMetrics.blendedDailyCost
      : baseMetrics.dailyMessageCost;

  const effectiveMessageDaily = multiAgentMetrics.enabled
    ? multiAgentMetrics.totalAgentsDailyCost
    : fallbackAdjustedMessageDaily;

  const backgroundDaily = state.backgroundTaskCostPerDay * phaseMultiplier;
  const totalDailyCost =
    effectiveMessageDaily + baseMetrics.dailyHeartbeatCost + backgroundDaily;
  const totalMonthlyCost = totalDailyCost * 30;

  const breakdown =
    totalDailyCost > 0
      ? {
          messages: effectiveMessageDaily / totalDailyCost,
          heartbeats: baseMetrics.dailyHeartbeatCost / totalDailyCost,
          background: backgroundDaily / totalDailyCost,
        }
      : { messages: 0, heartbeats: 0, background: 0 };

  const costPerThousandMessages =
    state.messagesPerDay > 0 ? (effectiveMessageDaily / state.messagesPerDay) * 1000 : 0;

  return {
    baseMetrics,
    fallbackMetrics,
    multiAgentMetrics,
    composedMetrics: {
      ...baseMetrics,
      dailyMessageCost: effectiveMessageDaily,
      monthlyMessageCost: effectiveMessageDaily * 30,
      costPerThousandMessages,
      totalDailyCost,
      totalMonthlyCost,
      dangerLevel: getDangerLevel(totalMonthlyCost),
      breakdown,
    },
  };
};

export function ToolPageContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [state, setState] = useState<ExtendedCalculatorState>(buildInitialState());
  const [isToolInterfaceCollapsed, setIsToolInterfaceCollapsed] = useState(false);
  const [savedMonthlyDiff, setSavedMonthlyDiff] = useState<number | null>(null);

  useEffect(() => {
    const decoded = decodeStateFromParams(new URLSearchParams(searchParams.toString()));

    const primaryModel = MODEL_PRICING[decoded.primaryModel]
      ? decoded.primaryModel
      : DEFAULT_PRIMARY_MODEL;
    const heartbeatModel = MODEL_PRICING[decoded.heartbeatModel]
      ? decoded.heartbeatModel
      : DEFAULT_HEARTBEAT_MODEL;
    const fallbackModel = MODEL_PRICING[decoded.fallbackModel]
      ? decoded.fallbackModel
      : DEFAULT_HEARTBEAT_MODEL;

    setState({
      ...buildInitialState(),
      ...decoded,
      primaryModel,
      heartbeatModel,
      fallbackModel,
      perAgentModel: primaryModel,
    });
  }, [searchParams]);

  const { baseMetrics, fallbackMetrics, multiAgentMetrics, composedMetrics } = useMemo(
    () => getSummaryMetrics(state),
    [state],
  );

  const usagePercent = useMemo(() => calculateRateLimitUsagePercent(state), [state]);

  const costTips = useMemo(
    () => getCostReductionTips(state, composedMetrics),
    [state, composedMetrics],
  );

  const shareUrl = useMemo(() => {
    const params = encodeStateToParams(state);
    const base = typeof window !== "undefined" ? window.location.origin : "https://guardclaw.dev";
    return `${base}${pathname}?${params.toString()}`;
  }, [pathname, state]);

  const updateState = (next: Partial<ExtendedCalculatorState>) => {
    setSavedMonthlyDiff(null);
    setState((current) => ({ ...current, ...next }));
  };

  const applyTip = (tip: CostTip) => {
    if (!tip.action) {
      return;
    }

    const currentMonthly = composedMetrics.totalMonthlyCost;

    const nextState: ExtendedCalculatorState = {
      ...state,
      [tip.action.field]: tip.action.value,
    } as ExtendedCalculatorState;

    const nextMonthly = getSummaryMetrics(nextState).composedMetrics.totalMonthlyCost;
    const saving = Math.max(currentMonthly - nextMonthly, 0);

    setSavedMonthlyDiff(saving);
    setState(nextState);
  };

  return (
    <ToolLayout
      title="OpenClaw Setup Cost Calculator"
      subtitle="Paste your OpenClaw-style setup, model choices, and heartbeat settings to estimate daily and monthly token spend before it burns your budget."
    >
      <div className="space-y-8 pb-12">
        <MotionSection className="rounded-brand border bg-background/85 p-6" delay={0.05}>
          <button
            type="button"
            aria-expanded={!isToolInterfaceCollapsed}
            aria-controls="tool-interface-content"
            onClick={() => setIsToolInterfaceCollapsed((current) => !current)}
            className="flex w-full items-center justify-between gap-3 text-left"
          >
            <h2 className="text-3xl font-bold">Tool Interface</h2>
            <div className="relative flex items-center">
              {isToolInterfaceCollapsed ? (
                <span className="absolute -top-8 right-0 whitespace-nowrap rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-sm">
                  Open Me
                </span>
              ) : null}
              <span
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 text-xl leading-none transition-transform duration-200 ${
                  isToolInterfaceCollapsed ? "rotate-0" : "rotate-180"
                }`}
                aria-hidden="true"
              >
                &#9662;
              </span>
            </div>
          </button>

          {!isToolInterfaceCollapsed ? (
            <div id="tool-interface-content" className="mt-6 space-y-6">
              <div className="grid gap-6 xl:grid-cols-2">
                <ModelSection state={state} usagePercent={usagePercent} onChange={updateState} />
                <HeartbeatSection
                  state={state}
                  heartbeatsPerDay={baseMetrics.heartbeatsPerDay}
                  dailyHeartbeatTokens={baseMetrics.dailyHeartbeatTokens}
                  dailyHeartbeatCost={baseMetrics.dailyHeartbeatCost}
                  monthlyHeartbeatCost={baseMetrics.monthlyHeartbeatCost}
                  showWarning={baseMetrics.showHeartbeatWarning}
                  warningPercent={baseMetrics.heartbeatPctOfTotal}
                  onChange={updateState}
                />
              </div>

              <SummaryCard
                totalDailyCost={composedMetrics.totalDailyCost}
                totalMonthlyCost={composedMetrics.totalMonthlyCost}
                messageCost={composedMetrics.dailyMessageCost}
                heartbeatCost={composedMetrics.dailyHeartbeatCost}
                costPerThousandMessages={composedMetrics.costPerThousandMessages}
                breakdown={composedMetrics.breakdown}
                dangerLevel={composedMetrics.dangerLevel}
                tips={costTips}
                savedMonthlyDiff={savedMonthlyDiff}
                onApplyTip={applyTip}
              />

              <ShareResult
                primaryModel={state.primaryModel}
                heartbeatInterval={state.heartbeatInterval}
                avgInputTokens={state.avgInputTokens}
                estimatedMonthlyCost={composedMetrics.totalMonthlyCost}
              />

              <FallbackSection state={state} metrics={fallbackMetrics} onChange={updateState} />

              <MultiAgentSection
                state={state}
                metrics={multiAgentMetrics}
                onChange={updateState}
              />

              <div className="flex flex-wrap items-center gap-4 rounded-brand border border-primary/20 bg-secondary/40 p-4 text-sm text-muted-foreground">
                <ShareButton url={shareUrl} />
                <p>Share your exact config using a URL with encoded query params.</p>
              </div>

              <p className="text-xs text-muted-foreground">
                Prices are hardcoded from provider docs and should be verified before budgeting. Last updated: {PRICING_LAST_UPDATED}.
              </p>
            </div>
          ) : null}
        </MotionSection>

        <MotionSection className="rounded-brand border bg-secondary/45 p-6" delay={0.1}>
          <h2 className="text-2xl font-bold">Why This Tool Exists</h2>
          <p className="mt-3 text-muted-foreground">
            OpenClaw users repeatedly report spending spikes from invisible cost drivers: high message volume,
            aggressive output settings, and heartbeats running every few minutes. This calculator creates a
            tight feedback loop so configuration decisions can be evaluated before budget is exhausted.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Observed from community pain in Discord and GitHub threads discussing unexpected token burn.
          </p>
        </MotionSection>

        <MotionSection className="rounded-brand border bg-background/80 p-6" delay={0.15}>
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
              href="/"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Explore GuardClaw Tools
            </Link>
          </div>
        </MotionSection>

        <MotionSection className="rounded-brand border bg-secondary/45 p-6" delay={0.2}>
          <h2 className="text-2xl font-bold">Future Tools</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {FUTURE_TOOLS.map((tool) => (
              <article key={tool.name} className="rounded-brand border border-primary/20 bg-background/80 p-4">
                <h3 className="text-lg font-semibold">{tool.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
              </article>
            ))}
          </div>
        </MotionSection>

        <MotionSection className="rounded-brand border bg-background/85 p-6" delay={0.25}>
          <h2 className="text-2xl font-bold">Feedback</h2>
          <p className="mt-3 text-muted-foreground">
            Found an edge case or pricing mismatch? Open an issue and include your shared URL so the config can be reproduced.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={`${SOCIAL_LINKS.github}/issues`}
              target="_blank"
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              Submit GitHub Issue
            </Link>
            <Link
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold"
            >
              Share on Twitter/X
            </Link>
          </div>
        </MotionSection>

        <MotionSection className="grid gap-6 md:grid-cols-2" delay={0.3}>
          <article className="rounded-brand border bg-secondary/45 p-6">
            <h2 className="text-2xl font-bold">GitHub Repository</h2>
            <p className="mt-3 text-muted-foreground">
              Source code is open and maintained in public to keep pricing assumptions and logic transparent.
            </p>
            <Link
              href={SOCIAL_LINKS.github}
              target="_blank"
              className="mt-4 inline-flex rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
            >
              View on GitHub
            </Link>
          </article>

          <article className="rounded-brand border bg-background/80 p-6">
            <h2 className="text-2xl font-bold">Support the Builder</h2>
            <p className="mt-3 text-muted-foreground">
              If this tool saved budget for your team, support maintenance and new Field Notes.
            </p>
            <Link
              href={SOCIAL_LINKS.buyMeACoffee}
              target="_blank"
              className="mt-4 inline-flex rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
            >
              Buy Me A Coffee
            </Link>
          </article>
        </MotionSection>

        <MotionSection className="rounded-brand border bg-background/85 p-6" delay={0.35}>
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
    </ToolLayout>
  );
}
