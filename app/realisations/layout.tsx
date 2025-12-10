import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Réalisations | Portfolio B2dev | Sites Web Paris & Île-de-France",
  description: "Découvrez nos créations de sites web : sites vitrines, e-commerce, plateformes sur-mesure. Projets professionnels et personnels réalisés avec Next.js et technologies modernes.",
  keywords: ["portfolio web", "réalisations sites internet", "exemples sites web", "projets développement web", "sites modernes Paris"],
  openGraph: {
    title: "Nos Réalisations | B2dev",
    description: "Découvrez nos créations de sites web modernes et performants.",
    url: 'https://b2dev.fr/realisations',
    siteName: 'B2dev',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RealisationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
