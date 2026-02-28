"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Section } from "../components/ui/Section";
import { GraduationCap, Laptop, User, Briefcase, Linkedin } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <>
      <Section className="pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">
            L'excellence technique au service de <span className="text-teal-600">votre vision</span>
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Nous sommes deux jeunes ingénieurs passionnés par le développement web.            
          </p>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">          
            Notre mission : permettre aux petites et moyennes entreprises de se démarquer par une présence digitale forte.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:items-stretch">
          {/* Profile 1 */}
          {isMobile ? (
            <div className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className="group relative h-full p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-white/10 transition-all duration-300 flex flex-col"
              >
            <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 border-2 border-teal-600/30 group-hover:border-teal-600 transition-colors overflow-hidden relative">
              <Image
                src="/images/louis.jpg"
                alt="Louis"
                fill
                className="object-cover"
                style={{ transform: 'scale(2.0)', objectPosition: 'center 20%' }}
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Louis</h3>
            <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">CTO & Architecte Technique</p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
              Louis utilise les technologies les plus efficaces du marché pour que votre site soit ultra-performant et durable.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {["Vitesse", "Référencement", "Architecture", "Optimisation"].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-teal-600/10 text-teal-700 dark:text-teal-300 text-base border border-teal-600/20">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/louis-winkelmuller-29a475256/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-colors text-base font-medium"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              
            </div>
            </motion.div>
          </div>
          ) : (
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
              gyroscope={true}
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                className="group relative h-full p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-white/10 hover:border-teal-600/50 transition-all duration-300 flex flex-col"
              >
              <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 border-2 border-teal-600/30 group-hover:border-teal-600 transition-colors overflow-hidden relative">
                <Image
                  src="/images/louis.jpg"
                  alt="Louis"
                  fill
                  className="object-cover"
                  style={{ transform: 'scale(2.0)', objectPosition: 'center 20%' }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Louis</h3>
              <p className="text-teal-600 dark:text-teal-400 font-medium mb-4">CTO & Architecte Technique</p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                Louis utilise les technologies les plus efficaces du marché pour que votre site soit ultra-performant et durable.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {["Vitesse", "Référencement", "Architecture", "Optimisation"].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-teal-600/10 text-teal-700 dark:text-teal-300 text-base border border-teal-600/20">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/louis-winkelmuller-29a475256/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white transition-colors text-base font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
              </motion.div>
            </Tilt>
          )}

          {/* Profile 2 */}
          {isMobile ? (
            <div className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="group relative h-full p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-white/10 transition-all duration-300 flex flex-col"
              >
            <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 border-2 border-teal-500/30 group-hover:border-teal-500 transition-colors overflow-hidden relative">
              <Image
                src="/images/amaury.jpg"
                alt="Amaury"
                fill
                className="object-cover"
                style={{ transform: 'scale(2.5) translateY(6%)' }}
              />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Amaury</h3>
            <p className="text-teal-500 dark:text-teal-400 font-medium mb-4">Chef de Projet & Designer UX</p>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
              Amaury transforme vos besoins en une expérience utilisateur élégante et optimisée pour convertir vos visiteurs en clients.
            </p>
            <div className="flex flex-wrap gap-2 mb-6 mt-auto">
              {["Design", "Relation Client", "Stratégie", "Conversion"].map((skill) => (
                <span key={skill} className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 text-base border border-teal-500/20">
                  {skill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/amaury-allemand/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-base font-medium"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
            </motion.div>
          </div>
          ) : (
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
              gyroscope={true}
              className="h-full"
            >
              <motion.div
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 1, x: 0 }}
                className="group relative h-full p-8 rounded-2xl bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-900 dark:to-black border border-neutral-200 dark:border-white/10 hover:border-teal-500/50 transition-all duration-300 flex flex-col"
              >
              <div className="w-24 h-24 rounded-full bg-neutral-200 dark:bg-neutral-800 mb-6 border-2 border-teal-500/30 group-hover:border-teal-500 transition-colors overflow-hidden relative">
                <Image
                  src="/images/amaury.jpg"
                  alt="Amaury"
                  fill
                  className="object-cover"
                  style={{ transform: 'scale(2.5) translateY(6%)' }}
                />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-white">Amaury</h3>
              <p className="text-teal-500 dark:text-teal-400 font-medium mb-4">Chef de Projet & Designer UX</p>
              <p className="text-neutral-600 dark:text-neutral-400 mb-6 flex-grow">
                Amaury transforme vos besoins en une expérience utilisateur élégante et optimisée pour convertir vos visiteurs en clients.
              </p>
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {["Design", "Relation Client", "Stratégie", "Conversion"].map((skill) => (
                  <span key={skill} className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-300 text-base border border-teal-500/20">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.linkedin.com/in/amaury-allemand/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition-colors text-base font-medium"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
              </motion.div>
            </Tilt>
          )}
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-white">Notre Parcours</h2>
          <div className="space-y-8">
            {/* ISEP */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-600/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="flex-1 w-px bg-neutral-300 dark:bg-white/10 my-2" />
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">École d'Ingénieurs ISEP</h3>
                <p className="text-neutral-500 dark:text-neutral-500 text-base mb-2">2021 - Présent</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Formation rigoureuse en informatique, mathématiques et gestion de projet.
                  Apprentissage des meilleures pratiques de développement.
                </p>
              </div>
            </div>

            {/* Expériences Professionnelles 2024 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 dark:text-teal-400">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div className="flex-1 w-px bg-neutral-300 dark:bg-white/10 my-2" />
              </div>
              <div className="pb-8 flex-1">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Expériences Professionnelles (alternances)</h3>
                <p className="text-neutral-500 dark:text-neutral-500 text-base mb-6">2024</p>

                {/* Two columns layout */}
                <div className="grid md:grid-cols-2 gap-8 relative">
                  {/* Vertical divider for desktop */}
                  <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-300 dark:bg-white/10 -translate-x-1/2" />

                  {/* Circana - Louis */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="relative p-6 rounded-xl bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/20 dark:to-neutral-900/50 border border-teal-200 dark:border-teal-800/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-teal-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">Louis</h4>
                        <p className="text-base text-teal-600 dark:text-teal-400">Data Scientist</p>
                      </div>
                    </div>
                    <h5 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">Circana</h5>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base">
                      Analyse de données et développement de process pour automatiser les travaux de l'équipe statistique 
                    </p>
                  </motion.div>

                  {/* Safran - Amaury */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="relative p-6 rounded-xl bg-gradient-to-br from-teal-50 to-white dark:from-teal-950/20 dark:to-neutral-900/50 border border-teal-200 dark:border-teal-800/30"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-teal-500/20 flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-teal-500" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 dark:text-white">Amaury</h4>
                        <p className="text-base text-teal-500 dark:text-teal-400">Business Analyst</p>
                      </div>
                    </div>
                    <h5 className="font-bold text-lg mb-2 text-neutral-900 dark:text-white">Safran</h5>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base">
                      Optimisation de la stratégie commerciale par le biais des données. 
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* B2dev */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-500 dark:text-teal-400">
                  <Laptop className="w-5 h-5" />
                </div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white">Lancement de B2dev</h3>
                <p className="text-neutral-500 dark:text-neutral-500 text-base mb-2">2025</p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Décision de mettre nos compétences au service des entreprises locales pour gagner en expérience réelle et travailler dans un secteur qui nous passionne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
