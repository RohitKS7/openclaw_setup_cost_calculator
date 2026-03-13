"use client";

import { useEffect, useRef, useState } from "react";

import { MODEL_GROUPS } from "@/data/pricing";
import { type ExtendedCalculatorState, formatCurrency, getModelBehavior, type FallbackCostMetrics } from "@/utils/calculate";

interface FallbackSectionProps {
  state: ExtendedCalculatorState;
  metrics: FallbackCostMetrics;
  onChange: (next: Partial<ExtendedCalculatorState>) => void;
}

const SUGGESTION_PAIRS = [
  { primary: "anthropic/claude-opus-4-6", fallback: "minimax/minimax-m2.5" },
  { primary: "anthropic/claude-sonnet-4-6", fallback: "moonshot/kimi-k2.5" },
  { primary: "openai-codex/gpt-5.3-codex", fallback: "anthropic/claude-haiku-4-5" },
  { primary: "openai/gpt-5.2", fallback: "deepseek/deepseek-v3.2" },
  { primary: "zai/glm-4.7", fallback: "anthropic/claude-haiku-4-5" },
];

export function FallbackSection({ state, metrics, onChange }: FallbackSectionProps) {
  const [isExpanded, setIsExpanded] = useState((state.fallbackTriggerRate ?? 0) > 0);
  const previousTriggerRate = useRef(state.fallbackTriggerRate ?? 0);
  const behavior = getModelBehavior(state.fallbackModel);

  useEffect(() => {
    const currentRate = state.fallbackTriggerRate ?? 0;
    const previousRate = previousTriggerRate.current;

    if (currentRate > 0 && previousRate <= 0) {
      setIsExpanded(true);
    }

    previousTriggerRate.current = currentRate;
  }, [state.fallbackTriggerRate]);

  return (
    <section className="rounded-brand border bg-secondary/55 p-6">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls="fallback-model-cost-content"
        onClick={() => setIsExpanded((current) => !current)}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <div>
          <h2 className="text-2xl font-bold">4. Fallback Model Cost</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Model secondary-path usage and blended daily/monthly spend.
          </p>
        </div>
        <span
          className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/25 text-xl leading-none transition-transform duration-200 ${
            isExpanded ? "rotate-180" : "rotate-0"
          }`}
          aria-hidden="true"
        >
          &#9662;
        </span>
      </button>

      {!isExpanded ? (
        <p className="mt-4 text-sm text-muted-foreground">
          Expand to tune fallback trigger rate and see the blended cost impact.
        </p>
      ) : null}

      {isExpanded ? (
        <div id="fallback-model-cost-content">
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-2 block font-semibold text-foreground">Fallback model selector</span>
              <select
                value={state.fallbackModel}
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
            </label>

            <label className="text-sm md:col-span-2">
              <span className="mb-2 block font-semibold text-foreground">
                % of sessions that fall back to secondary model: {state.fallbackTriggerRate ?? 0}%
              </span>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={state.fallbackTriggerRate ?? 0}
                onChange={(event) => onChange({ fallbackTriggerRate: Number(event.target.value) })}
                className="w-full accent-accent"
              />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {SUGGESTION_PAIRS.map((pair) => (
              <button
                key={`${pair.primary}-${pair.fallback}`}
                type="button"
                onClick={() => onChange({ primaryModel: pair.primary, fallbackModel: pair.fallback })}
                className="rounded-full border border-primary/30 px-3 py-2 text-xs font-semibold text-foreground"
              >
                {pair.primary} -&gt; {pair.fallback}
              </button>
            ))}
          </div>

          <div className="mt-5 rounded-brand border border-primary/20 bg-background/70 p-4 text-sm">
            {behavior.freeTier ? (
              <p className="font-semibold text-foreground">Free tier - monitor rate limits instead of cost.</p>
            ) : null}
            {behavior.localCompute ? (
              <p className="font-semibold text-foreground">Running locally - no API cost.</p>
            ) : null}

            {!behavior.freeTier && !behavior.localCompute ? (
              <>
                <p className="text-muted-foreground">Blended/day: <span className="font-semibold text-foreground">{formatCurrency(metrics.blendedDailyCost)}</span></p>
                <p className="text-muted-foreground">Blended/month: <span className="font-semibold text-foreground">{formatCurrency(metrics.blendedMonthlyCost)}</span></p>
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
