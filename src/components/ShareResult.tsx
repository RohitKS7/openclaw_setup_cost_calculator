"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";

import { formatCurrency } from "@/utils/calculate";

interface ShareResultProps {
  primaryModel: string;
  heartbeatInterval: number;
  avgInputTokens: number;
  estimatedMonthlyCost: number;
}

interface ShareTextInput {
  monthlyCost: number;
  model: string;
  heartbeatInterval: number;
  contextTokens: number;
}

const toTitleCase = (value: string): string => {
  const normalized = value.toLowerCase();

  if (normalized === "gpt") {
    return "GPT";
  }

  if (normalized === "vllm") {
    return "vLLM";
  }

  if (normalized === "ai") {
    return "AI";
  }

  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

const formatModelLabel = (modelId: string): string => {
  const raw = modelId.split("/").pop() ?? modelId;
  const tokens = raw
    .split("-")
    .filter((token) => token.length > 0 && !/^\d+(\.\d+)?$/.test(token))
    .map((token) => toTitleCase(token));

  return tokens.join(" ");
};

const formatContextTokens = (tokens: number): string => {
  if (tokens >= 1000) {
    const asK = tokens / 1000;
    const rounded = Number.isInteger(asK) ? asK.toString() : asK.toFixed(1);
    return `${rounded}k`;
  }

  return tokens.toString();
};

export const generateShareResultText = ({
  monthlyCost,
  model,
  heartbeatInterval,
  contextTokens,
}: ShareTextInput): string => {
  return [
    `My OpenClaw setup costs about ${formatCurrency(monthlyCost)}/month.`,
    "",
    `Model: ${model}`,
    `Heartbeat: ${heartbeatInterval} min`,
    `Context: ${formatContextTokens(contextTokens)}`,
    "",
    "Check yours -> GuardClaw Token Cost Calculator",
  ].join("\n");
};

export function ShareResult({
  primaryModel,
  heartbeatInterval,
  avgInputTokens,
  estimatedMonthlyCost,
}: ShareResultProps) {
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const modelLabel = useMemo(() => formatModelLabel(primaryModel), [primaryModel]);
  const shareText = useMemo(
    () =>
      generateShareResultText({
        monthlyCost: estimatedMonthlyCost,
        model: modelLabel,
        heartbeatInterval,
        contextTokens: avgInputTokens,
      }),
    [avgInputTokens, estimatedMonthlyCost, heartbeatInterval, modelLabel],
  );

  const copyResultText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 1800);
    } catch {
      setCopiedText(false);
    }
  };

  const copyResultLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1800);
    } catch {
      setCopiedLink(false);
    }
  };

  return (
    <motion.section
      className="rounded-brand border border-primary/20 bg-background/90 p-6"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-2xl font-bold">Share Your Results With Community Members</h3>
        <p className="text-xs text-muted-foreground">Future permalink: /token-calculator/result?config=&lt;encoded-data&gt;</p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <motion.button
          type="button"
          onClick={copyResultText}
          whileTap={{ scale: 0.98 }}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
        >
          {copiedText ? "Result Text Copied" : "Copy Result Text"}
        </motion.button>
        <motion.button
          type="button"
          onClick={copyResultLink}
          whileTap={{ scale: 0.98 }}
          className="rounded-full border border-primary/30 px-5 py-2 text-sm font-semibold transition hover:bg-secondary/70"
        >
          {copiedLink ? "Result Link Copied" : "Copy Result Link"}
        </motion.button>
      </div>

      <motion.article
        className="mt-5 rounded-brand border border-primary/25 bg-secondary/35 p-5"
        initial={{ opacity: 0, scale: 0.99 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.2, delay: 0.05 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">OpenClaw Setup Cost</p>
        <p className="mt-2 text-3xl font-bold text-foreground">{formatCurrency(estimatedMonthlyCost)}/month</p>

        <dl className="mt-4 grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-brand border border-primary/15 bg-background/80 p-3">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Model</dt>
            <dd className="mt-1 font-semibold text-foreground">{modelLabel}</dd>
          </div>
          <div className="rounded-brand border border-primary/15 bg-background/80 p-3">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Heartbeat Interval</dt>
            <dd className="mt-1 font-semibold text-foreground">{heartbeatInterval} min</dd>
          </div>
          <div className="rounded-brand border border-primary/15 bg-background/80 p-3">
            <dt className="text-xs uppercase tracking-wide text-muted-foreground">Estimated Monthly Cost</dt>
            <dd className="mt-1 font-semibold text-foreground">{formatCurrency(estimatedMonthlyCost)}</dd>
          </div>
        </dl>
      </motion.article>

      <p className="mt-4 text-sm text-muted-foreground">
        Built with GuardClaw tools for OpenClaw developers.
      </p>
    </motion.section>
  );
}
