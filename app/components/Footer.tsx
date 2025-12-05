import Link from "next/link";
import { Code2, Github, Linkedin, Twitter, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 dark:border-white/10 bg-[#f0f0f0] dark:bg-[#1a1a1a] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Code2 className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold text-neutral-900 dark:text-white">DevAgency</span>
            </Link>
            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed">
              Nous créons des expériences web exceptionnelles pour les petites entreprises. 
              Modernes, rapides et sur mesure.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/apropos" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  À Propos
                </Link>
              </li>
              <li>
                <Link href="/realisations" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  Réalisations
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  Services & Tarifs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Légal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base">
                  CGV
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-neutral-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33682510468"
                  className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base"
                >
                  <Phone className="w-4 h-4" />
                  <span>06 82 51 04 68</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@devagency.fr"
                  className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors text-base"
                >
                  <Mail className="w-4 h-4" />
                  <span>contact@devagency.fr</span>
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-600 dark:text-neutral-400 hover:text-blue-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-200 dark:border-white/10 text-center">
          <p className="text-neutral-500 dark:text-neutral-500 text-base">
            © {new Date().getFullYear()} DevAgency. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
