# GuardClaw Tools MVP

MVP implementation of **Field Note #001 - OpenClaw Setup Cost Calculator** using Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build for Production

```bash
npm run build
npm run start
```

## Deploy (Vercel)

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output: default Next.js output.
6. Deploy and connect your custom domain/subpath (e.g. `guardclaw.dev/tools/openclaw-token-calculator`).

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    tools/openclaw-token-calculator/page.tsx
    globals.css
  components/
    layout/
      Header.tsx
      Footer.tsx
      ToolLayout.tsx
    calculator/
      AnimatedCurrency.tsx
      ModelSection.tsx
      HeartbeatSection.tsx
      SummaryCard.tsx
      ShareButton.tsx
      ToolPageContent.tsx
    shared/
      MotionSection.tsx
  data/
    pricing.ts
    defaults.ts
    ecosystem.ts
  types/
    calculator.ts
  utils/
    calculate.ts
    urlState.ts
```

