export type ModelProvider = "Anthropic" | "OpenAI" | "Google";

export interface ModelPrice {
  provider: ModelProvider;
  input: number;
  output: number;
}

export const PRICING_LAST_UPDATED = "2026-03-10";

export const MODEL_PRICING: Record<string, ModelPrice> = {
  "claude-opus-4-5": { provider: "Anthropic", input: 5, output: 25 },
  "claude-sonnet-4-5": { provider: "Anthropic", input: 3, output: 15 },
  "claude-haiku-4-5": { provider: "Anthropic", input: 1, output: 5 },
  "gpt-4.1": { provider: "OpenAI", input: 2, output: 8 },
  "gpt-4o": { provider: "OpenAI", input: 2.5, output: 10 },
  "gpt-4o-mini": { provider: "OpenAI", input: 0.15, output: 0.6 },
  "gemini-2.5-pro": { provider: "Google", input: 1.25, output: 10 },
  "gemini-2.0-flash": { provider: "Google", input: 0.1, output: 0.4 },
};

export const MODEL_OPTIONS = Object.entries(MODEL_PRICING).map(([id, value]) => ({
  id,
  label: `${id} (${value.provider})`,
  ...value,
}));

