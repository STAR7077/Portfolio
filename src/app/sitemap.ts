import type { MetadataRoute } from "next";

const SITE = "https://lucas-marley.vercel.app";

// A single-page site, so the sitemap is one entry. Language is chosen on
// the client rather than by route, so there are no alternates to list.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
