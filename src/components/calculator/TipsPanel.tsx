"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { SOCIAL_LINKS } from "@/data/ecosystem";
import type { CostTip } from "@/types/calculator";

interface TipsPanelProps {
  tips: CostTip[];
  savedMonthlyDiff: number | null;
  onApplyTip: (tip: CostTip) => void;
}

export function TipsPanel({ tips, savedMonthlyDiff, onApplyTip }: TipsPanelProps) {
  return (
    <div className="mt-6 space-y-5 rounded-brand border bg-secondary/70 p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xl font-bold">Ways to reduce your cost</h3>
        {savedMonthlyDiff && savedMonthlyDiff > 0 ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
            Saved ~${savedMonthlyDiff.toFixed(2)}/month
          </span>
        ) : null}
      </div>

      {tips.length > 0 ? (
        <div className="space-y-3">
          {tips.map((tip, index) => (
            <motion.article
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="rounded-brand border bg-background/80 p-4"
            >
              <p className="text-base font-semibold">
                <span className="mr-2" aria-hidden="true">
                  {tip.icon}
                </span>
                {tip.title}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{tip.detail}</p>
              {tip.saving > 0 ? (
                <p className="mt-2 text-sm font-semibold text-accent">
                  Potential monthly saving: ~${tip.saving.toFixed(2)}
                </p>
              ) : null}
              {tip.action ? (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={() => onApplyTip(tip)}
                    className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
                  >
                    {tip.action.label}
                  </button>
                </div>
              ) : null}
            </motion.article>
          ))}
        </div>
      ) : null}

      <div className="rounded-brand border bg-background/80 p-5">
        <p className="text-base font-semibold">You’re likely overpaying right now. Find a cheaper setup in seconds:</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The GuardClaw Model Picker recommends a full primary + fallback stack based on your use case.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Link
            href="https://guardclaw.dev/picker"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
          >
            Find my optimal setup -&gt;
          </Link>
          {/* <Link href={SOCIAL_LINKS.twitter} target="_blank" className="text-xs text-muted-foreground underline">
            Coming soon - get notified
          </Link> */}
        </div>
      </div>
    </div>
  );
}