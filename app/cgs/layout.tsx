import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Services",
  description: "Conditions générales de services de B2dev. Modalités de prestation, tarifs et garanties.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function CgsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
