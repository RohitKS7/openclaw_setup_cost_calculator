# OpenClaw Token Cost Calculator

**Stop running blind. See what your OpenClaw setup actually costs — before it drains.**

A free, open-source calculator for OpenClaw users to estimate daily and
monthly token spend across models, heartbeats, fallback behaviour, and
multi-agent setups. No account. No backend. Runs entirely in the browser.

🔗 **[Try it live → guardclaw.dev/calculator](https://guardclaw.dev/calculator)**

---

![Calculator Output](./public/calculator.gif)

---

## Why this exists

Every week, the same thread appears in OpenClaw Discord.

Someone's budget is gone. They don't know why.
It wasn't one big thing. It was heartbeats firing every 30 minutes.
A fallback model they forgot was set. A thinking mode left on high.

None of it visible. All of it expensive.

This tool exists because the feedback loop was missing.

---

## What it calculates

| Section | What it covers |
|---|---|
| Model cost | Primary model spend per day and month across 40+ models |
| Heartbeat budget | Token cost of heartbeat intervals at idle |
| Fallback behaviour | Blended cost when sessions fall back to a secondary model |
| Multi-agent mode | Total spend across simultaneous agents |

---

## Supported providers

Anthropic · OpenAI · OpenAI Codex · Google Gemini · Moonshot (Kimi) ·
MiniMax · Z.AI (GLM) · DeepSeek · xAI · Mistral · Volcano Engine ·
BytePlus · Qwen · Kilo Gateway · OpenRouter · Ollama · vLLM

Free-tier models (Codex OAuth, Qwen, Gemini CLI) are handled separately —
rate-limit display instead of dollar cost.

Local models (Ollama, vLLM) default to $0 with an optional compute cost input.

---

## Running locally

```bash
git clone https://github.com/RohitKS7/openclaw_setup_cost_calculator
cd openclaw_setup_cost_calculator
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Updating pricing data

All model prices live in one file:

```
src/lib/pricing.js
```

Each entry follows this structure:

```js
"provider/model-id": { input: 0.00, output: 0.00 }

// Free tier models
"provider/model-id": { free: true, rateLimitOnly: true }

// Local models
"provider/model-id": { input: 0, output: 0, localCompute: true }
```

Prices are in USD per million tokens.
A `PRICING_LAST_UPDATED` constant at the top of the file tracks
when prices were last verified.

If you spot a price that's out of date, a PR updating `pricing.js`
is the most useful contribution you can make.

---

## Tech stack

- **Framework:** Next.js (static export)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Deployment:** Vercel
- **Backend:** None

---

## Part of the GuardClaw ecosystem

This tool is **Field Note #001: Token Cost Calculator** in the GuardClaw toolkit —
a collection of free, open-source tools for OpenClaw users.

**Next in the ecosystem:**
- **Field Note #002:** [Model Picker](https://guardclaw.dev/picker) — Choose the right model for your use case, then verify the cost here
- More tools coming soon

After calculating your costs, use the Model Picker to ensure you're using the right model:
🔗 [Open Model Picker](https://guardclaw.dev/picker)

🌐 [View all GuardClaw tools](https://guardclaw.dev)

Follow the journey:
[@SumanRohitK7](https://twitter.com/SumanRohitK7)

---

## Contributing

Pricing updates, bug reports, and new provider suggestions are welcome.
See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to help.

---

## Support

If this tool saved you money, a GitHub star helps others find it.

**Using a specific model?** Verify it with the Model Picker:
🔗 [Model Picker → guardclaw.dev/picker](https://guardclaw.dev/picker)

Show your support:

⭐ [Star this repo](https://github.com/RohitKS7/openclaw_setup_cost_calculator)
💜 [Sponsor on GitHub](https://github.com/sponsors/RohitKS7)

---

*Built in public by [Rohit Kumar](https://twitter.com/SumanRohitK7).
Free forever. Open source.*

---
