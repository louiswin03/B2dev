import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./providers/ThemeProvider";
import { CookieConsentProvider } from "./contexts/CookieConsentContext";
import { CookieBanner } from "./components/CookieBanner";
import { LocalBusinessSchema } from "./components/LocalBusinessSchema";
import { OrganizationSchema } from "./components/OrganizationSchema";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Création de Sites Web pour Artisans & PME | B2dev | Paris & Île-de-France",
    template: "%s | B2dev"
  },
  description: "Agence web fondée par des ingénieurs. Sites vitrines, e-commerce et sur mesure pour coiffeurs, restaurants, artisans. Prix compétitifs, aide régionale possible jusqu'à 50%* (sous réserve d'éligibilité).",
  keywords: ["création site web", "site vitrine", "site e-commerce", "développeur web Paris", "agence web", "site internet artisan", "chèque numérique", "aide région île-de-france"],
  authors: [{ name: "B2dev" }],
  creator: "B2dev",
  publisher: "B2dev",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://b2dev.pro'),
  openGraph: {
    title: "B2dev - Création de sites web professionnels",
    description: "Sites modernes et ultra-performants pour artisans et PME. Qualité professionnelle à prix abordable.",
    url: 'https://b2dev.pro',
    siteName: 'B2dev',
    locale: 'fr_FR',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
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
    images: ['/images/og-image.png'],
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
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
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
        <LocalBusinessSchema />
        <OrganizationSchema />
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
