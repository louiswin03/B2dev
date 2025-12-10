import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À Propos | Ingénieurs Web B2dev | Paris & Île-de-France",
  description: "Rencontrez Louis et Amaury, deux jeunes ingénieurs ISEP passionnés par le développement web. Expertise technique et design au service de votre projet digital.",
  keywords: ["ingénieurs web", "développeurs Paris", "agence web ISEP", "équipe B2dev", "création site Paris"],
  openGraph: {
    title: "Notre Équipe | B2dev",
    description: "Deux ingénieurs passionnés au service de votre projet digital.",
    url: 'https://b2dev.fr/apropos',
    siteName: 'B2dev',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function AproposLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
