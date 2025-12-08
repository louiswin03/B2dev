"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [isMobile, setIsMobile] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedService, setSelectedService] = useState("");

  // Vérifier que les clés EmailJS publiques sont présentes (inlinées à la build)
  const emailjsConfigured = Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Pré-sélectionner le service depuis l'URL
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      // Mapper les serviceId aux valeurs du select
      const serviceMap: { [key: string]: string } = {
        'vitrine': 'Vitrine',
        'pro': 'Pro',
        'personnalise': 'Personnalisé'
      };
      setSelectedService(serviceMap[serviceParam] || '');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailjsConfigured) {
      setErrorMessage("Le service d'envoi d'emails n'est pas configuré. Veuillez nous contacter directement par email.");
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 5000);
      return;
    }
    setFormStatus("submitting");
    setErrorMessage("");

    // Stocker la référence au formulaire avant l'appel async
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Préparer les données pour EmailJS (correspondant au template)
    const templateParams = {
      firstname: formData.get('firstname'),
      lastname: formData.get('lastname'),
      emaill: formData.get('email'), // Note: "emaill" avec 2 'l' comme dans votre template
      subject: formData.get('subject'),
      service: formData.get('service'),
      message: formData.get('message'),
      time: new Date().toLocaleString('fr-FR', {
        dateStyle: 'short',
        timeStyle: 'short'
      })
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setFormStatus("success");
      // Réinitialiser le formulaire
      form.reset();
      setSelectedService("");
      // Retour à l'état idle après 5 secondes
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setFormStatus("error");
      setErrorMessage("Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.");
      setTimeout(() => setFormStatus("idle"), 5000);
    }
  };

  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: isMobile ? 0 : 0.2, duration: isMobile ? 0.3 : 0.5 }}
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
                    href="mailto:AmauryAll.b2dev@gmail.com"
                    className="text-neutral-600 dark:text-neutral-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    AmauryAll.b2dev@gmail.com
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
          initial={{ opacity: 0, x: isMobile ? 0 : 20, y: isMobile ? 20 : 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ delay: isMobile ? 0.1 : 0.4, duration: isMobile ? 0.3 : 0.5 }}
        >
          <form onSubmit={handleSubmit} className="bg-neutral-100 dark:bg-neutral-900/50 p-8 rounded-2xl border border-neutral-200 dark:border-white/10 space-y-6">
            {!emailjsConfigured && (
              <div className="p-4 mb-4 bg-yellow-50 dark:bg-yellow-900/40 border border-yellow-200 dark:border-yellow-800 rounded text-yellow-800 dark:text-yellow-200">
                Le formulaire d'envoi d'email n'est pas configuré sur ce déploiement. Vous pouvez nous contacter par <a className="underline" href="mailto:AmauryAll.b2dev@gmail.com">email</a> ou par téléphone.
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstname" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Prénom</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
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
                  name="lastname"
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
                name="email"
                required
                className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                placeholder="jean.dupont@email.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Type de service</label>
              <select
                id="service"
                name="service"
                required
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="">Sélectionnez un service</option>
                <option value="Vitrine">Site Vitrine - 990€</option>
                <option value="Pro">Pack Pro - 1490€</option>
                <option value="Personnalisé">Site Personnalisé - Sur mesure</option>
                <option value="Autre">Autre / Demande d'information</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Sujet</label>
              <select
                id="subject"
                name="subject"
                required
                className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="">Sélectionnez un sujet</option>
                <option value="Demande de devis">Demande de devis</option>
                <option value="Renseignement">Renseignement</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-base font-medium text-neutral-700 dark:text-neutral-300">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full bg-white dark:bg-black/50 border border-neutral-300 dark:border-white/10 rounded-lg px-4 py-3 text-neutral-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
                placeholder="Parlez-nous de votre projet..."
              />
            </div>

            {errorMessage && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={formStatus !== "idle" || !emailjsConfigured}
            >
              {formStatus === "idle" && (
                <>
                  Envoyer le message
                  <Send className="w-4 h-4 ml-2" />
                </>
              )}
              {formStatus === "submitting" && "Envoi en cours..."}
              {formStatus === "success" && "✓ Message envoyé !"}
              {formStatus === "error" && "Erreur d'envoi"}
            </Button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
