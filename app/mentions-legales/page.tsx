"use client";

import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";

export default function MentionsLegalesPage() {
  return (
    <>
      <Section className="pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            Mentions Légales
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique.
          </p>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300">
            {/* Éditeur du site */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                1. Éditeur du site
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-white/10 space-y-2">
                <p><strong>Raison sociale :</strong> B2dev</p>
                <p><strong>Statut :</strong> [À compléter - Micro-entreprise/SAS/SARL]</p>
                <p><strong>SIRET :</strong> [À compléter après immatriculation]</p>
                <p><strong>Siège social :</strong> Paris, Île-de-France</p>
                <p><strong>Email :</strong> <a href="mailto:AmauryAll.b2dev@gmail.com" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">AmauryAll.b2dev@gmail.com</a></p>
                <p><strong>Téléphone :</strong> <a href="tel:+33682510468" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">06 82 51 04 68</a></p>
                <p><strong>Directeur de la publication :</strong> Amaury Allain & Louis Winkelmuller</p>
              </div>
            </div>

            {/* Hébergeur */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                2. Hébergeur du site
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-white/10 space-y-2">
                <p><strong>Nom :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">https://vercel.com</a></p>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                3. Propriété intellectuelle
              </h2>
              <p className="mb-3">
                L'ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes, etc.) est la propriété exclusive de B2dev, sauf mention contraire.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de B2dev.
              </p>
            </div>

            {/* Données personnelles */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                4. Données personnelles
              </h2>
              <p>
                Les informations recueillies via le formulaire de contact sont destinées uniquement à B2dev pour le traitement de vos demandes.
              </p>
              <p className="mt-3">
                Conformément à la loi "Informatique et Libertés" du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données vous concernant.
              </p>
              <p className="mt-3">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:AmauryAll.b2dev@gmail.com" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">AmauryAll.b2dev@gmail.com</a>
              </p>
              <p className="mt-3">
                Pour plus d'informations, consultez notre{" "}
                <a href="/politique-confidentialite" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline">
                  Politique de Confidentialité
                </a>.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                5. Cookies
              </h2>
              <p>
                Ce site utilise des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de tracking n'est utilisé sans votre consentement explicite.
              </p>
            </div>

            {/* Limitation de responsabilité */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                6. Limitation de responsabilité
              </h2>
              <p className="mb-3">
                B2dev s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site, mais ne peut garantir l'absence d'erreurs ou d'omissions.
              </p>
              <p>
                B2dev ne pourra être tenu responsable des dommages directs ou indirects résultant de l'accès au site ou de l'utilisation de celui-ci.
              </p>
            </div>

            {/* Loi applicable */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                7. Droit applicable et juridiction
              </h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut d'accord amiable, les tribunaux français seront seuls compétents.
              </p>
            </div>

            {/* Date de mise à jour */}
            <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Dernière mise à jour : Décembre 2024
              </p>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
