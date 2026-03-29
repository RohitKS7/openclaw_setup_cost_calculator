import type { MetadataRoute } from "next";

const LAST_MODIFIED = "2026-03-29";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://calculator.guardclaw.dev/",
      lastModified: LAST_MODIFIED,
    },
    {
      url: "https://calculator.guardclaw.dev/calculate",
      lastModified: LAST_MODIFIED,
    },
    {
      url: "https://calculator.guardclaw.dev/tools/openclaw-token-calculator",
      lastModified: LAST_MODIFIED,
    },
  ];
}
