"use client";

import { motion } from "framer-motion";
import { Check, HelpCircle, Package, ShoppingCart, Store, ChevronDown } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";

const offers = [
  {
    title: "Site Vitrine",
    price: "990€",
    description: "Idéal pour présenter votre activité et être visible localement.",
    icon: <Store className="w-8 h-8 text-blue-400" />,
    features: [
      "Design personnalisé",
      "1 à 5 pages",
      "Responsive (Mobile & Tablette)",
      "Optimisation SEO de base",
      
    ],
    recommended: false,
    color: "blue"
  },
  {
    title: "Pack Pro",
    price: "1490€",
    description: "Une solution complète pour les entreprises qui veulent se démarquer.",
    icon: <Package className="w-8 h-8 text-purple-400" />,
    features: [
      "Tout du pack Vitrine",
      "Jusqu'à 10 pages",
      "Base de données avancée",
      "Google Maps & Avis",
      "SEO Avancé",
      
    ],
    recommended: true,
    color: "purple"
  },
  {
    title: "Personnalisé",
    price: "Devis",
    description: "Vendez vos produits en ligne avec une boutique performante.",
    icon: <ShoppingCart className="w-8 h-8 text-pink-400" />,
    features: [
      "Catalogue produits illimité",
      "Paiement sécurisé (Stripe/Paypal)",
      "Gestion des stocks",
      "Compte client",
      "Support prioritaire"
    ],
    recommended: false,
    color: "pink",
    note: "Jusqu'à 1 500€ d'aide*"
  }
];

const faqs = [
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer: "Pour un site vitrine standard, comptez environ 2 à 3 semaines après réception de tous les éléments (textes, images). Les projets e-commerce ou sur-mesure peuvent prendre 4 à 8 semaines.",
    color: "blue"
  },
  {
    question: "Le site m'appartient-il totalement ?",
    answer: "Absolument. Une fois le paiement effectué, vous êtes propriétaire à 100% de votre site web, du nom de domaine et du code source. Pas de location à vie chez nous.",
    color: "blue"
  },
  {
    question: "Proposez-vous de la maintenance ?",
    answer: "Oui, nous proposons des forfaits de maintenance optionnels pour gérer les mises à jour, la sécurité et les petites modifications mensuelles.",
    color: "blue"
  },
  {
    question: "Comment fonctionne l'aide de l'État ?",
    answer: "La Région Île-de-France propose le \"Chèque Numérique\" qui finance jusqu'à 50% de votre site web (plafond 1 500€).\n\nConditions : Artisans et commerçants franciliens de moins de 20 salariés.\n\nNous vous fournissons un devis éligible et vous accompagnons dans la démarche sur mesdemarches.iledefrance.fr.",
    color: "green"
  },
  {
    question: "Pourquoi pas WordPress ?",
    answer: "WordPress est souvent lent, lourd et nécessite des mises à jour fréquentes. Nous utilisons Next.js, une technologie moderne qui offre des performances exceptionnelles, une sécurité renforcée et un temps de chargement quasi instantané. Votre site sera rapide, moderne et optimisé pour le référencement.",
    color: "blue"
  }
];

export default function ServicesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  return (
    <>
      <Section className="pt-32 pb-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            Nos Offres & Tarifs
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-4">
            Sites modernes et performants. Prix compétitifs grâce à notre profil junior.
          </p>
          <p className="text-lg text-blue-600 dark:text-blue-400 font-semibold">
            💰 Aide de l'État disponible : jusqu'à 50% remboursé pour les artisans et commerçants IDF
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`relative p-8 rounded-2xl border flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                offer.recommended
                  ? "bg-purple-50 dark:bg-white/5 border-purple-500/50 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20"
                  : "bg-neutral-100 dark:bg-neutral-900/50 border-neutral-200 dark:border-white/10 hover:border-neutral-300 dark:hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10"
              }`}
            >
              {offer.recommended && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-base font-medium"
                >
                  Recommandé
                </motion.div>
              )}

              <div className="mb-6">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center mb-6 border transition-transform duration-200 hover:scale-110",
                    offer.color === "blue" && "bg-blue-500/10 border-blue-500/20",
                    offer.color === "purple" && "bg-purple-500/10 border-purple-500/20",
                    offer.color === "pink" && "bg-pink-500/10 border-pink-500/20"
                  )}
                >
                  {offer.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">{offer.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-400 h-12">{offer.description}</p>
              </div>

              <div className="mb-8">
                <span className="text-4xl font-bold text-neutral-900 dark:text-white">{offer.price}</span>
                {offer.price !== "Devis" && <span className="text-neutral-500 dark:text-neutral-500 ml-2">HT</span>}
                {offer.price !== "Devis" && (
                  <p className="text-base text-green-600 dark:text-green-400 mt-2 font-medium">
                    Soit {parseInt(offer.price.replace('€', '')) / 2}€ après aide IDF*
                  </p>
                )}
                {offer.note && (
                  <p className="text-base text-green-600 dark:text-green-400 mt-2 font-medium">
                    {offer.note}
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-base text-neutral-700 dark:text-neutral-300">
                    <Check className={cn(
                      "w-5 h-5 flex-shrink-0",
                      offer.color === "blue" && "text-blue-400",
                      offer.color === "purple" && "text-purple-400",
                      offer.color === "pink" && "text-pink-400"
                    )} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/contact" className="w-full">
                <Button 
                  variant={offer.recommended ? "secondary" : "outline"} 
                  className="w-full"
                >
                  Choisir cette offre
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* FAQ Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-neutral-900 dark:text-white">Questions Fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={cn(
                    "rounded-xl border transition-all duration-200",
                    faq.color === "green"
                      ? "border-green-200 dark:border-green-800/30 bg-green-50 dark:bg-green-950/20"
                      : "border-neutral-200 dark:border-white/10 bg-white dark:bg-black/50"
                  )}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left"
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <HelpCircle className={cn(
                        "w-5 h-5 flex-shrink-0",
                        faq.color === "green" ? "text-green-500" : "text-blue-500"
                      )} />
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                        {faq.question}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-neutral-400 transition-transform duration-200 flex-shrink-0",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-13">
                        <p className="text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </>
  );
}
