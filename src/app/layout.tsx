import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, Caveat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Cursor from "@/components/Cursor";
import LoadingScreen from "@/components/LoadingScreen";
import { site } from "@/lib/content";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.meta.url),
  title: site.pageTitle,
  description: site.meta.ogDescription,
  keywords: [
    "Raghav Rathi",
    "Backend Software Engineer",
    "Django",
    "Python",
    "FastAPI",
    "AsyncIO",
    "AI LLM integration",
  ],
  authors: [{ name: site.fullName, url: site.meta.url }],
  alternates: { canonical: site.meta.url },
  openGraph: {
    title: site.meta.ogTitle,
    description: site.meta.ogDescription,
    url: site.meta.url,
    siteName: site.fullName,
    type: "website",
    images: [{ url: site.meta.ogImage, width: 1200, height: 630, alt: site.fullName }],
  },
  icons: { icon: "/favicon.svg" },
};

// Colors the mobile browser chrome to match each theme's background.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF3E7" },
    { media: "(prefers-color-scheme: dark)", color: "#0D1A17" },
  ],
};

// JSON-LD Person schema for richer search results. Built from site content so it
// stays in sync with the rest of the site.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.shortName,
  jobTitle: site.title,
  email: `mailto:${site.email}`,
  url: site.meta.url,
  image: `${site.meta.url}${site.meta.ogImage}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.location,
  },
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${manrope.variable} ${caveat.variable} h-full antialiased`}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProvider>
          <LoadingScreen />
          <Navbar />
          <Cursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
