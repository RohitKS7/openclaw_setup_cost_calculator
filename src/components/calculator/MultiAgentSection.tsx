"use client";

import { MODEL_GROUPS } from "@/data/pricing";
import {
  type ExtendedCalculatorState,
  formatCurrency,
  getModelBehavior,
  type MultiAgentCostMetrics,
} from "@/utils/calculate";

interface MultiAgentSectionProps {
  state: ExtendedCalculatorState;
  metrics: MultiAgentCostMetrics;
  onChange: (next: Partial<ExtendedCalculatorState>) => void;
}

export function MultiAgentSection({ state, metrics, onChange }: MultiAgentSectionProps) {
  const behavior = getModelBehavior(metrics.perAgentModel);

  return (
    <section className="rounded-brand border bg-secondary/55 p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold">5. Multi-Agent Mode</h2>
        <button
          type="button"
          onClick={() => onChange({ multiAgentEnabled: !metrics.enabled })}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            metrics.enabled
              ? "bg-primary text-primary-foreground"
              : "border border-primary/30 text-foreground"
          }`}
        >
          {metrics.enabled ? "Disable Multi-Agent Mode" : "Enable Multi-Agent Mode"}
        </button>
      </div>

      {metrics.enabled ? (
        <div className="mt-5 space-y-5">
          <label className="block text-sm">
            <span className="mb-2 block font-semibold text-foreground">
              Number of agents: {metrics.numberOfAgents}
            </span>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={metrics.numberOfAgents}
              onChange={(event) => onChange({ numberOfAgents: Number(event.target.value) })}
              className="w-full accent-accent"
            />
          </label>

          <label className="block text-sm">
            <span className="mb-2 block font-semibold text-foreground">Per-agent model selector</span>
            <select
              value={metrics.perAgentModel}
              onChange={(event) => onChange({ perAgentModel: event.target.value })}
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

          <div className="rounded-brand border border-primary/20 bg-background/70 p-4 text-sm text-muted-foreground">
            {behavior.freeTier ? (
              <p className="font-semibold text-foreground">Free tier - monitor rate limits instead of cost.</p>
            ) : null}
            {behavior.localCompute ? (
              <p className="font-semibold text-foreground">Running locally - no API cost.</p>
            ) : null}

            {!behavior.freeTier && !behavior.localCompute ? (
              <>
                <p>Per-agent/day: <span className="font-semibold text-foreground">{formatCurrency(metrics.perAgentDailyCost)}</span></p>
                <p>Per-agent/month: <span className="font-semibold text-foreground">{formatCurrency(metrics.perAgentMonthlyCost)}</span></p>
                <p>Total/day: <span className="font-semibold text-foreground">{formatCurrency(metrics.totalAgentsDailyCost)}</span></p>
                <p>Total/month: <span className="font-semibold text-foreground">{formatCurrency(metrics.totalAgentsMonthlyCost)}</span></p>
              </>
            ) : null}
          </div>

          {metrics.showWarning ? (
            <div className="rounded-brand border border-accent/40 bg-accent/10 p-3 text-sm font-semibold text-foreground">
              Warning: Multi-agent monthly cost exceeds {formatCurrency(50)}.
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}