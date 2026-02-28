"use client";

import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";

export default function CGSPage() {
  return (
    <>
      <Section className="pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            Conditions Générales de Service (CGS)
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            Les présentes Conditions Générales de Service (CGS) régissent la relation contractuelle entre B2dev et ses clients pour la création de sites web.
          </p>

          <div className="space-y-8 text-neutral-700 dark:text-neutral-300">
            {/* Préambule */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Préambule
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-white/10 space-y-2">
                <p><strong>Prestataire :</strong> B2dev</p>
                <p><strong>SIRET :</strong> 99501585600017</p>
                <p><strong>Email :</strong> <a href="mailto:AmauryAll.b2dev@gmail.com" className="text-teal-600 hover:text-teal-700 dark:hover:text-teal-400">AmauryAll.b2dev@gmail.com</a></p>
                <p><strong>Téléphone :</strong> <a href="tel:+33682510468" className="text-teal-600 hover:text-teal-700 dark:hover:text-teal-400">06 82 51 04 68</a></p>
              </div>
              <p className="mt-4">
                Ces CGS s'appliquent à toute prestation de création de site web fournie par B2dev. L'acceptation d'un devis vaut acceptation sans réserve des présentes conditions.
              </p>
            </div>

            {/* Article 1 - Objet */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 1 - Objet
              </h2>
              <p>
                Les présentes CGS définissent les conditions dans lesquelles B2dev s'engage à concevoir, développer et livrer un site web au Client, conformément au devis accepté.
              </p>
            </div>

            {/* Article 2 - Services proposés */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 2 - Services proposés
              </h2>
              <p className="mb-4">B2dev propose les prestations suivantes :</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800/30">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Site Vitrine</h3>
                  <p className="text-2xl font-bold text-teal-700 dark:text-teal-400 mb-2">990€ HT</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Design personnalisé</li>
                    <li>1 à 5 pages</li>
                    <li>Responsive</li>
                    <li>SEO de base</li>
                  </ul>
                </div>

                <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800/30">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Pack Pro</h3>
                  <p className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">1 490€ HT</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Tout du pack Vitrine</li>
                    <li>Jusqu'à 10 pages</li>
                    <li>Base de données avancée</li>
                    <li>Google Maps & Avis</li>
                    <li>SEO Avancé</li>
                  </ul>
                </div>

                <div className="bg-teal-50 dark:bg-teal-950/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800/30">
                  <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">Personnalisé</h3>
                  <p className="text-2xl font-bold text-teal-500 dark:text-teal-400 mb-2">Sur devis</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Fonctionnalités avancées</li>
                    <li>E-commerce</li>
                    <li>Applications web</li>
                    <li>Paiement en ligne</li>
                  </ul>
                </div>
              </div>

              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-4">
                Note : Les prestations détaillées sont définies dans le devis personnalisé remis au Client.
              </p>
            </div>

            {/* Article 3 - Devis et commande */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 3 - Devis et commande
              </h2>
              <ul className="space-y-3 ml-4 list-disc list-inside">
                <li><strong>Devis gratuit :</strong> Tout devis est établi gratuitement et reste valable 30 jours.</li>
                <li><strong>Acceptation :</strong> Le devis signé et accompagné de l'acompte vaut bon pour accord et début de prestation.</li>
                <li><strong>Modification :</strong> Toute modification substantielle du projet initial pourra faire l'objet d'un devis complémentaire.</li>
              </ul>
            </div>

            {/* Article 4 - Tarifs et modalités de paiement */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 4 - Tarifs et modalités de paiement
              </h2>

              <div className="bg-teal-50 dark:bg-teal-950/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800/30 mb-4">
                <h3 className="font-semibold text-lg mb-3 text-neutral-900 dark:text-white">
                  Modalités de paiement
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                  <li><strong>Acompte :</strong> 50% à la signature du devis (lancement du projet)</li>
                  <li><strong>Solde :</strong> 50% à la livraison du site (mise en ligne)</li>
                </ul>
              </div>

              <p className="mb-3"><strong>Moyens de paiement acceptés :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Virement bancaire</li>
                <li>Chèque</li>
                <li>Espèces (dans la limite légale)</li>
              </ul>

              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Les prix sont exprimés en euros, hors taxes (HT). La TVA applicable sera précisée sur le devis selon le statut de B2dev au moment de la facturation.
              </p>

              <div className="bg-teal-600/10 border border-teal-600/20 rounded-lg p-4 mt-4">
                <p className="font-semibold text-neutral-900 dark:text-white">💰 Aide de l'État (Chèque Numérique IDF)</p>
                <p className="text-sm mt-2">
                  Les artisans et commerçants franciliens de moins de 20 salariés peuvent bénéficier d'une aide jusqu'à 50% du montant du site (plafond 1 500€). B2dev fournit les documents nécessaires à la constitution du dossier.
                </p>
              </div>
            </div>

            {/* Article 5 - Délais de réalisation */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 5 - Délais de réalisation
              </h2>
              <div className="bg-neutral-100 dark:bg-neutral-900/50 p-6 rounded-lg border border-neutral-200 dark:border-white/10 space-y-3">
                <p><strong>Site Vitrine :</strong> 2 à 3 semaines après réception de tous les éléments (textes, images, logo)</p>
                <p><strong>Pack Pro :</strong> 3 à 5 semaines</p>
                <p><strong>Projet personnalisé :</strong> Délai défini dans le devis</p>
              </div>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Ces délais sont indicatifs et peuvent être prolongés en cas de retard de fourniture des éléments par le Client ou de demandes de modifications importantes.
              </p>
            </div>

            {/* Article 6 - Obligations du Client */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 6 - Obligations du Client
              </h2>
              <p className="mb-3">Le Client s'engage à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Fournir tous les éléments nécessaires à la réalisation du site (textes, images, logo, charte graphique, etc.) dans les délais convenus</li>
                <li>Garantir que les contenus fournis ne portent pas atteinte aux droits de tiers (propriété intellectuelle, droit à l'image, etc.)</li>
                <li>Valider les maquettes et livrables dans un délai raisonnable (7 jours ouvrés)</li>
                <li>Effectuer les paiements aux échéances prévues</li>
              </ul>
            </div>

            {/* Article 7 - Obligations de B2dev */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 7 - Obligations de B2dev
              </h2>
              <p className="mb-3">B2dev s'engage à :</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Réaliser le site web conformément au devis et aux spécifications validées</li>
                <li>Respecter les délais de livraison, sauf cas de force majeure ou retard imputable au Client</li>
                <li>Garantir la compatibilité du site avec les principaux navigateurs modernes (Chrome, Firefox, Safari, Edge)</li>
                <li>Assurer la responsivité du site (adaptation mobile et tablette)</li>
                <li>Former le Client à l'utilisation de son site si nécessaire</li>
              </ul>
            </div>

            {/* Article 8 - Propriété intellectuelle */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 8 - Propriété intellectuelle
              </h2>

              <div className="bg-teal-50 dark:bg-teal-950/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800/30 mb-4">
                <h3 className="font-semibold text-lg mb-3 text-neutral-900 dark:text-white">
                  ✓ Transfert de propriété
                </h3>
                <p>
                  <strong>À la fin du projet et après paiement intégral,</strong> le Client devient propriétaire à 100% du code source, du design et de tous les éléments du site web développés par B2dev.
                </p>
              </div>

              <p className="mb-3"><strong>Exceptions :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les frameworks et bibliothèques open-source utilisés (Next.js, React, etc.) restent soumis à leurs licences respectives</li>
                <li>Les contenus fournis par le Client (textes, images, logos) restent la propriété du Client</li>
                <li>B2dev se réserve le droit d'utiliser le site réalisé dans son portfolio, sauf demande contraire écrite du Client</li>
              </ul>
            </div>

            {/* Article 9 - Garantie et maintenance */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 9 - Garantie et maintenance
              </h2>

              <div className="bg-teal-50 dark:bg-teal-950/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800/30 mb-4">
                <h3 className="font-semibold text-lg mb-3 text-neutral-900 dark:text-white">
                  Garantie incluse (3 mois)
                </h3>
                <p>
                  B2dev garantit la correction gratuite des bugs et dysfonctionnements techniques constatés dans les <strong>3 mois suivant la livraison</strong>, à condition qu'ils soient liés au développement initial.
                </p>
              </div>

              <p className="mb-3"><strong>La garantie ne couvre pas :</strong></p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Les modifications demandées par le Client après la livraison</li>
                <li>Les bugs résultant d'une intervention extérieure ou d'une mauvaise utilisation</li>
                <li>Les problèmes liés à l'hébergement ou au nom de domaine</li>
              </ul>

              <p><strong>Maintenance optionnelle :</strong> Des forfaits de maintenance peuvent être proposés séparément pour gérer les mises à jour, la sécurité et les petites modifications.</p>
            </div>

            {/* Article 10 - Hébergement et nom de domaine */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 10 - Hébergement et nom de domaine
              </h2>
              <p className="mb-3">
                <strong>L'hébergement et le nom de domaine ne sont pas inclus dans nos tarifs</strong>, sauf mention contraire dans le devis.
              </p>
              <p className="mb-3">
                B2dev peut conseiller et accompagner le Client dans le choix et la configuration de l'hébergement (recommandation : Netlify, OVH, etc.).
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Note : Le Client reste propriétaire et responsable de son nom de domaine et de son hébergement.
              </p>
            </div>

            {/* Article 11 - Résiliation et annulation */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 11 - Résiliation et annulation
              </h2>
              <ul className="space-y-3 ml-4 list-disc list-inside">
                <li><strong>Annulation par le Client :</strong> En cas d'annulation avant le début des travaux, l'acompte versé reste acquis à B2dev. Si le projet est en cours, le Client devra régler les prestations déjà réalisées au prorata.</li>
                <li><strong>Annulation par B2dev :</strong> B2dev peut annuler le projet en cas de non-respect des obligations du Client (notamment non-paiement ou non-fourniture des éléments). Dans ce cas, les sommes déjà versées restent acquises à B2dev à titre de dédommagement.</li>
              </ul>
            </div>

            {/* Article 12 - Responsabilité */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 12 - Limitation de responsabilité
              </h2>
              <p className="mb-3">
                B2dev s'engage à réaliser le site web avec soin et professionnalisme. Cependant, sa responsabilité ne saurait être engagée pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Les contenus fournis par le Client (textes, images) et leur conformité légale</li>
                <li>Les problèmes liés à l'hébergement, au nom de domaine ou à la bande passante</li>
                <li>Les pertes d'exploitation, manque à gagner ou préjudices indirects</li>
                <li>Les attaques informatiques, piratages ou virus (sauf négligence manifeste de B2dev)</li>
              </ul>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                En tout état de cause, la responsabilité de B2dev est limitée au montant total du devis.
              </p>
            </div>

            {/* Article 13 - Force majeure */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 13 - Force majeure
              </h2>
              <p>
                B2dev ne pourra être tenu responsable en cas d'inexécution de ses obligations résultant d'un événement de force majeure (catastrophe naturelle, guerre, grève, panne informatique majeure, etc.).
              </p>
            </div>

            {/* Article 14 - Protection des données */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 14 - Protection des données personnelles
              </h2>
              <p>
                Les données personnelles collectées dans le cadre de la prestation sont traitées conformément au RGPD. Pour plus d'informations, consultez notre{" "}
                <a href="/politique-confidentialite" className="text-teal-600 hover:text-teal-700 dark:hover:text-teal-400 underline">
                  Politique de Confidentialité
                </a>.
              </p>
            </div>

            {/* Article 15 - Droit applicable */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 15 - Droit applicable et juridiction
              </h2>
              <p className="mb-3">
                Les présentes CGS sont régies par le droit français.
              </p>
              <p>
                En cas de litige, les parties s'efforceront de trouver une solution amiable. À défaut, les tribunaux compétents de Paris seront seuls compétents.
              </p>
            </div>

            {/* Article 16 - Acceptation */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">
                Article 16 - Acceptation des CGS
              </h2>
              <p>
                La signature du devis par le Client vaut acceptation sans réserve des présentes Conditions Générales de Service.
              </p>
            </div>

            {/* Date de mise à jour */}
            <div className="pt-4 border-t border-neutral-200 dark:border-white/10">
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                Dernière mise à jour : Février 2026
              </p>
            </div>
          </div>
        </motion.div>
      </Section>
    </>
  );
}
