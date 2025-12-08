"use client";

import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Section className="pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            Politique de Confidentialité
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            B2dev s'engage à protéger la vie privée de ses utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300">
            {/* Introduction */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                1. Responsable du traitement
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-white/10 space-y-2">
                <p><strong>Raison sociale :</strong> B2dev</p>
                <p><strong>Email :</strong> <a href="mailto:AmauryAll.b2dev@gmail.com" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">AmauryAll.b2dev@gmail.com</a></p>
                <p><strong>Téléphone :</strong> <a href="tel:+33682510468" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">06 82 51 04 68</a></p>
              </div>
            </div>

            {/* Données collectées */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                2. Données personnelles collectées
              </h2>
              <p className="mb-4">
                Dans le cadre de l'utilisation de notre site, nous sommes susceptibles de collecter les données personnelles suivantes :
              </p>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800/30 mb-4">
                <h3 className="font-semibold text-lg mb-3 text-neutral-900 dark:text-white">
                  Via le formulaire de contact :
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Prénom et nom</li>
                  <li>Adresse email</li>
                  <li>Numéro de téléphone (optionnel)</li>
                  <li>Type de service souhaité</li>
                  <li>Message / description du projet</li>
                </ul>
              </div>

              <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg border border-purple-200 dark:border-purple-800/30">
                <h3 className="font-semibold text-lg mb-3 text-neutral-900 dark:text-white">
                  Données de navigation (cookies techniques) :
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Préférences du thème (mode sombre/clair)</li>
                  <li>Données techniques de connexion (adresse IP, navigateur, système d'exploitation)</li>
                </ul>
              </div>
            </div>

            {/* Finalité du traitement */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                3. Finalité du traitement des données
              </h2>
              <p className="mb-3">
                Les données collectées via notre formulaire de contact sont utilisées uniquement pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Répondre à vos demandes de devis ou d'information</li>
                <li>Vous recontacter dans le cadre de votre projet</li>
                <li>Améliorer nos services et notre communication</li>
              </ul>
              <p className="mt-4 font-semibold text-neutral-900 dark:text-white">
                ⚠️ Nous ne vendons, ne louons ni ne partageons vos données personnelles avec des tiers à des fins commerciales.
              </p>
            </div>

            {/* Base légale */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                4. Base légale du traitement
              </h2>
              <p>
                Le traitement de vos données repose sur votre <strong>consentement explicite</strong> lors de l'envoi du formulaire de contact, conformément à l'article 6.1.a du RGPD.
              </p>
            </div>

            {/* Durée de conservation */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                5. Durée de conservation des données
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-white/10 space-y-3">
                <p><strong>Formulaire de contact :</strong> Vos données sont conservées pendant <strong>3 ans maximum</strong> à compter de notre dernier échange, sauf si vous devenez client.</p>
                <p><strong>Clients :</strong> Les données liées aux projets réalisés sont conservées pendant <strong>10 ans</strong> conformément aux obligations comptables et fiscales.</p>
                <p><strong>Cookies techniques :</strong> Durée de session ou jusqu'à suppression manuelle par l'utilisateur.</p>
              </div>
            </div>

            {/* Vos droits */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                6. Vos droits (RGPD)
              </h2>
              <p className="mb-4">
                Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800/30">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">✓ Droit d'accès</h4>
                  <p className="text-sm">Obtenir une copie de vos données</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800/30">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">✓ Droit de rectification</h4>
                  <p className="text-sm">Corriger des informations inexactes</p>
                </div>
                <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800/30">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">✓ Droit à l'effacement</h4>
                  <p className="text-sm">Supprimer vos données ("droit à l'oubli")</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800/30">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">✓ Droit d'opposition</h4>
                  <p className="text-sm">Vous opposer au traitement</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800/30">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">✓ Droit à la portabilité</h4>
                  <p className="text-sm">Récupérer vos données dans un format lisible</p>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800/30">
                  <h4 className="font-semibold mb-2 text-neutral-900 dark:text-white">✓ Droit de limitation</h4>
                  <p className="text-sm">Limiter le traitement de vos données</p>
                </div>
              </div>
              <p className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <strong>Pour exercer vos droits :</strong> Envoyez-nous un email à{" "}
                <a href="mailto:AmauryAll.b2dev@gmail.com" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline">
                  AmauryAll.b2dev@gmail.com
                </a>{" "}
                avec la preuve de votre identité. Nous vous répondrons sous 1 mois maximum.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                7. Politique de cookies
              </h2>
              <p className="mb-4">
                Notre site utilise uniquement des <strong>cookies techniques strictement nécessaires</strong> au bon fonctionnement du site (préférence de thème, session utilisateur).
              </p>
              <p className="mb-4">
                <strong>Aucun cookie publicitaire, de tracking ou d'analyse (Google Analytics, Facebook Pixel, etc.) n'est utilisé sans votre consentement explicite.</strong>
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Note : Si nous installons ultérieurement des outils d'analyse (Google Analytics, etc.), une bannière de consentement RGPD sera mise en place.
              </p>
            </div>

            {/* Sécurité */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                8. Sécurité des données
              </h2>
              <p className="mb-3">
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>L'accès non autorisé</li>
                <li>La divulgation accidentelle ou illégale</li>
                <li>La perte ou la destruction de données</li>
              </ul>
              <p className="mt-4">
                Nos données sont hébergées chez <strong>Vercel Inc.</strong>, conforme aux standards de sécurité internationaux.
              </p>
            </div>

            {/* Transfert de données */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                9. Transfert de données hors UE
              </h2>
              <p>
                Nos données sont hébergées sur les serveurs de Vercel, qui peut stocker des données aux États-Unis. Vercel est conforme au RGPD et dispose de clauses contractuelles types (SCC) pour encadrer ces transferts.
              </p>
            </div>

            {/* Réclamation */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                10. Droit de réclamation
              </h2>
              <p>
                Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la{" "}
                <a
                  href="https://www.cnil.fr/fr/plaintes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline"
                >
                  CNIL (Commission Nationale de l'Informatique et des Libertés)
                </a>.
              </p>
            </div>

            {/* Modifications */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                11. Modifications de la politique
              </h2>
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une nouvelle date de mise à jour.
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
