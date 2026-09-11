import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";
import MotionProvider from "@/components/MotionProvider";
import NoiseOverlay from "@/components/NoiseOverlay";

// Headlines and body. Holds up at 800 with tight tracking, which is what the
// display statements lean on.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// Labels, section numbers and the data inside interface panels: the
// technical register, kept to small sizes so it never has to carry prose.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Browser chrome on phones matches the page ground instead of flashing white.
export const viewport: Viewport = {
  themeColor: "#080a0f",
  colorScheme: "dark",
};

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
      className={`${manrope.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-fg">
        <SmoothScroll />
        <LanguageProvider>
          <MotionProvider>{children}</MotionProvider>
        </LanguageProvider>
        <NoiseOverlay />
        {/* Cookieless, so no consent banner is owed. Speed Insights reports
            what real visitors on real connections actually experience,
            which is the only way to know whether the weight work landed. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
