export interface ModelPrice {
  provider: string;
  input?: number;
  output?: number;
  free?: boolean;
  rateLimitOnly?: boolean;
  localCompute?: boolean;
}

export interface ModelGroup {
  label: string;
  models: Array<{
    id: string;
    price: ModelPrice;
  }>;
}

export const PRICING_LAST_UPDATED = "2026-03-11";

export const MODEL_GROUPS: ModelGroup[] = [
  {
    label: "Anthropic",
    models: [
      { id: "anthropic/claude-opus-4-6", price: { provider: "Anthropic", input: 5, output: 25 } },
      { id: "anthropic/claude-sonnet-4-6", price: { provider: "Anthropic", input: 3, output: 15 } },
      { id: "anthropic/claude-opus-4-5", price: { provider: "Anthropic", input: 5, output: 25 } },
      { id: "anthropic/claude-sonnet-4-5", price: { provider: "Anthropic", input: 3, output: 15 } },
      { id: "anthropic/claude-haiku-4-5", price: { provider: "Anthropic", input: 1, output: 5 } },
    ],
  },
  {
    label: "OpenAI",
    models: [
      { id: "openai/gpt-5.4", price: { provider: "OpenAI", input: 2.5, output: 15 } },
      { id: "openai/gpt-5.2", price: { provider: "OpenAI", input: 1.75, output: 14 } },
      { id: "openai/gpt-5", price: { provider: "OpenAI", input: 1.25, output: 10 } },
      { id: "openai/gpt-5-mini", price: { provider: "OpenAI", input: 0.25, output: 2 } },
      { id: "openai/gpt-4.1", price: { provider: "OpenAI", input: 2, output: 8 } },
      { id: "openai/gpt-4o", price: { provider: "OpenAI", input: 2.5, output: 10 } },
      { id: "openai/gpt-4o-mini", price: { provider: "OpenAI", input: 0.15, output: 0.6 } },
    ],
  },
  {
    label: "OpenAI Codex OAuth - FREE TIER",
    models: [
      { id: "openai-codex/gpt-5.3-codex", price: { provider: "OpenAI Codex", free: true, rateLimitOnly: true } },
    ],
  },
  {
    label: "Google",
    models: [
      { id: "google/gemini-3-pro-preview", price: { provider: "Google", input: 2, output: 12 } },
      { id: "google/gemini-3-flash-preview", price: { provider: "Google", input: 0.5, output: 3 } },
      { id: "google/gemini-2.5-pro", price: { provider: "Google", input: 1.25, output: 10 } },
      { id: "google/gemini-2.5-flash", price: { provider: "Google", input: 0.3, output: 2.5 } },
      { id: "google/gemini-2.0-flash", price: { provider: "Google", input: 0.1, output: 0.4 } },
    ],
  },
  {
    label: "Google Free Tier - FREE TIER",
    models: [
      { id: "google-antigravity/*", price: { provider: "Google", free: true, rateLimitOnly: true } },
      { id: "google-gemini-cli/*", price: { provider: "Google", free: true, rateLimitOnly: true } },
    ],
  },
  {
    label: "Moonshot / Kimi",
    models: [
      { id: "moonshot/kimi-k2.5", price: { provider: "Moonshot", input: 0.6, output: 2.5 } },
      { id: "moonshot/kimi-k2-turbo-preview", price: { provider: "Moonshot", input: 1.15, output: 8 } },
      { id: "moonshot/kimi-k2-thinking", price: { provider: "Moonshot", input: 0.6, output: 2.5 } },
      { id: "kimi-coding/k2p5", price: { provider: "Kimi Coding", input: 0.6, output: 2.5 } },
    ],
  },
  {
    label: "MiniMax",
    models: [
      { id: "minimax/minimax-m2.5", price: { provider: "MiniMax", input: 0.2, output: 1.1 } },
      { id: "minimax/minimax-m2.1", price: { provider: "MiniMax", input: 0.2, output: 1.1 } },
    ],
  },
  {
    label: "Z.AI / GLM",
    models: [{ id: "zai/glm-4.7", price: { provider: "Z.AI", input: 0.3, output: 0.9 } }],
  },
  {
    label: "DeepSeek",
    models: [
      { id: "deepseek/deepseek-v3.2", price: { provider: "DeepSeek", input: 0.28, output: 0.42 } },
      { id: "deepseek/deepseek-r1", price: { provider: "DeepSeek", input: 0.55, output: 2.19 } },
    ],
  },
  {
    label: "xAI",
    models: [
      { id: "xai/grok-4.1-fast", price: { provider: "xAI", input: 0.2, output: 0.5 } },
      { id: "xai/grok-4", price: { provider: "xAI", input: 3, output: 15 } },
    ],
  },
  {
    label: "Mistral",
    models: [
      { id: "mistral/mistral-large-latest", price: { provider: "Mistral", input: 2, output: 6 } },
      { id: "mistral/mistral-nemo", price: { provider: "Mistral", input: 0.02, output: 0.06 } },
    ],
  },
  {
    label: "Volcano Engine",
    models: [
      { id: "volcengine/doubao-seed-1-8-251228", price: { provider: "Volcano Engine", input: 0.3, output: 0.9 } },
      { id: "volcengine/kimi-k2-5-260127", price: { provider: "Volcano Engine", input: 0.6, output: 2.5 } },
      { id: "volcengine/glm-4-7-251222", price: { provider: "Volcano Engine", input: 0.3, output: 0.9 } },
      { id: "volcengine/deepseek-v3-2-251201", price: { provider: "Volcano Engine", input: 0.28, output: 0.42 } },
    ],
  },
  {
    label: "Free Tier",
    models: [
      { id: "qwen-portal/coder-model", price: { provider: "Qwen", free: true, rateLimitOnly: true } },
      { id: "qwen-portal/vision-model", price: { provider: "Qwen", free: true, rateLimitOnly: true } },
      { id: "kilocode/glm-5-free", price: { provider: "KiloCode", free: true, rateLimitOnly: true } },
      { id: "kilocode/minimax-m2.5-free", price: { provider: "KiloCode", free: true, rateLimitOnly: true } },
    ],
  },
  {
    label: "Local",
    models: [
      { id: "ollama/*", price: { provider: "Ollama", input: 0, output: 0, localCompute: true } },
      { id: "vllm/*", price: { provider: "vLLM", input: 0, output: 0, localCompute: true } },
    ],
  },
];

export const MODEL_PRICING: Record<string, ModelPrice> = MODEL_GROUPS.reduce(
  (acc, group) => {
    group.models.forEach((model) => {
      acc[model.id] = model.price;
    });
    return acc;
  },
  {} as Record<string, ModelPrice>,
);

export const MODEL_OPTIONS = MODEL_GROUPS.flatMap((group) =>
  group.models.map((model) => ({
    id: model.id,
    label: model.id,
    group: group.label,
    ...model.price,
  })),
);

export const DEFAULT_PRIMARY_MODEL = "anthropic/claude-sonnet-4-6";
export const DEFAULT_HEARTBEAT_MODEL = "anthropic/claude-haiku-4-5";