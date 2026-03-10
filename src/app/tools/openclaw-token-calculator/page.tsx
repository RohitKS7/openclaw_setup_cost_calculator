import type { Metadata } from "next";
import { Suspense } from "react";

import { ToolPageContent } from "@/components/calculator/ToolPageContent";

export const metadata: Metadata = {
  title: "Field Note #001 - OpenClaw Setup Cost Calculator | GuardClaw",
  description:
    "Estimate OpenClaw token cost by model, heartbeat interval, and session volume before spending your budget.",
};

export default function OpenClawTokenCalculatorPage() {
  return (
    <Suspense fallback={<div className="container-brand py-10">Loading calculator...</div>}>
      <ToolPageContent />
    </Suspense>
  );
}