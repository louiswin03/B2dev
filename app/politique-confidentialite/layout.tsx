import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité",
  description: "Politique de confidentialité et protection des données personnelles de B2dev. RGPD et gestion des cookies.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function PolitiqueConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
