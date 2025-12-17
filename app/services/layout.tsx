import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Création de Sites Web pour Artisans & PME | Tarifs B2dev | Paris & Île-de-France",
  description: "Découvrez nos offres : Site Vitrine dès 990€, Pack Pro à 1490€. Aide régionale possible jusqu'à 50%* (sous réserve d'éligibilité). Devis gratuit sous 24h.",
  keywords: ["tarifs site web", "création site vitrine", "site e-commerce", "prix site internet", "développeur web Paris", "agence web prix", "chèque numérique IDF"],
  openGraph: {
    title: "Nos Offres & Tarifs | B2dev",
    description: "Sites modernes et performants pour artisans et PME. Prix compétitifs; aide possible jusqu'à 50%*.",
    url: 'https://b2dev.pro/services',
    siteName: 'B2dev',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
