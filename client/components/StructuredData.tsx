const BASE_URL = "https://prabhath-portfolio.vercel.app";

/* ------------------------------------------------------------------ */
/*  Reusable JSON-LD renderer                                         */
/* ------------------------------------------------------------------ */
interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Shared Person entity (reused across schemas)                      */
/* ------------------------------------------------------------------ */
const personEntity = {
  "@type": "Person",
  name: "Prabhath Subhashana",
  alternateName: "Prabhath",
  jobTitle: "UI/UX Designer & AI-First Product Designer",
  description:
    "Award-winning UI/UX designer from Sri Lanka specializing in AI-first product design, mobile app UX, and premium digital experiences.",
  url: BASE_URL,
  image: `${BASE_URL}/images/profile/profile.png`,
  email: "prabathsubashana18@gmail.com",
  telephone: "+94",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Gampaha",
    addressRegion: "Western Province",
    addressCountry: "LK",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "ICBT Campus (Cardiff Metropolitan University)",
    url: "https://www.icbt.lk",
  },
  knowsAbout: [
    "UI/UX Design",
    "User Interface Design",
    "User Experience Design",
    "AI-First Product Design",
    "Mobile App Design",
    "Web Design",
    "Figma",
    "Adobe XD",
    "React",
    "Front-end Development",
    "Design Systems",
    "Brand Identity Design",
    "SaaS Interface Design",
    "Interaction Design",
    "Wireframing",
    "Prototyping",
    "User Research",
  ],
  sameAs: [
    "https://linkedin.com/in/prabhath-subhashana-6b694a20a",
    "https://behance.net/prabathsubasha",
    "https://github.com/subhashana00",
  ],
  nationality: {
    "@type": "Country",
    name: "Sri Lanka",
  },
};

/* ------------------------------------------------------------------ */
/*  Pre-built structured data generators                               */
/* ------------------------------------------------------------------ */

/** Homepage: WebSite + Person */
export function homePageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Prabhath Subhashana — UI/UX Designer Portfolio",
      alternateName: "PS Portfolio",
      url: BASE_URL,
      description:
        "Portfolio of Prabhath Subhashana, a top UI/UX designer from Sri Lanka specializing in AI-first product design, mobile app UX, and premium digital experiences.",
      author: { "@id": `${BASE_URL}/#person` },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      ...personEntity,
      "@id": `${BASE_URL}/#person`,
    },
    breadcrumbSchema([{ name: "Home", url: "/" }]),
  ];
}

/** About page: ProfilePage */
export function aboutPageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: "About Prabhath Subhashana",
      description:
        "Learn about Prabhath Subhashana — a passionate UI/UX designer from Colombo, Sri Lanka with 1.5+ years of experience in AI-first product design.",
      url: `${BASE_URL}/about`,
      mainEntity: {
        "@context": "https://schema.org",
        ...personEntity,
      },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About", url: "/about" },
    ]),
  ];
}

/** Projects page: CollectionPage */
export function projectsPageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "UI/UX Design Portfolio — Prabhath Subhashana",
      description:
        "Explore 10+ premium UI/UX design projects including mobile apps, SaaS dashboards, and brand identity systems from Prabhath Subhashana.",
      url: `${BASE_URL}/projects`,
      author: personEntity,
      about: {
        "@type": "Thing",
        name: "UI/UX Design Projects",
      },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
    ]),
  ];
}

/** Contact page */
export function contactPageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "Contact Prabhath Subhashana — Hire a UI/UX Designer in Sri Lanka",
      description:
        "Get in touch with Prabhath Subhashana for freelance UI/UX design services. Based in Sri Lanka, available worldwide.",
      url: `${BASE_URL}/contact`,
      mainEntity: personEntity,
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Contact", url: "/contact" },
    ]),
  ];
}

/** Freelance page: Service + Offer */
export function freelancePageSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Freelance UI/UX Design Services — Prabhath Subhashana",
      description:
        "Professional freelance UI/UX design services including mobile app design, web design, SaaS interfaces, brand identity, and AI-first product design.",
      url: `${BASE_URL}/freelance`,
      provider: personEntity,
      serviceType: "UI/UX Design",
      areaServed: [
        { "@type": "Country", name: "Sri Lanka" },
        { "@type": "Place", name: "Worldwide" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "UI/UX Design Packages",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Mobile App UI/UX Design",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Web Application Design",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Brand Identity & Design Systems",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "AI-First Product Design",
            },
          },
        ],
      },
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Freelance", url: "/freelance" },
    ]),
  ];
}

/** Individual Case Study: CreativeWork */
export function caseStudySchema(project: {
  name: string;
  description: string;
  url: string;
  image?: string;
  datePublished?: string;
  keywords?: string[];
  breadcrumbName: string;
}) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.name,
      description: project.description,
      url: `${BASE_URL}${project.url}`,
      image: project.image || `${BASE_URL}/images/profile/profile.png`,
      author: personEntity,
      creator: personEntity,
      datePublished: project.datePublished || "2026-01-01",
      genre: "UI/UX Design Case Study",
      keywords: project.keywords?.join(", ") || "UI/UX Design, Case Study",
      inLanguage: "en",
      isAccessibleForFree: true,
    },
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Projects", url: "/projects" },
      { name: project.breadcrumbName, url: project.url },
    ]),
  ];
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb helper                                                  */
/* ------------------------------------------------------------------ */
function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url === "/" ? "" : item.url}`,
    })),
  };
}
