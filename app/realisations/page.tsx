"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Section } from "../components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const projects = [
  {
    title: "Le Ciseau d'Or",
    category: "Site Vitrine",
    description: "Site élégant pour un salon de coiffure premium à Paris. Système de prise de rendez-vous intégré.",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80",
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    link: "#"
  },
  {
    title: "Boulangerie Patisson",
    category: "E-Commerce / Click & Collect",
    description: "Plateforme de commande en ligne pour une boulangerie artisanale. Gestion des stocks en temps réel.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80",
    tags: ["React", "Stripe", "Node.js"],
    link: "#"
  },
  {
    title: "Plomberie Express 24/7",
    category: "Site Vitrine",
    description: "Site haute conversion pour un service de dépannage d'urgence. Optimisé pour le référencement local.",
    image: "https://images.unsplash.com/photo-1505798577917-a651a5d40320?auto=format&fit=crop&q=80",
    tags: ["Next.js", "SEO", "Google Maps API"],
    link: "#"
  },
  {
    title: "Restaurant L'Olivier",
    category: "Site Vitrine + Réservation",
    description: "Ambiance méditerranéenne immersive pour ce restaurant gastronomique. Menus interactifs.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    tags: ["React", "Motion", "CMS"],
    link: "#"
  }
];

export default function PortfolioPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <Section className="pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Nos Réalisations</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Découvrez comment nous avons aidé nos clients à transformer leur présence digitale.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: isMobile ? 0 : index * 0.05, duration: 0.3 }}
              className={`group relative overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-white/10 cursor-pointer transition-all duration-300 ${!isMobile ? 'hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-2' : ''}`}
            >
              {/* Image Placeholder */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-800 animate-pulse" /> {/* Fallback if image fails */}
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover ${!isMobile ? 'transition-transform duration-500 group-hover:scale-110' : ''}`}
                />
                <div className="absolute inset-0 bg-black/60 dark:bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <Link href={project.link} className="p-3 bg-white dark:bg-white text-neutral-900 dark:text-black rounded-full hover:bg-blue-500 hover:text-white transition-colors">
                    <ExternalLink className="w-6 h-6" />
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-blue-500 dark:text-blue-400 text-base font-medium mb-2 block">{project.category}</span>
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </div>

                <p className="text-neutral-600 dark:text-neutral-400 mb-6 text-base line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/10 text-xs text-neutral-700 dark:text-neutral-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
