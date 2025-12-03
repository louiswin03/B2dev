"use client";

import { motion } from "framer-motion";
import { Section } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Download, GraduationCap, Laptop, User } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <Section className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            L'excellence technique au service de <span className="text-blue-500">votre vision</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Nous sommes deux étudiants en école d'ingénieur passionnés par le développement web.
            Notre mission : rendre le web accessible et performant pour tous les professionnels.
          </p>
        </motion.div>
      </Section>

      <Section className="bg-neutral-50 dark:bg-neutral-900/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Profile 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 flex items-center justify-center border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors">
              <User className="w-10 h-10 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Alexandre</h3>
            <p className="text-blue-500 dark:text-blue-400 font-medium mb-4">Lead Developer & Architecte</p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Étudiant en génie logiciel, expert en React et Node.js. Passionné par l'architecture logicielle propre et les performances web.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["React", "Next.js", "TypeScript", "Node.js"].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-sm border border-blue-500/20">
                  {skill}
                </span>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Télécharger CV
            </Button>
          </motion.div>

          {/* Profile 2 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-white/10 hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 flex items-center justify-center border-2 border-purple-500/30 group-hover:border-purple-500 transition-colors">
              <User className="w-10 h-10 text-purple-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Thomas</h3>
            <p className="text-purple-500 dark:text-purple-400 font-medium mb-4">UX/UI Designer & Frontend</p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Étudiant en ingénierie numérique, spécialisé dans l'expérience utilisateur et le design interactif. Il donne vie aux interfaces.
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {["Figma", "Tailwind", "Motion", "UX Design"].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-300 text-sm border border-purple-500/20">
                  {skill}
                </span>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              <Download className="w-4 h-4 mr-2" />
              Télécharger CV
            </Button>
          </motion.div>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-white">Notre Parcours</h2>
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1 w-px bg-neutral-300 dark:bg-white/10 my-2" />
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">École d'Ingénieur</h3>
                <p className="text-neutral-500 dark:text-neutral-500 text-sm mb-2">2021 - Présent</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Formation rigoureuse en informatique, mathématiques et gestion de projet. 
                  Apprentissage des meilleures pratiques de développement.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 dark:text-purple-400">
                  <Laptop className="w-5 h-5" />
                </div>
                <div className="flex-1 w-px bg-neutral-300 dark:bg-white/10 my-2" />
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Lancement de DevAgency</h3>
                <p className="text-neutral-500 dark:text-neutral-500 text-sm mb-2">2024</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Décision de mettre nos compétences au service des entreprises locales pour financer nos études et gagner en expérience réelle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
