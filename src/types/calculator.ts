export type ThinkingMode = "off" | "low" | "high";

export interface CalculatorState {
  primaryModel: string;
  fallbackModel: string;
  messagesPerDay: number;
  avgInputTokens: number;
  avgOutputTokens: number;
  thinkingMode: ThinkingMode;
  heartbeatInterval: number;
  heartbeatModel: string;
  heartbeatPromptTokens: number;
  heartbeatResponseTokens: number;
  backgroundTaskCostPerDay: number;
}

export type DangerLevel = "safe" | "moderate" | "high" | "critical";
export type TipActionField =
  | "primaryModel"
  | "heartbeatModel"
  | "heartbeatInterval"
  | "thinkingMode";

export interface CostTipAction {
  label: string;
  field: TipActionField;
  value: string | number;
}

export interface CostTip {
  id: string;
  icon: string;
  title: string;
  detail: string;
  saving: number;
  action: CostTipAction | null;
}

export interface CostMetrics {
  dailyMessageCost: number;
  monthlyMessageCost: number;
  costPerThousandMessages: number;
  heartbeatsPerDay: number;
  dailyHeartbeatCost: number;
  monthlyHeartbeatCost: number;
  dailyHeartbeatTokens: number;
  heartbeatPctOfTotal: number;
  showHeartbeatWarning: boolean;
  totalDailyCost: number;
  totalMonthlyCost: number;
  dangerLevel: DangerLevel;
  breakdown: {
    messages: number;
    heartbeats: number;
    background: number;
  };
}

