"use client";

import { MODEL_OPTIONS } from "@/data/pricing";
import type { CalculatorState, ThinkingMode } from "@/types/calculator";
import { clampNumber } from "@/utils/calculate";

interface ModelSectionProps {
  state: CalculatorState;
  onChange: (next: Partial<CalculatorState>) => void;
}

const THINKING_OPTIONS: ThinkingMode[] = ["off", "low", "high"];

export function ModelSection({ state, onChange }: ModelSectionProps) {
  return (
    <section className="rounded-brand border bg-secondary/55 p-6">
      <h2 className="text-2xl font-bold">1. Model Cost Estimator</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Estimate message spend by model, usage volume, and thinking intensity.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Primary model</span>
          <select
            value={state.primaryModel}
            onChange={(event) => onChange({ primaryModel: event.target.value })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          >
            {MODEL_OPTIONS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Fallback model (optional)</span>
          <select
            value={state.fallbackModel}
            onChange={(event) => onChange({ fallbackModel: event.target.value })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          >
            {MODEL_OPTIONS.map((model) => (
              <option key={model.id} value={model.id}>
                {model.label}
              </option>
            ))}
          </select>
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

