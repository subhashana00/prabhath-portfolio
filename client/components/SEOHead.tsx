import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  keywords?: string;
  noindex?: boolean;
}

const BASE_URL = "https://prabhath-portfolio.vercel.app";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/profile/profile.png`;

/**
 * SEOHead — manages per-page <title>, meta description, canonical,
 * Open Graph and Twitter Card tags via DOM manipulation.
 *
 * Usage:
 *   <SEOHead
 *     title="Page Title | Prabhath Subhashana"
 *     description="150-char description"
 *   />
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  keywords,
  noindex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // ---- Title ----
    document.title = title;

    // ---- Helper: upsert a <meta> tag ----
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // ---- Standard meta ----
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

    if (keywords) {
      setMeta("name", "keywords", keywords);
    }

    // ---- Canonical ----
    const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);

    // ---- Open Graph ----
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");
    setMeta("property", "og:site_name", "Prabhath Subhashana — UI/UX Designer");
    setMeta("property", "og:locale", "en_US");

    // ---- Twitter Card ----
    setMeta("property", "twitter:card", "summary_large_image");
    setMeta("property", "twitter:title", title);
    setMeta("property", "twitter:description", description);
    setMeta("property", "twitter:image", ogImage);
    setMeta("property", "twitter:url", canonicalUrl);

    // Cleanup: reset title on unmount so next page can set its own
    return () => {
      document.title = "Prabhath Subhashana | UI/UX Designer & Software Engineer";
    };
  }, [title, description, canonical, ogImage, ogType, keywords, noindex]);

  return null; // This component renders nothing — it only manages <head>
}

export { BASE_URL, DEFAULT_OG_IMAGE };
