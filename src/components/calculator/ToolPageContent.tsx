"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { FallbackSection } from "@/components/calculator/FallbackSection";
import { HeartbeatSection } from "@/components/calculator/HeartbeatSection";
import { ModelSection } from "@/components/calculator/ModelSection";
import { MultiAgentSection } from "@/components/calculator/MultiAgentSection";
import { ShareButton } from "@/components/calculator/ShareButton";
import { SummaryCard } from "@/components/calculator/SummaryCard";
import { ShareResult } from "@/components/ShareResult";
import { DEFAULT_CALCULATOR_STATE } from "@/data/defaults";
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
    <div className="space-y-6 pb-12">
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

      <MultiAgentSection state={state} metrics={multiAgentMetrics} onChange={updateState} />

      <div className="flex flex-wrap items-center gap-4 rounded-brand border border-primary/20 bg-secondary/40 p-4 text-sm text-muted-foreground">
        <ShareButton url={shareUrl} />
        <p>Share your exact config using a URL with encoded query params.</p>
      </div>

      <p className="text-xs text-muted-foreground">
        Prices are hardcoded from provider docs and should be verified before budgeting. Last updated: {PRICING_LAST_UPDATED}.
      </p>
    </div>
  );
}
