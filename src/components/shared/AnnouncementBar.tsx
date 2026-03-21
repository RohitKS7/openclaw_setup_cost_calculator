import Link from "next/link";

interface AnnouncementBarProps {
  badge: string;
  message: string;
  linkLabel: string;
  linkHref: string;
  external?: boolean;
}

export function AnnouncementBar({
  badge,
  message,
  linkLabel,
  linkHref,
  external = false,
}: AnnouncementBarProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="flex w-full max-sm:flex-row flex-col items-center justify-center gap-2 border-b border-border bg-secondary px-4 py-3 text-center sm:min-h-10 sm:flex-row sm:flex-wrap sm:gap-x-2.5 sm:gap-y-1 sm:px-6 sm:py-2.5">
      <span className="shrink-0 rounded bg-primary px-2 py-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-primary-foreground max-sm:w-min">
        {badge}
      </span>

      <span className="max-w-2xl font-sans text-sm font-normal leading-snug text-foreground">
        {message}
      </span>

      <span aria-hidden="true" className="hidden font-sans text-sm text-muted-foreground sm:inline">
        {"\u00B7"}
      </span>

      <Link
        href={linkHref}
        {...linkProps}
        className="inline-flex items-center justify-center font-sans text-sm font-medium text-accent no-underline transition-opacity duration-150 hover:opacity-80 hover:underline"
      >
        <span className="sm:hidden" aria-label={linkLabel}>
        →
        </span>
        <span className="hidden sm:inline">{linkLabel}</span>
      </Link>
    </div>
  );
}
