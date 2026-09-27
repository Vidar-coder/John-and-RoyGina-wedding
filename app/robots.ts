import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Explicitly allow Facebook's link-preview scraper so OG tags are readable
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://john-calvin-and-roygina.weddinginvitationrsvp.com/sitemap.xml",
  }
}
