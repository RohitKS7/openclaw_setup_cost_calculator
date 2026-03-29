"use client";

import { DEFAULT_HEARTBEAT_MODEL, DEFAULT_PRIMARY_MODEL, MODEL_GROUPS } from "@/data/pricing";
import { Tooltip } from "@/components/shared/Tooltip";
import type { CalculatorState, ThinkingMode } from "@/types/calculator";
import {
  clampNumber,
  type BillingMode,
  type ExtendedCalculatorState,
  type UsagePhase,
  getModelBehavior,
} from "@/utils/calculate";

interface ModelSectionProps {
  state: ExtendedCalculatorState;
  usagePercent: number;
  onChange: (next: Partial<ExtendedCalculatorState>) => void;
}

const THINKING_OPTIONS: ThinkingMode[] = ["off", "low", "high"];
const BILLING_MODE_TOOLTIP =
  "Choose between Subscription (Claude Max/Codex plans) or Pay-per-token (API billing). This determines your actual cost structure.";
const USAGE_PHASE_TOOLTIP =
  "Setup phase means 3x higher usage (testing, trial-and-error). Steady State is production use. Pick what matches your current stage.";
const FALLBACK_MODEL_TOOLTIP =
  "If the primary model fails, this model takes over. Choose based on your task criticality and budget.";

export function ModelSection({ state, usagePercent, onChange }: ModelSectionProps) {
  const billingMode: BillingMode = state.billingMode ?? "payg";
  const usagePhase: UsagePhase = state.usagePhase ?? "steady";
  const modelBehavior = getModelBehavior(state.primaryModel || DEFAULT_PRIMARY_MODEL);

  return (
    <section className="rounded-brand border bg-secondary/55 p-6">
      <h2 className="text-2xl font-bold">1. Model Cost (Your main spend)</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Estimate message spend by model, usage volume, and thinking intensity.
      </p>

      <div className="mt-4 flex items-center gap-2">
        <p className="text-sm font-semibold text-foreground">Billing Mode</p>
        <Tooltip label="Billing Mode" description={BILLING_MODE_TOOLTIP}>
          <span className="text-sm font-semibold text-muted-foreground">?</span>
        </Tooltip>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange({ billingMode: "payg" })}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            billingMode === "payg"
              ? "bg-primary text-primary-foreground"
              : "border border-primary/30 text-foreground"
          }`}
        >
          Pay-per-token API
        </button>
        <button
          type="button"
          onClick={() => onChange({ billingMode: "subscription" })}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            billingMode === "subscription"
              ? "bg-primary text-primary-foreground"
              : "border border-primary/30 text-foreground"
          }`}
        >
          Subscription / OAuth plan
        </button>
      </div>

      {billingMode === "subscription" ? (
        <p className="mt-3 rounded-brand border border-primary/20 bg-background/70 p-3 text-sm text-foreground">
          ~{usagePercent.toFixed(1)}% of your daily rate limit. Dollar output suppressed for this section.
        </p>
      ) : null}

      {modelBehavior.freeTier ? (
        <p className="mt-3 rounded-brand border border-primary/20 bg-background/70 p-3 text-sm text-foreground">
          Free tier - monitor rate limits instead of cost.
        </p>
      ) : null}

      {modelBehavior.localCompute ? (
        <div className="mt-3 rounded-brand border border-primary/20 bg-background/70 p-3">
          <p className="text-sm text-foreground">Running locally - no API cost.</p>
          <label className="mt-3 block text-sm">
            <span className="mb-2 block font-semibold text-foreground">Estimated server cost per hour (optional)</span>
            <input
              type="number"
              min={0}
              step="0.01"
              value={state.localServerCostPerHour ?? 0}
              onChange={(event) =>
                onChange({ localServerCostPerHour: clampNumber(Number(event.target.value)) })
              }
              className="w-full rounded-brand border bg-background px-3 py-2"
            />
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <p className="text-sm font-semibold text-foreground">Usage Phase</p>
        <Tooltip label="Usage Phase" description={USAGE_PHASE_TOOLTIP}>
          <span className="text-sm font-semibold text-muted-foreground">?</span>
        </Tooltip>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange({ usagePhase: "steady" })}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            usagePhase === "steady"
              ? "bg-primary text-primary-foreground"
              : "border border-primary/30 text-foreground"
          }`}
        >
          Steady State
        </button>
        <button
          type="button"
          onClick={() => onChange({ usagePhase: "setup" })}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            usagePhase === "setup"
              ? "bg-primary text-primary-foreground"
              : "border border-primary/30 text-foreground"
          }`}
        >
          Setup / Experimentation
        </button>
      </div>

      {usagePhase === "setup" ? (
        <p className="mt-3 text-sm font-semibold text-accent">
          Includes ~3x buffer for config iteration and test runs.
        </p>
      ) : null}

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Primary model</span>
          <select
            value={state.primaryModel || DEFAULT_PRIMARY_MODEL}
            onChange={(event) => onChange({ primaryModel: event.target.value })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          >
            {MODEL_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.id}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-2 flex items-center gap-2 font-semibold text-foreground">
            Fallback model (optional)
            <Tooltip label="Fallback Model" description={FALLBACK_MODEL_TOOLTIP}>
              <span className="text-sm font-semibold text-muted-foreground">?</span>
            </Tooltip>
          </span>
          <select
            value={state.fallbackModel || DEFAULT_HEARTBEAT_MODEL}
            onChange={(event) => onChange({ fallbackModel: event.target.value })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          >
            {MODEL_GROUPS.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.id}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <p className="mt-2 text-[10px] text-muted-foreground">
            *Need a more accurate fallback estimate? Use Section 4 to set fallback frequency and view blended daily/monthly cost.
          </p>
        </label>

        <label className="text-sm md:col-span-2">
          <span className="mb-2 block font-semibold text-foreground">Average messages per day: {state.messagesPerDay}</span>
          <input
            type="range"
            min={0}
            max={500}
            step={1}
            value={state.messagesPerDay}
            onChange={(event) => onChange({ messagesPerDay: clampNumber(Number(event.target.value)) })}
            className="w-full accent-accent"
          />
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Estimated input tokens/message</span>
          <input
            type="number"
            min={0}
            value={state.avgInputTokens}
            onChange={(event) => onChange({ avgInputTokens: clampNumber(Number(event.target.value)) })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Estimated output tokens/message</span>
          <input
            type="number"
            min={0}
            value={state.avgOutputTokens}
            onChange={(event) => onChange({ avgOutputTokens: clampNumber(Number(event.target.value)) })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          />
        </label>
      </div>

      <div className="mt-5">
        <p className="text-sm font-semibold text-foreground">Thinking mode</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {THINKING_OPTIONS.map((option) => {
            const active = state.thinkingMode === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange({ thinkingMode: option })}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "border border-primary/30 text-foreground hover:bg-primary/10"
                }`}
              >
                {option.toUpperCase()}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
