import { MODEL_PRICING } from "@/data/pricing";
import type {
  CalculatorState,
  CostMetrics,
  CostTip,
  DangerLevel,
  ThinkingMode,
} from "@/types/calculator";

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

export const calculateCosts = (state: CalculatorState): CostMetrics => {
  const primary = MODEL_PRICING[state.primaryModel];
  const heartbeatModel = MODEL_PRICING[state.heartbeatModel];

  const dailyInputTokens = state.messagesPerDay * state.avgInputTokens;
  const dailyOutputTokens = state.messagesPerDay * state.avgOutputTokens;
  const adjustedOutputTokens = dailyOutputTokens * THINKING_MULTIPLIER[state.thinkingMode];

  const dailyMessageCost =
    (dailyInputTokens / 1_000_000) * primary.input +
    (adjustedOutputTokens / 1_000_000) * primary.output;
  const monthlyMessageCost = dailyMessageCost * 30;

  const heartbeatsPerDay = state.heartbeatInterval > 0 ? 1440 / state.heartbeatInterval : 0;
  const dailyHeartbeatInputTokens = heartbeatsPerDay * state.heartbeatPromptTokens;
  const dailyHeartbeatOutputTokens = heartbeatsPerDay * state.heartbeatResponseTokens;

  const dailyHeartbeatCost =
    (dailyHeartbeatInputTokens / 1_000_000) * heartbeatModel.input +
    (dailyHeartbeatOutputTokens / 1_000_000) * heartbeatModel.output;
  const monthlyHeartbeatCost = dailyHeartbeatCost * 30;

  const totalDailyCost = dailyMessageCost + dailyHeartbeatCost + state.backgroundTaskCostPerDay;
  const totalMonthlyCost = totalDailyCost * 30;
  const heartbeatPctOfTotal = totalDailyCost > 0 ? dailyHeartbeatCost / totalDailyCost : 0;

  const costPerThousandMessages =
    state.messagesPerDay > 0 ? (dailyMessageCost / state.messagesPerDay) * 1000 : 0;

  const breakdown = {
    messages: totalDailyCost > 0 ? dailyMessageCost / totalDailyCost : 0,
    heartbeats: totalDailyCost > 0 ? dailyHeartbeatCost / totalDailyCost : 0,
    background: totalDailyCost > 0 ? state.backgroundTaskCostPerDay / totalDailyCost : 0,
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
  state: CalculatorState,
  model: string,
  field: "primaryModel" | "heartbeatModel" = "primaryModel",
): CostMetrics => {
  return calculateCosts({ ...state, [field]: model });
};

export const recalcWithInterval = (state: CalculatorState, interval: number): CostMetrics => {
  return calculateCosts({ ...state, heartbeatInterval: interval });
};

export const recalcWithThinking = (
  state: CalculatorState,
  mode: ThinkingMode,
): CostMetrics => {
  return calculateCosts({ ...state, thinkingMode: mode });
};

export const getCostReductionTips = (
  state: CalculatorState,
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
      recalcWithModel(state, "claude-haiku-4-5", "heartbeatModel").dailyHeartbeatCost;

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
          value: "claude-haiku-4-5",
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

  if (state.primaryModel === "claude-opus-4-5") {
    const savingsIfSonnet =
      metrics.dailyMessageCost -
      recalcWithModel(state, "claude-sonnet-4-5", "primaryModel").dailyMessageCost;

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
          value: "claude-sonnet-4-5",
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