import type { CalculatorState } from "@/types/calculator";

export const DEFAULT_CALCULATOR_STATE: CalculatorState = {
  primaryModel: "claude-sonnet-4-5",
  fallbackModel: "claude-haiku-4-5",
  messagesPerDay: 50,
  avgInputTokens: 800,
  avgOutputTokens: 1200,
  thinkingMode: "off",
  heartbeatInterval: 30,
  heartbeatModel: "claude-haiku-4-5",
  heartbeatPromptTokens: 50,
  heartbeatResponseTokens: 100,
  backgroundTaskCostPerDay: 0,
};

export const HEARTBEAT_INTERVAL_OPTIONS = [0, 5, 10, 15, 30, 60];

