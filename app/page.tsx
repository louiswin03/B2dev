"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Code, Layout, Smartphone } from "lucide-react";
import { Button } from "./components/ui/Button";
import { Section } from "./components/ui/Section";
import Link from "next/link";

const features = [
  {
    icon: <Layout className="w-6 h-6 text-blue-400" />,
    title: "Design Moderne",
    description: "Une interface épurée et professionnelle qui met en valeur votre activité."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-purple-400" />,
    title: "100% Responsive",
    description: "Votre site s'adapte parfaitement aux mobiles, tablettes et ordinateurs."
  },
  {
    icon: <Code className="w-6 h-6 text-pink-400" />,
    title: "Performance Maximale",
    description: "Des technologies de pointe (Next.js) pour un chargement instantané."
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-black">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[128px] pointer-events-none" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-neutral-900 dark:text-white">
              Propulsez votre activité <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-600">
                sur le web
              </span>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
              Nous créons des sites web performants et esthétiques pour les artisans, 
              commerçants et PME. L'excellence de l'ingénierie au service de votre business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="group">
                  Démarrer votre projet
                  <motion.div
                    className="inline-block ml-2"
                    animate={{ x: [0, 4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut"
                    }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </Button>
              </Link>
              <Link href="/realisations">
                <Button variant="outline" size="lg">
                  Voir nos réalisations
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-900/50 border-y border-neutral-200 dark:border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-neutral-200 dark:border-white/10 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-2"
            >
              <div className="p-3 bg-neutral-100 dark:bg-white/5 rounded-lg w-fit mb-4 transition-transform duration-200 hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Why Us Section */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              Pourquoi choisir <span className="text-blue-500">DevAgency</span> ?
            </h2>
            <div className="space-y-4">
              {[
                "Expertise technique d'ingénieurs",
                "Design sur-mesure et unique",
                "Accompagnement de A à Z",
                "Optimisation SEO incluse",
                "Tarifs transparents et adaptés"
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.8 }}
                  className="flex items-center gap-3 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                  </motion.div>
                  <span className="text-neutral-700 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/apropos">
                <Button variant="secondary">En savoir plus sur l'équipe</Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="relative h-[400px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-neutral-100 dark:bg-neutral-900"
          >
            {/* Abstract visual representation of code/design */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20" />
            <div className="absolute inset-4 border border-dashed border-neutral-300 dark:border-white/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-neutral-900/10 dark:text-white/10">CODE</div>
                <div className="text-6xl font-bold text-neutral-900/10 dark:text-white/10">DESIGN</div>
                <div className="text-6xl font-bold text-neutral-900/10 dark:text-white/10">BUILD</div>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="py-20">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-900/40 dark:to-purple-900/40 border border-neutral-200 dark:border-white/10 p-8 md:p-16 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">Prêt à lancer votre projet ?</h2>
            <p className="text-neutral-700 dark:text-neutral-300 mb-8">
              Discutons de vos besoins et créons ensemble le site web qui fera décoller votre activité.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-neutral-900 dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 border-none">
                Demander un devis gratuit
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
