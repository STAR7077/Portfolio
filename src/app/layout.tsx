import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Static metadata is emitted at build time, so it stays in the default language.
// The visible tab title is re-translated on the client by LanguageProvider.
export const metadata: Metadata = {
  title: "Lucas Marley | Developer",
  description:
    "Lucas Marley - full-stack, AI automation & mobile developer. Building AI agents, web platforms and cross-platform apps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#f2f2f5] text-[#16151c] selection:bg-violet-200 selection:text-violet-950">
        <SmoothScroll />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
