import { DEFAULT_CALCULATOR_STATE } from "@/data/defaults";
import type { CalculatorState, ThinkingMode } from "@/types/calculator";

const toPositiveNumber = (value: string | null, fallback: number): number => {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  if (Number.isNaN(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
};

export const decodeStateFromParams = (params: URLSearchParams): CalculatorState => {
  const thinking = params.get("thinking") as ThinkingMode | null;

  return {
    ...DEFAULT_CALCULATOR_STATE,
    primaryModel: params.get("model") ?? DEFAULT_CALCULATOR_STATE.primaryModel,
    fallbackModel: params.get("fallback") ?? DEFAULT_CALCULATOR_STATE.fallbackModel,
    messagesPerDay: toPositiveNumber(params.get("msg"), DEFAULT_CALCULATOR_STATE.messagesPerDay),
    avgInputTokens: toPositiveNumber(params.get("input"), DEFAULT_CALCULATOR_STATE.avgInputTokens),
    avgOutputTokens: toPositiveNumber(params.get("output"), DEFAULT_CALCULATOR_STATE.avgOutputTokens),
    thinkingMode:
      thinking === "off" || thinking === "low" || thinking === "high"
        ? thinking
        : DEFAULT_CALCULATOR_STATE.thinkingMode,
    heartbeatInterval: toPositiveNumber(
      params.get("hb_interval"),
      DEFAULT_CALCULATOR_STATE.heartbeatInterval,
    ),
    heartbeatModel: params.get("hb_model") ?? DEFAULT_CALCULATOR_STATE.heartbeatModel,
    heartbeatPromptTokens: toPositiveNumber(
      params.get("hb_prompt"),
      DEFAULT_CALCULATOR_STATE.heartbeatPromptTokens,
    ),
    heartbeatResponseTokens: toPositiveNumber(
      params.get("hb_response"),
      DEFAULT_CALCULATOR_STATE.heartbeatResponseTokens,
    ),
    backgroundTaskCostPerDay: toPositiveNumber(
      params.get("bg_daily"),
      DEFAULT_CALCULATOR_STATE.backgroundTaskCostPerDay,
    ),
  };
};

export const encodeStateToParams = (state: CalculatorState): URLSearchParams => {
  const params = new URLSearchParams();

  params.set("model", state.primaryModel);
  params.set("fallback", state.fallbackModel);
  params.set("msg", String(state.messagesPerDay));
  params.set("input", String(state.avgInputTokens));
  params.set("output", String(state.avgOutputTokens));
  params.set("thinking", state.thinkingMode);
  params.set("hb_interval", String(state.heartbeatInterval));
  params.set("hb_model", state.heartbeatModel);
  params.set("hb_prompt", String(state.heartbeatPromptTokens));
  params.set("hb_response", String(state.heartbeatResponseTokens));
  params.set("bg_daily", String(state.backgroundTaskCostPerDay));

  return params;
};

