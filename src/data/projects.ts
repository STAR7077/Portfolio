export type ProjectCategory = "ai" | "web" | "mobile";

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  categories: ProjectCategory[];
  tech: string[];
  link?: string;
  /** Filename expected in /public/projects/ — drop the real screenshot in with this name. */
  image: string;
}

export const projects: Project[] = [
  {
    slug: "real-estate-whatsapp-ai-bot",
    title: "Real Estate WhatsApp AI Bot",
    tagline: "AI-powered CRM & WhatsApp lead automation",
    description:
      "An AI real estate CRM that handles incoming WhatsApp conversations end to end: understands what a buyer wants, searches live property inventory, scores lead intent, syncs everything to Airtable, and alerts a human agent when a high-value prospect needs a personal follow-up.",
    categories: ["ai"],
    tech: ["Python", "Django", "DRF", "OpenAI API", "Gemini API", "PostgreSQL", "Redis", "Celery", "Django Channels", "Airtable", "WhatsApp Cloud API", "Docker"],
    image: "real-estate-whatsapp-bot.jpg",
  },
  {
    slug: "inmatic-ai",
    title: "Inmatic AI",
    tagline: "AI-powered accounting automation",
    description:
      "A SaaS platform that automates bookkeeping with AI. Invoices and receipts are ingested and run through an OCR/AI pipeline, converted into structured accounting entries, then categorized and queued for human review before final posting — turning manual data entry into supervision and approval.",
    categories: ["ai", "web"],
    tech: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis", "OCR pipelines", "AWS/GCP", "LLM integration", "NLP"],
    link: "https://inmatic.ai",
    image: "inmatic-ai.jpg",
  },
  {
    slug: "artisan",
    title: "Artisan",
    tagline: "AI SDR & outbound automation platform",
    description:
      "An AI-driven outbound sales platform where autonomous agents research prospects and generate personalized, multi-channel outreach at scale. Worked on backend architecture, lead-enrichment pipelines and the LLM-based message-generation workflow behind campaign orchestration.",
    categories: ["ai"],
    tech: ["Node.js", "Python", "REST APIs", "PostgreSQL", "Redis", "Queue systems", "LLM integration (OpenAI/Claude)", "Workflow automation"],
    link: "https://www.artisan.co",
    image: "artisan.jpg",
  },
  {
    slug: "edraw-ai",
    title: "Edraw AI",
    tagline: "AI diagram & process automation platform",
    description:
      "A platform that turns unstructured text or uploaded documents into professional flowcharts, mind maps and process diagrams using AI-driven parsing and structured generation, with interactive editing, templates and multi-format export.",
    categories: ["ai", "web"],
    tech: ["Python", "AI/ML", "API Development", "Interactive editors", "Export pipelines"],
    link: "https://www.edraw.ai",
    image: "edraw-ai.jpg",
  },
  {
    slug: "infermedica",
    title: "Infermedica",
    tagline: "AI-powered healthcare diagnostic platform",
    description:
      "Intelligent symptom checking, triage and clinical decision support. Worked on AI-driven workflows and backend/API performance for a dynamic symptom-checking engine that adapts its questions in real time using probabilistic reasoning and medical knowledge graphs.",
    categories: ["ai"],
    tech: ["Node.js", "Python", "AI/ML integration", "REST APIs", "HIPAA/GDPR-oriented data handling", "Cloud infrastructure"],
    link: "https://infermedica.com",
    image: "infermedica.jpg",
  },
  {
    slug: "faire",
    title: "Faire",
    tagline: "B2B wholesale marketplace",
    description:
      "A large-scale multi-vendor marketplace connecting independent retailers with brands and wholesalers. Worked on backend systems and API-driven architecture for order lifecycle management, pricing logic and payment/commission flows at high transaction volume.",
    categories: ["web"],
    tech: ["TypeScript", "React", "Node.js", "React Native", "PostgreSQL", "Microservices", "REST APIs", "AWS"],
    link: "https://www.faire.com",
    image: "faire.jpg",
  },
  {
    slug: "planfy",
    title: "Planfy",
    tagline: "Online booking & business management platform",
    description:
      "A booking and business-management platform for service businesses — staff calendars, automated SMS/email reminders, customer database, QR/NFC booking, and video-call appointments — used at high transactional volume across salons, clinics and professional services.",
    categories: ["web"],
    tech: ["React.js", "Laravel", "Angular JS", "Zoho CRM", "Google Maps"],
    link: "https://www.planfy.com",
    image: "planfy.jpg",
  },
  {
    slug: "tooltown",
    title: "ToolTown",
    tagline: "B2C hardware e-commerce (Mexico)",
    description:
      "A Mexican online hardware and tools store with wholesale pricing, installment payments and consumer credit. Focused on usability, product discoverability and conversion — clearly surfacing financing options and a high-volume catalog without slowing checkout down.",
    categories: ["web"],
    tech: ["React", "Tailwind CSS", "E-commerce UX", "Product catalog structure", "Conversion optimization"],
    link: "https://www.tooltown.mx",
    image: "tooltown.jpg",
  },
  {
    slug: "casefox",
    title: "CaseFox",
    tagline: "Legal practice management SaaS",
    description:
      "Cloud-based legal billing and case management for law firms and professional service providers, spanning web, mobile and a Chrome extension — case/client management, time tracking, LEDES/PDF/Word invoicing, trust accounting and legal calendaring.",
    categories: ["web", "mobile"],
    tech: ["React", "Node.js", "React Native", "REST APIs", "PostgreSQL/MySQL", "Chrome Extension"],
    link: "https://www.casefox.com",
    image: "casefox.jpg",
  },
  {
    slug: "vacation-calendar",
    title: "Vacation Calendar",
    tagline: "Team leave management SaaS (Web + Android)",
    description:
      "A shared team calendar that replaces spreadsheets for tracking vacation and leave. Built REST APIs and real-time sync so employees can request time off and managers can approve it with live conflict detection across web and mobile.",
    categories: ["web", "mobile"],
    tech: ["Flutter", "Firebase", "React", "Node.js", "TypeScript", "PostgreSQL"],
    link: "https://www.thevacationcalendar.com",
    image: "vacation-calendar.jpg",
  },
  {
    slug: "swop",
    title: "SWOP",
    tagline: "Sustainable fashion marketplace (iOS/Android)",
    description:
      "A fully-digital, sustainable fashion marketplace app with a social product feed, a swipe-to-like discovery flow, in-app messaging and profile-based selling — built no-code to move fast, which helped it get early traction and a seed round.",
    categories: ["mobile"],
    tech: ["Bubble.io", "BDK Native", "Figma", "Node.js", "API integration"],
    image: "swop.jpg",
  },
];
