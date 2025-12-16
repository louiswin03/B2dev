import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Devis Gratuit Sous 24h | B2dev Paris & Île-de-France",
  description: "Contactez B2dev pour votre projet web. Devis 100% gratuit, réponse sous 24h, sans engagement. Artisans et PME d'Île-de-France, bénéficiez de l'aide régionale.",
  keywords: ["contact agence web", "devis site internet", "contact développeur Paris", "devis gratuit site web", "agence web Île-de-France"],
  openGraph: {
    title: "Contactez-nous | B2dev",
    description: "Devis gratuit sous 24h. Sans engagement.",
    url: 'https://b2dev.pro/contact',
    siteName: 'B2dev',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
