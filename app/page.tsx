"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Euro, Building2, TrendingDown } from "lucide-react";
import { Button } from "./components/ui/Button";
import { Section } from "./components/ui/Section";
import { CardWithBlob } from "./components/CardWithBlob";
import Link from "next/link";
import { BlurRevealText } from "./components/BlurRevealText";
import { useRef, useState, useEffect } from "react";

// Composant simple pour mobile (sans animation)
function SimpleCodeLine({ number, indent, parts, delay = 0 }: { number: string; indent: boolean; parts: { text: string; color: string }[]; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className={`font-mono text-sm flex items-center gap-2 ${indent ? 'pl-6' : ''}`}
    >
      <span className="text-neutral-500">{number}</span>
      <span>
        {parts.map((part, i) => (
          <span key={i} className={part.color}>{part.text}</span>
        ))}
      </span>
    </motion.div>
  );
}

// Composant pour une ligne de code avec animation basée sur le scroll
function CodeLine({
  number,
  progress,
  opacity,
  indent,
  parts,
  showCursor = false
}: {
  number: string;
  progress: any;
  opacity: any;
  indent: boolean;
  parts: { text: string; color: string }[];
  showCursor?: boolean;
}) {
  const fullText = parts.map(p => p.text).join('');
  const displayedLength = useTransform(progress, (val: number) => Math.floor(val * fullText.length));
  
  // Créer un tableau de caractères avec leurs couleurs
  const characters: { char: string; color: string }[] = [];
  parts.forEach(part => {
    for (let i = 0; i < part.text.length; i++) {
      characters.push({ char: part.text[i], color: part.color });
    }
  });
  
  // Créer les opacités pour chaque caractère en dehors de la boucle
  const characterOpacities = characters.map((_, index) => 
    useTransform(displayedLength, (len: number) => len > index ? 1 : 0)
  );
  
  return (
    <motion.div
      style={{ opacity }}
      className={`font-mono text-sm md:text-base flex items-center gap-2 ${indent ? 'pl-6' : ''}`}
    >
      <span className="text-neutral-500">{number}</span>
      <motion.span className="flex items-center gap-0">
        {characters.map((charData, index) => {
          return (
            <motion.span
              key={index}
              className={charData.color}
              style={{
                opacity: characterOpacities[index]
              }}
            >
              {charData.char}
            </motion.span>
          );
        })}
      </motion.span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          className="inline-block w-2 h-4 bg-blue-400 ml-1"
          style={{ opacity: useTransform(opacity, (val: number) => val > 0.5 ? 1 : 0) }}
        />
      )}
    </motion.div>
  );
}

export default function Home() {
  const codeSectionRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: isMounted ? codeSectionRef : undefined,
    offset: ["start 0.8", "end 0.4"]
  });

  // Créer des valeurs de progression pour chaque ligne (0 à 1) - Intervalles plus larges pour animation plus lente
  const line1Progress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const line2Progress = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const line3Progress = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const line4Progress = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const line5Progress = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const line6Progress = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  // Opacité pour chaque ligne
  // Toutes les lignes s'affichent progressivement, mais les lignes du haut restent visibles une fois affichées
  const line1Opacity = useTransform(scrollYProgress, (val) => {
    if (val >= 0.15) return 1; // Reste visible une fois affichée (ne s'efface jamais)
    if (val > 0) return val / 0.15; // Apparaît progressivement
    return 0;
  });
  const line2Opacity = useTransform(scrollYProgress, (val) => {
    if (val >= 0.3) return 1; // Reste visible une fois affichée (ne s'efface jamais)
    if (val >= 0.15) return (val - 0.15) / 0.15; // Apparaît progressivement
    return 0;
  });
  const line3Opacity = useTransform(scrollYProgress, (val) => {
    if (val >= 0.45) return 1; // Reste visible une fois affichée (ne s'efface jamais)
    if (val >= 0.3) return (val - 0.3) / 0.15; // Apparaît progressivement
    return 0;
  });
  // Les lignes du bas apparaissent progressivement et peuvent disparaître en remontant
  // Mais restent visibles une fois qu'on arrive en bas (après 0.9)
  const line4Opacity = useTransform(scrollYProgress, (val) => {
    if (val >= 0.9) return 1; // Reste visible en bas
    if (val >= 0.45 && val <= 0.6) return (val - 0.45) / 0.15; // Apparaît
    if (val > 0.6 && val < 0.75) return 1; // Reste visible
    if (val >= 0.75 && val < 0.9) return 1 - (val - 0.75) / 0.15; // Disparaît en remontant
    return 0;
  });
  const line5Opacity = useTransform(scrollYProgress, (val) => {
    if (val >= 0.9) return 1; // Reste visible en bas
    if (val >= 0.6 && val <= 0.75) return (val - 0.6) / 0.15; // Apparaît
    if (val > 0.75 && val < 0.9) return 1; // Reste visible
    return 0;
  });
  const line6Opacity = useTransform(scrollYProgress, (val) => {
    if (val >= 0.9) return 1; // Reste visible en bas
    if (val >= 0.75 && val <= 0.9) return (val - 0.75) / 0.15; // Apparaît
    return 0;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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
              <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                <BlurRevealText text="Propulsez" delay={0} />
                <BlurRevealText text="votre" delay={120} />
                <BlurRevealText text="activité" delay={240} />
              </div>
              <div className="mt-2">
                <BlurRevealText
                  text="sur le web"
                  delay={360}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-400 dark:to-purple-600"
                />
              </div>
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-10">
              Des sites web modernes et ultra-performants  pour les artisans
              et commerçants. Qualité professionnelle à prix abordable.
            </p>
            <p className="text-lg text-blue-600 dark:text-blue-400 max-w-2xl mx-auto mb-10 font-semibold">
              💰 Jusqu'à 50% de votre site financé par la Région Île-de-France
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

      {/* Why Us Section */}
      <Section>
        <div ref={isMounted ? codeSectionRef : null} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: isMobile ? 0.3 : 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-neutral-900 dark:text-white">
              Pourquoi choisir <span className="text-blue-500">B2dev</span> ?
            </h2>
            <div className="space-y-4">
              {[
                "Sites modernes et performants",
                "Prix très compétitifs (profil junior)",
                "Design sur-mesure et professionnel",

              ].map((item, i) => (
                isMobile ? (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {item}
                    </span>
                  </div>
                ) : (
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
                )
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Link href="/apropos">
                <Button variant="secondary">En savoir plus sur l'équipe</Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[600px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/10 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 dark:from-black dark:via-neutral-900 dark:to-black"
          >
            {/* Grid pattern background - désactivé sur mobile */}
            {!isMobile && <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />}

            {/* Gradient overlays - simplifiés sur mobile */}
            {!isMobile && (
              <>
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
              </>
            )}

            {/* Real code lines with scroll-based animation - version simplifiée sur mobile */}
            <div className="relative h-full flex flex-col items-start justify-center gap-3 px-8 md:px-12 text-left w-full">
              {isMobile ? (
                <>
                  <SimpleCodeLine number="01" indent={false} delay={0} parts={[
                    { text: "const", color: "text-purple-400" },
                    { text: " ", color: "text-white" },
                    { text: "createWebsite", color: "text-blue-300" },
                    { text: " ", color: "text-white" },
                    { text: "=", color: "text-white" },
                    { text: " ", color: "text-white" },
                    { text: "()", color: "text-yellow-300" },
                    { text: " ", color: "text-white" },
                    { text: "=>", color: "text-purple-400" },
                    { text: " ", color: "text-white" },
                    { text: "{", color: "text-yellow-300" }
                  ]} />
                  <SimpleCodeLine number="02" indent={true} delay={0.05} parts={[
                    { text: "const", color: "text-purple-400" },
                    { text: " ", color: "text-white" },
                    { text: "design", color: "text-blue-300" },
                    { text: " ", color: "text-white" },
                    { text: "=", color: "text-white" },
                    { text: " ", color: "text-white" },
                    { text: "useModernUI", color: "text-green-300" },
                    { text: "()", color: "text-yellow-300" },
                    { text: ";", color: "text-neutral-500" }
                  ]} />
                  <SimpleCodeLine number="03" indent={true} delay={0.1} parts={[
                    { text: "const", color: "text-purple-400" },
                    { text: " ", color: "text-white" },
                    { text: "code", color: "text-blue-300" },
                    { text: " ", color: "text-white" },
                    { text: "=", color: "text-white" },
                    { text: " ", color: "text-white" },
                    { text: "writeCleanCode", color: "text-green-300" },
                    { text: "(", color: "text-yellow-300" },
                    { text: "design", color: "text-orange-300" },
                    { text: ")", color: "text-yellow-300" },
                    { text: ";", color: "text-neutral-500" }
                  ]} />
                  <SimpleCodeLine number="04" indent={true} delay={0.15} parts={[
                    { text: "//", color: "text-neutral-500" },
                    { text: " ", color: "text-white" },
                    { text: "Optimisation & déploiement", color: "text-neutral-400 italic" }
                  ]} />
                  <SimpleCodeLine number="05" indent={true} delay={0.2} parts={[
                    { text: "return", color: "text-purple-400" },
                    { text: " ", color: "text-white" },
                    { text: "deploy", color: "text-green-300" },
                    { text: "(", color: "text-yellow-300" },
                    { text: "code", color: "text-orange-300" },
                    { text: ")", color: "text-yellow-300" },
                    { text: ";", color: "text-neutral-500" }
                  ]} />
                  <SimpleCodeLine number="06" indent={false} delay={0.25} parts={[
                    { text: "}", color: "text-yellow-300" },
                    { text: ";", color: "text-neutral-500" }
                  ]} />
                </>
              ) : (
                <>
                  {/* Line 1 */}
                  <CodeLine
                    number="01"
                    progress={line1Progress}
                    opacity={line1Opacity}
                    indent={false}
                    parts={[
                      { text: "const", color: "text-purple-400" },
                      { text: " ", color: "text-white" },
                      { text: "createWebsite", color: "text-blue-300" },
                      { text: " ", color: "text-white" },
                      { text: "=", color: "text-white" },
                      { text: " ", color: "text-white" },
                      { text: "()", color: "text-yellow-300" },
                      { text: " ", color: "text-white" },
                      { text: "=>", color: "text-purple-400" },
                      { text: " ", color: "text-white" },
                      { text: "{", color: "text-yellow-300" }
                    ]}
                  />

                  {/* Line 2 */}
                  <CodeLine
                    number="02"
                    progress={line2Progress}
                    opacity={line2Opacity}
                    indent={true}
                    parts={[
                      { text: "const", color: "text-purple-400" },
                      { text: " ", color: "text-white" },
                      { text: "design", color: "text-blue-300" },
                      { text: " ", color: "text-white" },
                      { text: "=", color: "text-white" },
                      { text: " ", color: "text-white" },
                      { text: "useModernUI", color: "text-green-300" },
                      { text: "()", color: "text-yellow-300" },
                      { text: ";", color: "text-neutral-500" }
                    ]}
                  />

                  {/* Line 3 */}
                  <CodeLine
                    number="03"
                    progress={line3Progress}
                    opacity={line3Opacity}
                    indent={true}
                    parts={[
                      { text: "const", color: "text-purple-400" },
                      { text: " ", color: "text-white" },
                      { text: "code", color: "text-blue-300" },
                      { text: " ", color: "text-white" },
                      { text: "=", color: "text-white" },
                      { text: " ", color: "text-white" },
                      { text: "writeCleanCode", color: "text-green-300" },
                      { text: "(", color: "text-yellow-300" },
                      { text: "design", color: "text-orange-300" },
                      { text: ")", color: "text-yellow-300" },
                      { text: ";", color: "text-neutral-500" }
                    ]}
                  />

                  {/* Line 4 */}
                  <CodeLine
                    number="04"
                    progress={line4Progress}
                    opacity={line4Opacity}
                    indent={true}
                    parts={[
                      { text: "//", color: "text-neutral-500" },
                      { text: " ", color: "text-white" },
                      { text: "Optimisation & déploiement", color: "text-neutral-400 italic" }
                    ]}
                  />

                  {/* Line 5 */}
                  <CodeLine
                    number="05"
                    progress={line5Progress}
                    opacity={line5Opacity}
                    indent={true}
                    parts={[
                      { text: "return", color: "text-purple-400" },
                      { text: " ", color: "text-white" },
                      { text: "deploy", color: "text-green-300" },
                      { text: "(", color: "text-yellow-300" },
                      { text: "code", color: "text-orange-300" },
                      { text: ")", color: "text-yellow-300" },
                      { text: ";", color: "text-neutral-500" }
                    ]}
                  />

                  {/* Line 6 */}
                  <CodeLine
                    number="06"
                    progress={line6Progress}
                    opacity={line6Opacity}
                    indent={false}
                    showCursor={true}
                    parts={[
                      { text: "}", color: "text-yellow-300" },
                      { text: ";", color: "text-neutral-500" }
                    ]}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Process Section removed per request */}

      {/* State Aid Section */}
      <Section className="bg-neutral-50 dark:bg-neutral-900/30">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-white">
              Votre site web <span className="text-blue-500">financé jusqu'à 50%</span>
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-400">
              Grâce au Chèque Numérique de la Région Île-de-France
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <CardWithBlob className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.1, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4">
                  <Euro className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Jusqu'à 1 500€</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  La Région prend en charge 50% du montant HT de votre site web
                </p>
              </motion.div>
            </CardWithBlob>

            <CardWithBlob className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Pour qui ?</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Artisans et commerçants d'Île-de-France de moins de 20 salariés
                </p>
              </motion.div>
            </CardWithBlob>

            <CardWithBlob className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-neutral-900 dark:text-white">Exemple concret</h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  Site à 1 800€ HT = vous payez seulement 900€ après aide
                </p>
              </motion.div>
            </CardWithBlob>
          </div>

          <CardWithBlob className="p-8 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-neutral-900 dark:text-white">Comment ça marche ?</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">Nous créons votre site</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Développement optimisé et performant</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">Vous recevez un devis détaillé</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Parfaitement éligible au Chèque Numérique</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">Vous déposez le dossier</p>
                    <p className="text-neutral-600 dark:text-neutral-400">Sur mesdemarches.iledefrance.fr </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-white">Vous êtes remboursé</p>
                    <p className="text-neutral-600 dark:text-neutral-400">50% du montant HT après présentation de la facture acquittée</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </CardWithBlob>
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
