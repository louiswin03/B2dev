"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, Euro, Building2, TrendingDown, Code2, Palette, Rocket, Headphones, CheckCircle2 } from "lucide-react";
import { Button } from "./components/ui/Button";
import Link from "next/link";
import { CardWithBlob } from "./components/CardWithBlob";
import { useRef, useEffect, useState } from "react";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        const duration = 2000;
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const CODE_LINES = [
  { number: "01", indent: false, parts: [
    { text: "const ", color: "text-teal-400" },
    { text: "createWebsite", color: "text-amber-300 font-semibold" },
    { text: " = () => {", color: "text-white/50" },
  ]},
  { number: "02", indent: true, parts: [
    { text: "const ", color: "text-teal-400" },
    { text: "design", color: "text-white/90" },
    { text: " = ", color: "text-white/50" },
    { text: "useModernUI", color: "text-amber-300 font-semibold" },
    { text: "();", color: "text-white/50" },
  ]},
  { number: "03", indent: true, parts: [
    { text: "const ", color: "text-teal-400" },
    { text: "code", color: "text-white/90" },
    { text: " = ", color: "text-white/50" },
    { text: "writeCleanCode", color: "text-amber-300 font-semibold" },
    { text: "(", color: "text-white/50" },
    { text: "design", color: "text-white/90" },
    { text: ");", color: "text-white/50" },
  ]},
  { number: "04", indent: true, parts: [
    { text: "// Optimisation & déploiement", color: "text-white/30 italic" },
  ]},
  { number: "05", indent: true, parts: [
    { text: "return ", color: "text-teal-400" },
    { text: "deploy", color: "text-amber-300 font-semibold" },
    { text: "(", color: "text-white/50" },
    { text: "code", color: "text-white/90" },
    { text: ");", color: "text-white/50" },
  ]},
  { number: "06", indent: false, parts: [
    { text: "};", color: "text-white/50" },
  ]},
];

// Mobile: simple whileInView fade-in
function SimpleCodeLine({ number, indent, parts, delay = 0 }: {
  number: string; indent: boolean; parts: { text: string; color: string }[]; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center"
    >
      <span className="w-8 text-right mr-6 text-white/20 select-none flex-shrink-0">{number}</span>
      <span className={`whitespace-nowrap ${indent ? 'pl-6' : ''}`}>
        {parts.map((part, i) => (
          <span key={i} className={part.color}>{part.text}</span>
        ))}
      </span>
    </motion.div>
  );
}

// Desktop: scroll-based typing animation using clipPath reveal
function ScrollCodeLine({ number, progress, opacity, indent, parts, showCursor = false }: {
  number: string;
  progress: MotionValue<number>;
  opacity: MotionValue<number>;
  indent: boolean;
  parts: { text: string; color: string }[];
  showCursor?: boolean;
}) {
  const clipPercent = useTransform(progress, [0, 1], [100, 0]);
  const clipPath = useTransform(clipPercent, (v: number) => `inset(0 ${v}% 0 0)`);

  return (
    <motion.div style={{ opacity }} className="flex items-center">
      <span className="w-8 text-right mr-6 text-white/20 select-none flex-shrink-0">{number}</span>
      <motion.span style={{ clipPath }} className={`whitespace-nowrap ${indent ? 'pl-6' : ''}`}>
        {parts.map((part, i) => (
          <span key={i} className={part.color}>{part.text}</span>
        ))}
      </motion.span>
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="inline-block w-[2px] h-5 bg-teal-400 ml-0.5"
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

  // Progress for each line's typing animation (character reveal)
  const line1Progress = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const line2Progress = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const line3Progress = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const line4Progress = useTransform(scrollYProgress, [0.45, 0.6], [0, 1]);
  const line5Progress = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);
  const line6Progress = useTransform(scrollYProgress, [0.75, 0.9], [0, 1]);

  // Opacity for each line (fade in and stay visible)
  const line1Opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.15, 0.2], [0, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
  const line4Opacity = useTransform(scrollYProgress, [0.45, 0.5], [0, 1]);
  const line5Opacity = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);
  const line6Opacity = useTransform(scrollYProgress, [0.75, 0.8], [0, 1]);

  const lineProgresses = [line1Progress, line2Progress, line3Progress, line4Progress, line5Progress, line6Progress];
  const lineOpacities = [line1Opacity, line2Opacity, line3Opacity, line4Opacity, line5Opacity, line6Opacity];

  return (
    <div className="grain-overlay">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 overflow-hidden section-divider">
        <div className="absolute inset-0 dot-grid pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="animate-orbit"><div className="w-2 h-2 rounded-full bg-teal-500/30 dark:bg-teal-400/20" /></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="animate-orbit" style={{ animationDuration: "25s", animationDelay: "-7s" }}><div className="w-1.5 h-1.5 rounded-full bg-teal-400/20 dark:bg-teal-300/15" /></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-[0.06] dark:opacity-[0.04] pointer-events-none">
          <svg width="900" height="900" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.7,-64.1C55.9,-58.5,67.6,-48.7,75.4,-36.2C83.2,-23.7,87.1,-8.5,84.9,5.7C82.7,19.9,74.5,33.1,64.2,44.7C53.9,56.3,41.5,66.3,27.5,71.1C13.5,75.8,-2.1,75.3,-17,70.9C-31.9,66.5,-46,58.3,-57.4,47.3C-68.8,36.3,-77.5,22.5,-80.4,7.6C-83.3,-7.4,-80.4,-23.5,-73.2,-37.1C-66,-50.7,-54.5,-61.8,-41.2,-67.2C-27.9,-72.6,-13.9,-72.3,0,-72.3C13.9,-72.3,29.5,-69.7,42.7,-64.1Z" fill="currentColor" className="text-teal-500" transform="translate(100 100)" />
          </svg>
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border font-science-gothic text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/30 border-teal-200 dark:border-teal-800/50"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
            Agence de Développement Web
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
            className="text-5xl md:text-8xl font-bold font-tasa leading-[1.05] mb-8 tracking-tight"
          >
            Propulsez votre
            <br />
            <span className="text-gradient">{"activité sur le web"}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-12 text-muted-foreground"
          >
            {"Sites modernes et ultra-performants pour les artisans et commerçants d’Île-de-France. Qualité professionnelle, prix compétitifs."}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/contact">
              <Button size="lg" className="group text-base px-8 py-4">
                {"Démarrer votre projet"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/realisations">
              <Button variant="outline" size="lg" className="text-base px-8 py-4">
                {"Voir nos réalisations"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-16 px-6 section-divider bg-teal-800 dark:bg-teal-950/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { value: 4, suffix: "+", label: "Projets livrés" },
              { value: 100, suffix: "%", label: "Clients satisfaits" },
              { value: 14, suffix: " jours", label: "Délai moyen" },
              { value: 50, suffix: "%", label: "Aide possible*" },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-tasa text-white mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-teal-100/70 text-sm font-medium tracking-wide uppercase">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Bento Grid - What We Do */}
      <section className="py-28 px-6 section-divider bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div {...fadeInUp} className="mb-16 text-center">
            <div className="accent-line mb-6 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold font-tasa mb-4">{"Ce que nous faisons"}</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">{"De l’idée au lancement, nous gérons chaque étape de votre projet digital."}</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
            {/* Large card - Design */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0 }}
              className="md:col-span-4 p-8 md:p-10 rounded-2xl bg-card border border-border bento-item relative overflow-hidden min-h-[220px] flex flex-col justify-between"
            >
              <div>
                <Palette className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-2xl font-bold font-tasa mb-2">Design Sur-Mesure</h3>
                <p className="text-muted-foreground max-w-md">{"Maquettes détaillées, identité visuelle cohérente, et une expérience utilisateur pensée pour convertir."}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-teal-100/50 dark:from-teal-900/20 to-transparent rounded-tl-[60px] pointer-events-none" />
            </motion.div>

            {/* Small card - Code */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}
              className="md:col-span-2 p-8 rounded-2xl bg-teal-800 dark:bg-teal-900 text-white bento-item min-h-[220px] flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <Code2 className="w-8 h-8 text-teal-200 mb-4" />
                <h3 className="text-2xl font-bold font-tasa mb-2">Code Propre</h3>
                <p className="text-teal-100/70">{"React, Next.js, TypeScript. Performant et maintenable."}</p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-teal-600/30 rounded-full pointer-events-none" />
              <div className="absolute -bottom-8 -right-8 w-40 h-40 border border-teal-600/15 rounded-full pointer-events-none" />
            </motion.div>

            {/* Small card - Deploy */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}
              className="md:col-span-2 p-8 rounded-2xl bg-card border border-border bento-item min-h-[220px] flex flex-col justify-between"
            >
              <div>
                <Rocket className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-xl font-bold font-tasa mb-2">{"Déploiement Rapide"}</h3>
                <p className="text-muted-foreground text-sm">{"Mise en ligne rapide. Hébergement optimisé, SSL, et performances maximales."}</p>
              </div>
            </motion.div>

            {/* Large card - Support */}
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }}
              className="md:col-span-4 p-8 md:p-10 rounded-2xl bg-card border border-border bento-item min-h-[220px] flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <Headphones className="w-8 h-8 text-teal-600 dark:text-teal-400 mb-4" />
                <h3 className="text-2xl font-bold font-tasa mb-2">Accompagnement Humain</h3>
                <p className="text-muted-foreground max-w-md">{"Un interlocuteur dédié de A à Z. On propose un vrai échange pour comprendre vos besoins."}</p>
              </div>
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-teal-100/30 dark:from-teal-900/10 to-transparent rounded-tl-[60px] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why B2dev - Code Section */}
      <section className="py-28 px-6 section-divider">
        <div className="max-w-6xl mx-auto">
          <div ref={isMounted ? codeSectionRef : null} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Content */}
            <motion.div {...fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold font-tasa mb-8">
                {"Pourquoi choisir "}
                <span className="text-teal-700 dark:text-teal-400">B2dev</span>
                {" ?"}
              </h2>
              <div className="space-y-5 mb-10">
                {[
                  "Sites modernes et performants",
                  "Prix très compétitifs (profil junior)",
                  "Design sur-mesure et professionnel",
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
              <Link href="/apropos">
                <Button size="lg" className="group text-base">
                  {"En savoir plus sur l'équipe"}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Right - Animated Code Block */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden bg-[#0d1117] border border-white/[0.06] shadow-2xl"
            >
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/[0.06]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                <span className="ml-3 text-xs text-white/30 font-mono">b2dev.tsx</span>
              </div>
              <div className="p-6 md:p-8 font-mono text-sm md:text-base leading-[2.2]">
                {isMobile ? (
                  CODE_LINES.map((line, i) => (
                    <SimpleCodeLine key={i} number={line.number} indent={line.indent} delay={0.3 + i * 0.08} parts={line.parts} />
                  ))
                ) : (
                  CODE_LINES.map((line, i) => (
                    <ScrollCodeLine key={i} number={line.number} indent={line.indent} progress={lineProgresses[i]} opacity={lineOpacities[i]} parts={line.parts} showCursor={i === 5} />
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* State Aid Section */}
      <section className="py-24 px-6 section-divider">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp} className="text-center mb-14">
            <div className="accent-line mb-6 mx-auto" />
            <h2 className="text-3xl md:text-5xl font-bold font-tasa mb-4">
              {"Votre site web "}
              <span className="text-teal-700 dark:text-teal-400">{"financé jusqu’à 50%*"}</span>
            </h2>
            <p className="text-xl text-muted-foreground">{"Grâce au Chèque Numérique de la Région Île-de-France"}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <CardWithBlob className="p-6 rounded-xl bg-card border border-border">
              <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.1 }}>
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                  <Euro className="w-6 h-6 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{"Jusqu’à 1 500 €"}</h3>
                <p className="text-muted-foreground">{"Jusqu’à 50% du montant HT pris en charge*"}</p>
              </motion.div>
            </CardWithBlob>

            <CardWithBlob className="p-6 rounded-xl bg-card border border-border">
              <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.2 }}>
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{"Pour qui ?"}</h3>
                <p className="text-muted-foreground">{"Artisans et commerçants d’Île-de-France de moins de 20 salariés"}</p>
              </motion.div>
            </CardWithBlob>

            <CardWithBlob className="p-6 rounded-xl bg-card border border-border">
              <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.3 }}>
                <div className="w-12 h-12 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4">
                  <TrendingDown className="w-6 h-6 text-teal-700 dark:text-teal-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exemple concret</h3>
                <p className="text-muted-foreground">{"Site à 1 800 € HT → 900 € après aide*"}</p>
              </motion.div>
            </CardWithBlob>
          </div>

          <CardWithBlob className="p-8 rounded-xl bg-card border border-border">
            <motion.div {...fadeInUp} transition={{ ...fadeInUp.transition, delay: 0.4 }}>
              <h3 className="text-2xl font-bold font-tasa mb-6">{"Comment ça marche ?"}</h3>
              <div className="space-y-5">
                {[
                  { step: "1", title: "Nous créons votre site", desc: "Développement optimisé et performant" },
                  { step: "2", title: "Vous recevez un devis détaillé", desc: "Dossier éligible au Chèque Numérique (si conditions remplies)" },
                  { step: "3", title: "Vous déposez le dossier", desc: "Sur mesdemarches.iledefrance.fr" },
                  { step: "4", title: "Vous êtes remboursé", desc: "Jusqu’à 50% du montant HT après facture acquittée*" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-teal-800 dark:bg-teal-700 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-6">
                {"*Sous réserve de conditions d’éligibilité (Région Île-de-France) et d’acceptation du dossier par l’organisme. B2dev n’assure ni ne garantit l’obtention de l’aide."}
              </p>
            </motion.div>
          </CardWithBlob>
        </div>
      </section>
      {/* Infinite Marquee - Trust */}
      <section className="py-16 section-divider overflow-hidden">
        <motion.div {...fadeInUp}>
          <p className="text-center text-sm font-medium mb-10 uppercase tracking-[0.2em] text-muted-foreground">
            Ils nous font confiance
          </p>
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, setIdx) => (
                <div key={setIdx} className="flex items-center gap-16 px-8">
                  <span className="text-3xl md:text-4xl font-bold font-tasa opacity-20 hover:opacity-60 transition-opacity duration-500 cursor-default">L'ecrin du vignoble</span>
                  <span className="text-muted-foreground/30 text-2xl">{"•"}</span>
                  <span className="text-3xl md:text-4xl font-bold font-tasa opacity-20 hover:opacity-60 transition-opacity duration-500 cursor-default">{"LEB depannage"}</span>
                  <span className="text-muted-foreground/30 text-2xl">{"•"}</span>
                  <span className="text-3xl md:text-4xl font-bold font-tasa opacity-20 hover:opacity-60 transition-opacity duration-500 cursor-default">Les suites du cygne</span>
                  <span className="text-muted-foreground/30 text-2xl">{"•"}</span>
                  <span className="text-3xl md:text-4xl font-bold font-tasa opacity-20 hover:opacity-60 transition-opacity duration-500 cursor-default">Bricobeno</span>
                  <span className="text-muted-foreground/30 text-2xl">{"•"}</span>
                  
         
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div {...fadeInUp}
            className="relative rounded-3xl overflow-hidden bg-teal-800 dark:bg-teal-950 p-12 md:p-20 text-center"
          >
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            <div className="relative z-10">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-5xl font-bold font-tasa mb-6 text-white leading-tight"
              >
                {"Prêt à lancer"}
                <br />
                {"votre projet ?"}
              </motion.h2>
              <p className="text-teal-100/70 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                {"Discutons de vos besoins et créons ensemble le site web qui fera décoller votre activité."}
              </p>
              <Link href="/contact">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 border-none text-lg px-10 py-5 font-semibold shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-black/20 transition-all duration-300 hover:-translate-y-0.5">
                  Demander un devis gratuit
                </Button>
              </Link>
            </div>

            <div className="absolute top-0 right-0 w-80 h-80 bg-teal-700/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-teal-600/15 rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
