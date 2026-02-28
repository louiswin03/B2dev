import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center text-foreground">
              <Logo className="h-[40px] w-auto" />
            </Link>
            <p className="text-muted-foreground text-base leading-relaxed">
              Nous créons des expériences web exceptionnelles pour les petites entreprises. 
              Modernes, rapides et sur mesure.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  Notre travail
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  Services & Tarifs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/mentions-legales" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgs" className="text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base">
                  CGS
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33682510468"
                  className="flex items-center gap-2 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base"
                >
                  <Phone className="w-4 h-4" />
                  <span>06 82 51 04 68</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:AmauryAll.b2dev@gmail.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-teal-700 dark:hover:text-teal-400 transition-colors text-base"
                >
                  <Mail className="w-4 h-4" />
                  <span>AmauryAll.b2dev@gmail.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} B2dev. Fait avec passion à Paris.
          </p>
        </div>
      </div>
    </footer>
  );
}
