import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";

// One family for everything, matching the reference site.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const SITE = "https://lucas-marley.vercel.app";
const TITLE = "Lucas Marley | AI Agents, Web & Mobile Developer";
const DESCRIPTION =
  "Freelance full-stack and AI automation developer. I build AI agents, automations, web platforms and mobile apps, and take on Odoo ERP rollouts. Working in English, Portuguese and Spanish.";

// Static metadata is emitted at build time, so it stays in the default
// language. The visible tab title is re-translated on the client by
// LanguageProvider.
export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  keywords: [
    "freelance developer",
    "AI agents",
    "AI automation",
    "Next.js developer",
    "React Native developer",
    "Odoo implementation",
    "n8n automation",
    "desenvolvedor freelance",
    "desarrollador freelance",
  ],
  authors: [{ name: "Lucas Marley" }],
  creator: "Lucas Marley",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "Lucas Marley",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["pt_BR", "es_ES"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f2f2f5] text-[#16151c] selection:bg-violet-200 selection:text-violet-950">
        <SmoothScroll />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
