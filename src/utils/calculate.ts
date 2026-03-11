import {
  DEFAULT_PRIMARY_MODEL,
  MODEL_OPTIONS,
  MODEL_PRICING,
  type ModelPrice,
} from "@/data/pricing";
import type {
  CalculatorState,
  CostMetrics,
  CostTip,
  DangerLevel,
  ThinkingMode,
} from "@/types/calculator";

export type BillingMode = "payg" | "subscription";
export type UsagePhase = "steady" | "setup";

export type ExtendedCalculatorState = CalculatorState & {
  billingMode?: BillingMode;
  usagePhase?: UsagePhase;
  localServerCostPerHour?: number;
  fallbackTriggerRate?: number;
  multiAgentEnabled?: boolean;
  numberOfAgents?: number;
  perAgentModel?: string;
  dailyRateLimitTokens?: number;
};

export interface FallbackCostMetrics {
  fallbackModel: string;
  fallbackRate: number;
  fallbackDailyCost: number;
  blendedDailyCost: number;
  blendedMonthlyCost: number;
}

export interface MultiAgentCostMetrics {
  enabled: boolean;
  numberOfAgents: number;
  perAgentModel: string;
  perAgentDailyCost: number;
  perAgentMonthlyCost: number;
  totalAgentsDailyCost: number;
  totalAgentsMonthlyCost: number;
  showWarning: boolean;
}

const THINKING_MULTIPLIER: Record<ThinkingMode, number> = {
  off: 1,
  low: 1.5,
  high: 3,
};

const getDangerLevel = (monthlyCost: number): DangerLevel => {
  if (monthlyCost > 100) {
    return "critical";
  }

  if (monthlyCost > 50) {
    return "high";
  }

  if (monthlyCost > 20) {
    return "moderate";
  }

  return "safe";
};

const getPrimaryModelConfig = (state: ExtendedCalculatorState): ModelPrice => {
  const selected = MODEL_PRICING[state.primaryModel];
  if (selected) {
    return selected;
  }

  return MODEL_PRICING[DEFAULT_PRIMARY_MODEL];
};

const getModelConfig = (modelId: string): ModelPrice | undefined => {
  return MODEL_PRICING[modelId];
};

const getPhaseMultiplier = (state: ExtendedCalculatorState): number => {
  return state.usagePhase === "setup" ? 3 : 1;
};

const isDollarSuppressedForPrimary = (state: ExtendedCalculatorState): boolean => {
  const model = getPrimaryModelConfig(state);
  return state.billingMode === "subscription" || Boolean(model.free) || Boolean(model.localCompute);
};

const getDailyRateLimitTokens = (state: ExtendedCalculatorState): number => {
  if (state.dailyRateLimitTokens && state.dailyRateLimitTokens > 0) {
    return state.dailyRateLimitTokens;
  }

  if (state.primaryModel.startsWith("anthropic/")) {
    return 6_000_000;
  }

  if (state.primaryModel.startsWith("openai-codex/")) {
    return 8_000_000;
  }

  return 5_000_000;
};

export const calculateRateLimitUsagePercent = (state: ExtendedCalculatorState): number => {
  const dailyInputTokens = state.messagesPerDay * state.avgInputTokens;
  const dailyOutputTokens =
    state.messagesPerDay * state.avgOutputTokens * THINKING_MULTIPLIER[state.thinkingMode];
  const totalTokens = (dailyInputTokens + dailyOutputTokens) * getPhaseMultiplier(state);
  return (totalTokens / getDailyRateLimitTokens(state)) * 100;
};

export const getModelBehavior = (modelId: string): {
  freeTier: boolean;
  localCompute: boolean;
} => {
  const model = getModelConfig(modelId);
  return {
    freeTier: Boolean(model?.free),
    localCompute: Boolean(model?.localCompute),
  };
};

export const calculateCosts = (state: ExtendedCalculatorState): CostMetrics => {
  const primary = getPrimaryModelConfig(state);
  const heartbeatModel =
    getModelConfig(state.heartbeatModel) ?? MODEL_PRICING["anthropic/claude-haiku-4-5"];

  const dailyInputTokens = state.messagesPerDay * state.avgInputTokens;
  const dailyOutputTokens = state.messagesPerDay * state.avgOutputTokens;
  const adjustedOutputTokens = dailyOutputTokens * THINKING_MULTIPLIER[state.thinkingMode];

  const primaryInputPrice = primary.input ?? 0;
  const primaryOutputPrice = primary.output ?? 0;

  const rawDailyMessageCost =
    (dailyInputTokens / 1_000_000) * primaryInputPrice +
    (adjustedOutputTokens / 1_000_000) * primaryOutputPrice;

  let dailyMessageCost = isDollarSuppressedForPrimary(state) ? 0 : rawDailyMessageCost;

  if (primary.localCompute && (state.localServerCostPerHour ?? 0) > 0) {
    dailyMessageCost += (state.localServerCostPerHour ?? 0) * 24;
  }

  const heartbeatsPerDay = state.heartbeatInterval > 0 ? 1440 / state.heartbeatInterval : 0;
  const dailyHeartbeatInputTokens = heartbeatsPerDay * state.heartbeatPromptTokens;
  const dailyHeartbeatOutputTokens = heartbeatsPerDay * state.heartbeatResponseTokens;

  const heartbeatInputPrice = heartbeatModel.input ?? 0;
  const heartbeatOutputPrice = heartbeatModel.output ?? 0;

  let dailyHeartbeatCost =
    (dailyHeartbeatInputTokens / 1_000_000) * heartbeatInputPrice +
    (dailyHeartbeatOutputTokens / 1_000_000) * heartbeatOutputPrice;

  if (heartbeatModel.free || heartbeatModel.localCompute) {
    dailyHeartbeatCost = 0;
  }

  const phaseMultiplier = getPhaseMultiplier(state);
  dailyMessageCost *= phaseMultiplier;
  dailyHeartbeatCost *= phaseMultiplier;

  const monthlyMessageCost = dailyMessageCost * 30;
  const monthlyHeartbeatCost = dailyHeartbeatCost * 30;

  const totalDailyCost =
    dailyMessageCost + dailyHeartbeatCost + state.backgroundTaskCostPerDay * phaseMultiplier;
  const totalMonthlyCost = totalDailyCost * 30;
  const heartbeatPctOfTotal = totalDailyCost > 0 ? dailyHeartbeatCost / totalDailyCost : 0;

  const costPerThousandMessages =
    state.messagesPerDay > 0 ? (dailyMessageCost / state.messagesPerDay) * 1000 : 0;

  const breakdown = {
    messages: totalDailyCost > 0 ? dailyMessageCost / totalDailyCost : 0,
    heartbeats: totalDailyCost > 0 ? dailyHeartbeatCost / totalDailyCost : 0,
    background:
      totalDailyCost > 0
        ? (state.backgroundTaskCostPerDay * phaseMultiplier) / totalDailyCost
        : 0,
  };

  return {
    dailyMessageCost,
    monthlyMessageCost,
    costPerThousandMessages,
    heartbeatsPerDay,
    dailyHeartbeatCost,
    monthlyHeartbeatCost,
    dailyHeartbeatTokens: dailyHeartbeatInputTokens + dailyHeartbeatOutputTokens,
    heartbeatPctOfTotal,
    showHeartbeatWarning: heartbeatPctOfTotal > 0.3,
    totalDailyCost,
    totalMonthlyCost,
    dangerLevel: getDangerLevel(totalMonthlyCost),
    breakdown,
  };
};

export const recalcWithModel = (
  state: ExtendedCalculatorState,
  model: string,
  field: "primaryModel" | "heartbeatModel" = "primaryModel",
): CostMetrics => {
  return calculateCosts({ ...state, [field]: model });
};

export const recalcWithInterval = (
  state: ExtendedCalculatorState,
  interval: number,
): CostMetrics => {
  return calculateCosts({ ...state, heartbeatInterval: interval });
};

export const recalcWithThinking = (
  state: ExtendedCalculatorState,
  mode: ThinkingMode,
): CostMetrics => {
  return calculateCosts({ ...state, thinkingMode: mode });
};

export const calculateFallbackCosts = (
  state: ExtendedCalculatorState,
): FallbackCostMetrics => {
  const fallbackModel = state.fallbackModel;
  const rate = Math.min(100, Math.max(0, state.fallbackTriggerRate ?? 0)) / 100;

  const primaryDailyCost = calculateCosts(state).dailyMessageCost;
  const fallbackDailyCost = recalcWithModel(state, fallbackModel, "primaryModel").dailyMessageCost;

  const blendedDailyCost = primaryDailyCost * (1 - rate) + fallbackDailyCost * rate;

  return {
    fallbackModel,
    fallbackRate: rate,
    fallbackDailyCost,
    blendedDailyCost,
    blendedMonthlyCost: blendedDailyCost * 30,
  };
};

export const calculateMultiAgentCosts = (
  state: ExtendedCalculatorState,
): MultiAgentCostMetrics => {
  const enabled = Boolean(state.multiAgentEnabled);
  const numberOfAgents = Math.min(10, Math.max(1, Math.round(state.numberOfAgents ?? 1)));
  const perAgentModel = state.perAgentModel || state.primaryModel;

  const perAgentDailyCost = recalcWithModel(state, perAgentModel, "primaryModel").dailyMessageCost;
  const perAgentMonthlyCost = perAgentDailyCost * 30;

  const totalAgentsDailyCost = enabled ? perAgentDailyCost * numberOfAgents : 0;
  const totalAgentsMonthlyCost = totalAgentsDailyCost * 30;

  return {
    enabled,
    numberOfAgents,
    perAgentModel,
    perAgentDailyCost,
    perAgentMonthlyCost,
    totalAgentsDailyCost,
    totalAgentsMonthlyCost,
    showWarning: totalAgentsMonthlyCost > 50,
  };
};

export const getCostReductionTips = (
  state: ExtendedCalculatorState,
  metrics: CostMetrics,
): CostTip[] => {
  if (metrics.dangerLevel === "safe") {
    return [];
  }

  const tips: CostTip[] = [];

  if (
    state.heartbeatInterval > 0 &&
    metrics.dailyHeartbeatCost > metrics.dailyMessageCost * 0.3
  ) {
    const savingsIfHaiku =
      metrics.dailyHeartbeatCost -
      recalcWithModel(state, "anthropic/claude-haiku-4-5", "heartbeatModel").dailyHeartbeatCost;

    if (savingsIfHaiku > 0) {
      tips.push({
        id: "hb-model",
        icon: "⚡",
        title: "Your heartbeats are using an expensive model",
        detail: `Switching heartbeat model to Haiku saves ~${formatCurrency(
          savingsIfHaiku * 30,
        )}/month.`,
        saving: savingsIfHaiku * 30,
        action: {
          label: "Switch to Haiku",
          field: "heartbeatModel",
          value: "anthropic/claude-haiku-4-5",
        },
      });
    }
  }

  if (state.heartbeatInterval > 0 && state.heartbeatInterval <= 10) {
    const savingsAt30 =
      metrics.dailyHeartbeatCost - recalcWithInterval(state, 30).dailyHeartbeatCost;

    if (savingsAt30 > 0) {
      tips.push({
        id: "hb-interval",
        icon: "🕐",
        title: "Heartbeats every 10 min or less adds up fast",
        detail: `Increasing interval to 30 min saves ~${formatCurrency(
          savingsAt30 * 30,
        )}/month.`,
        saving: savingsAt30 * 30,
        action: {
          label: "Set to 30 min",
          field: "heartbeatInterval",
          value: 30,
        },
      });
    }
  }

  if (state.thinkingMode === "high") {
    const savingsIfLow =
      metrics.dailyMessageCost - recalcWithThinking(state, "low").dailyMessageCost;

    if (savingsIfLow > 0) {
      tips.push({
        id: "thinking-mode",
        icon: "🧠",
        title: "High thinking mode triples your output tokens",
        detail: `Switching to Low thinking saves ~${formatCurrency(
          savingsIfLow * 30,
        )}/month with minimal quality loss.`,
        saving: savingsIfLow * 30,
        action: {
          label: "Switch to Low",
          field: "thinkingMode",
          value: "low",
        },
      });
    }
  }

  if (state.primaryModel === "anthropic/claude-opus-4-6") {
    const savingsIfSonnet =
      metrics.dailyMessageCost -
      recalcWithModel(state, "anthropic/claude-sonnet-4-6", "primaryModel").dailyMessageCost;

    if (savingsIfSonnet > 0) {
      tips.push({
        id: "primary-model",
        icon: "💡",
        title: "Opus is significantly more expensive than Sonnet",
        detail: `Switching to Sonnet can save ~${formatCurrency(
          savingsIfSonnet * 30,
        )}/month for most workflows.`,
        saving: savingsIfSonnet * 30,
        action: {
          label: "Try Sonnet instead",
          field: "primaryModel",
          value: "anthropic/claude-sonnet-4-6",
        },
      });
    }
  }

  if (state.messagesPerDay > 150) {
    tips.push({
      id: "message-volume",
      icon: "📦",
      title: "High message volume - consider batching",
      detail:
        "Combining short follow-up messages into fewer, longer ones can cut daily message count by 30-50%.",
      saving: 0,
      action: null,
    });
  }

  return tips.sort((a, b) => b.saving - a.saving).slice(0, 4);
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);
};

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(value);
};

export const clampNumber = (value: number, min = 0): number => {
  if (Number.isNaN(value)) {
    return min;
  }

  return Math.max(value, min);
};