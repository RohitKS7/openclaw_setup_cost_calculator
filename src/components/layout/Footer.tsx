import Link from "next/link";

import { SOCIAL_LINKS } from "@/data/ecosystem";

const TOOL_LINKS = [
  {
    label: "Field Note #002 - OpenClaw Model Picker",
    href: SOCIAL_LINKS.tool_modelpicker,
  },
  {
    label: "GuardClaw Tools Hub",
    href: SOCIAL_LINKS.tools,
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-secondary/50 py-10">
      <div className="container-brand grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">GuardClaw Ecosystem</h3>
          <p className="mt-2 text-sm text-muted-foreground">
          GuardClaw is built in public by Rohit. Each tool starts from a real problem. More are coming.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">Built in public by Rohit Kumar Suman.</p>

        </div>

        <div>
          <h4 className="font-serif text-lg font-semibold">Explore Tools</h4>
          <ul className="mt-2 space-y-2 text-sm">
            {TOOL_LINKS.map((tool) => (
              <li key={tool.label}>
                <Link href={tool.href} className="text-muted-foreground transition hover:text-foreground">
                  {tool.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
        <p>
            <Link href={SOCIAL_LINKS.github} target="_blank" className="hover:text-foreground">
              GitHub
            </Link>
          </p>
          <p>
            <Link href={SOCIAL_LINKS.twitter} target="_blank" className="hover:text-foreground">
              Follow My Journey @SumanRohitK7
            </Link>
          </p>
          <p>
            <Link href={SOCIAL_LINKS.linkedin} target="_blank" className="hover:text-foreground">
              LinkedIn
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
