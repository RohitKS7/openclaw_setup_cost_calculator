"use client";

import { motion } from "framer-motion";

import { AnimatedCurrency } from "@/components/calculator/AnimatedCurrency";
import { TipsPanel } from "@/components/calculator/TipsPanel";
import type { CostTip, DangerLevel } from "@/types/calculator";
import { formatCurrency } from "@/utils/calculate";

interface SummaryCardProps {
  totalDailyCost: number;
  totalMonthlyCost: number;
  messageCost: number;
  heartbeatCost: number;
  costPerThousandMessages: number;
  breakdown: {
    messages: number;
    heartbeats: number;
    background: number;
  };
  dangerLevel: DangerLevel;
  tips: CostTip[];
  savedMonthlyDiff: number | null;
  onApplyTip: (tip: CostTip) => void;
}

const DANGER_LABELS: Record<DangerLevel, string> = {
  safe: "Safe",
  moderate: "Moderate",
  high: "High Risk",
  critical: "Critical",
};

const DANGER_STYLES: Record<DangerLevel, string> = {
  safe: "bg-primary/15 text-foreground",
  moderate: "bg-secondary text-foreground",
  high: "bg-accent/20 text-foreground",
  critical: "bg-destructive/20 text-foreground",
};

export function SummaryCard({
  totalDailyCost,
  totalMonthlyCost,
  messageCost,
  heartbeatCost,
  costPerThousandMessages,
  breakdown,
  dangerLevel,
  tips,
  savedMonthlyDiff,
  onApplyTip,
}: SummaryCardProps) {
  return (
    <section className="rounded-brand border bg-background p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">3. Total Cost Summary</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Combined estimate across message traffic, heartbeats, and background tasks.
          </p>
        </div>

        <motion.span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${DANGER_STYLES[dangerLevel]}`}
          animate={dangerLevel === "critical" ? { x: [0, -4, 4, -4, 4, 0] } : { x: 0 }}
          transition={{ duration: 0.45 }}
        >
          {DANGER_LABELS[dangerLevel]}
        </motion.span>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <div className="rounded-brand border border-primary/20 bg-secondary/40 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Total / day</p>
          <AnimatedCurrency value={totalDailyCost} className="mt-2 block text-2xl font-bold" />
        </div>
        <div className="rounded-brand border border-primary/20 bg-secondary/40 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Total / month</p>
          <AnimatedCurrency value={totalMonthlyCost} className="mt-2 block text-2xl font-bold" />
        </div>
        <div className="rounded-brand border border-primary/20 bg-secondary/40 p-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Cost / 1000 messages</p>
          <p className="mt-2 text-2xl font-bold">{formatCurrency(costPerThousandMessages)}</p>
        </div>
      </div>

      <div className="mt-6">
        <div className="h-3 overflow-hidden rounded-full border border-primary/20 bg-muted">
          <div className="flex h-full">
            <div className="bg-primary" style={{ width: `${breakdown.messages * 100}%` }} />
            <div className="bg-accent" style={{ width: `${breakdown.heartbeats * 100}%` }} />
            <div className="bg-muted-foreground" style={{ width: `${breakdown.background * 100}%` }} />
          </div>
        </div>
        <div className="mt-3 grid gap-2 text-sm text-muted-foreground md:grid-cols-3">
          <p>Messages: {formatCurrency(messageCost)}</p>
          <p>Heartbeats: {formatCurrency(heartbeatCost)}</p>
          <p>Background tasks: {formatCurrency(totalDailyCost - messageCost - heartbeatCost)}</p>
        </div>
      </div>

      <TipsPanel tips={tips} savedMonthlyDiff={savedMonthlyDiff} onApplyTip={onApplyTip} />
    </section>
  );
}