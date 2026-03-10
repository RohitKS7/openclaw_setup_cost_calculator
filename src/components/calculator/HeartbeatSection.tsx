"use client";

import { HEARTBEAT_INTERVAL_OPTIONS } from "@/data/defaults";
import { MODEL_OPTIONS } from "@/data/pricing";
import type { CalculatorState } from "@/types/calculator";
import { clampNumber, formatCurrency, formatNumber } from "@/utils/calculate";

interface HeartbeatSectionProps {
  state: CalculatorState;
  heartbeatsPerDay: number;
  dailyHeartbeatTokens: number;
  dailyHeartbeatCost: number;
  monthlyHeartbeatCost: number;
  showWarning: boolean;
  warningPercent: number;
  onChange: (next: Partial<CalculatorState>) => void;
}

export function HeartbeatSection({
  state,
  heartbeatsPerDay,
  dailyHeartbeatTokens,
  dailyHeartbeatCost,
  monthlyHeartbeatCost,
  showWarning,
  warningPercent,
  onChange,
}: HeartbeatSectionProps) {
  return (
    <section className="rounded-brand border bg-secondary/55 p-6">
      <h2 className="text-2xl font-bold">2. Heartbeat Budget Calculator</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Heartbeats can silently dominate cost. Keep this budget visible.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Heartbeat interval (minutes)</span>
          <select
            value={state.heartbeatInterval}
            onChange={(event) => onChange({ heartbeatInterval: Number(event.target.value) })}
            className="w-full rounded-brand border bg-background px-3 py-2"
          >
            {HEARTBEAT_INTERVAL_OPTIONS.map((value) => (
              <option key={value} value={value}>
                {value === 0 ? "Off" : value}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Heartbeat model</span>
          <select
            value={state.heartbeatModel}
            onChange={(event) => onChange({ heartbeatModel: event.target.value })}
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
          <span className="mb-2 block font-semibold text-foreground">Heartbeat prompt tokens</span>
          <input
            type="number"
            min={0}
            value={state.heartbeatPromptTokens}
            onChange={(event) =>
              onChange({ heartbeatPromptTokens: clampNumber(Number(event.target.value)) })
            }
            className="w-full rounded-brand border bg-background px-3 py-2"
          />
        </label>

        <label className="text-sm">
          <span className="mb-2 block font-semibold text-foreground">Heartbeat response tokens</span>
          <input
            type="number"
            min={0}
            value={state.heartbeatResponseTokens}
            onChange={(event) =>
              onChange({ heartbeatResponseTokens: clampNumber(Number(event.target.value)) })
            }
            className="w-full rounded-brand border bg-background px-3 py-2"
          />
        </label>
      </div>

      <div className="mt-6 grid gap-3 rounded-brand border border-primary/20 bg-background/70 p-4 text-sm text-muted-foreground md:grid-cols-2">
        <p>Heartbeats/day: <strong className="text-foreground">{formatNumber(heartbeatsPerDay)}</strong></p>
        <p>Heartbeat tokens/day: <strong className="text-foreground">{formatNumber(dailyHeartbeatTokens)}</strong></p>
        <p>Cost/day: <strong className="text-foreground">{formatCurrency(dailyHeartbeatCost)}</strong></p>
        <p>Cost/month: <strong className="text-foreground">{formatCurrency(monthlyHeartbeatCost)}</strong></p>
      </div>

      {showWarning ? (
        <div className="mt-4 rounded-brand border border-accent/40 bg-accent/10 p-3 text-sm font-semibold text-foreground">
          Warning: Heartbeats account for {(warningPercent * 100).toFixed(1)}% of total daily spend.
        </div>
      ) : null}
    </section>
  );
}

