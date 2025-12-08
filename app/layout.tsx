import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { CookieBanner } from "./components/CookieBanner";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B2dev - Création de sites web pour artisans et PME | Paris & Île-de-France",
  description: "Agence web fondée par des ingénieurs. Sites vitrines, e-commerce et sur mesure pour coiffeurs, restaurants, artisans. Prix compétitifs, jusqu'à 50% financé par la Région IDF.",
  keywords: ["création site web", "site vitrine", "site e-commerce", "développeur web Paris", "agence web", "site internet artisan", "chèque numérique", "aide région île-de-france"],
  authors: [{ name: "B2dev" }],
  creator: "B2dev",
  publisher: "B2dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://b2dev.fr'),
  openGraph: {
    title: "B2dev - Création de sites web professionnels",
    description: "Sites modernes et ultra-performants pour artisans et PME. Qualité professionnelle à prix abordable.",
    url: 'https://b2dev.fr',
    siteName: 'B2dev',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'B2dev - Création de sites web professionnels',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'B2dev - Création de sites web professionnels',
    description: 'Sites modernes et ultra-performants pour artisans et PME',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.classList.toggle('dark', theme === 'dark');
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "B2dev",
              "description": "Agence web spécialisée dans la création de sites internet pour artisans et PME",
              "url": "https://b2dev.fr",
              "logo": "https://b2dev.fr/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Paris",
                "addressRegion": "Île-de-France",
                "addressCountry": "FR"
              },
              "telephone": "+33682510468",
              "email": "AmauryAll.b2dev@gmail.com",
              "priceRange": "€€",
              "sameAs": [
                "https://www.linkedin.com/company/b2dev"
              ],
              "areaServed": {
                "@type": "GeoCircle",
                "geoMidpoint": {
                  "@type": "GeoCoordinates",
                  "latitude": "48.8566",
                  "longitude": "2.3522"
                },
                "geoRadius": "50000"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "15"
              },
              "founder": [
                {
                  "@type": "Person",
                  "name": "Louis Winkelmuller",
                  "jobTitle": "CTO & Architecte Technique",
                  "alumniOf": "ISEP"
                },
                {
                  "@type": "Person",
                  "name": "Amaury Allemand",
                  "jobTitle": "Chef de Projet & Designer UX",
                  "alumniOf": "ISEP"
                }
              ]
            })
          }}
        />
      </head>
      <body
        className={`${jetbrainsMono.variable} antialiased bg-background dark:bg-background min-h-screen flex flex-col`}
      >
        <CookieConsentProvider>
          <ThemeProvider>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </ThemeProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
