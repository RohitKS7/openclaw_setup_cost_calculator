import Image from "next/image";
import Link from "next/link";

import { SOCIAL_LINKS } from "@/data/ecosystem";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-brand flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/guardclaw-logo.png"
            alt="GuardClaw"
            width={28}
            height={28}
            className="h-7 w-7"
          />
          <span className="font-serif text-lg font-bold">GuardClaw</span>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-semibold text-muted-foreground">
          <a href={SOCIAL_LINKS.tools} target="_blank" className="transition hover:text-foreground">
            Tools
          </a>
          <Link
            href={SOCIAL_LINKS.github}
            target="_blank"
            className="transition hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href={SOCIAL_LINKS.website}
            target="_blank"
            className="rounded-full border border-primary/30 px-4 py-2 text-foreground transition hover:bg-primary hover:text-primary-foreground"
          >
            Ecosystem
          </Link>
        </nav>
      </div>
    </header>
  );
}
