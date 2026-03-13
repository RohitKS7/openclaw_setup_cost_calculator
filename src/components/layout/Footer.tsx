import Link from "next/link";

import { SOCIAL_LINKS } from "@/data/ecosystem";

const TOOL_LINKS = [
  {
    label: "Field Note #001 - OpenClaw Setup Cost Calculator",
    href: "/calculate",
  },
  {
    label: "More tools in progress",
    href: SOCIAL_LINKS.website,
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/80 bg-secondary/50 py-10">
      <div className="container-brand grid gap-8 md:grid-cols-3">
        <div>
          <h3 className="text-xl font-semibold">GuardClaw Ecosystem</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Part of the GuardClaw ecosystem - free tools for OpenClaw Users and Developers.
          </p>
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
            <Link href={SOCIAL_LINKS.buyMeACoffee} target="_blank" className="hover:text-foreground">
              Buy Me A Coffee
            </Link>
          </p>
          <p>
            Built by · <Link href={SOCIAL_LINKS.twitter} target="_blank" className="hover:text-foreground">@SumanRohitK7</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
