"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { useState } from "react";

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate submission
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <>
      <Section className="pt-32 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Contactez-nous</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Vous avez un projet en tête ? N'hésitez pas à nous écrire. 
            Devis gratuit et réponse sous 24h.
          </p>
        </motion.div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-neutral-100 dark:bg-neutral-900/50 p-8 rounded-2xl border border-neutral-200 dark:border-white/10">
              <h3 className="text-2xl font-semibold mb-6 text-neutral-900 dark:text-white">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Email</h4>
                    <a
                      href="mailto:contact@devagency.fr"
                      className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      contact@devagency.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Téléphone</h4>
                    <a
                      href="tel:+33682510468"
                      className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    >
                      06 82 51 04 68
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-500 flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-medium text-neutral-900 dark:text-white mb-1">Localisation</h4>
                    <p className="text-neutral-600 dark:text-neutral-400">Paris & Île-de-France</p>
                    
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-neutral-100 dark:bg-neutral-900/50 p-8 rounded-2xl border border-neutral-200 dark:border-white/10 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstname" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Prénom</label>
                  <input
                    type="text"
                    id="firstname"
                    required
                    className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Jean"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastname" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Nom</label>
                  <input
                    type="text"
                    id="lastname"
                    required
                    className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="Dupont"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  placeholder="jean.dupont@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Sujet</label>
                <select
                  id="subject"
                  className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                  <option>Demande de devis</option>
                  <option>Renseignement</option>
                  <option>Autre</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                  placeholder="Parlez-nous de votre projet..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={formStatus !== "idle"}
              >
                {formStatus === "idle" && (
                  <>
                    Envoyer le message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
                {formStatus === "submitting" && "Envoi en cours..."}
                {formStatus === "success" && "Message envoyé !"}
              </Button>
            </form>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
