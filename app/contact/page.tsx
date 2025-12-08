import React, { Suspense } from "react";
import { Section } from "../components/ui/Section";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <>
      <Section className="pt-32 pb-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-neutral-900 dark:text-white">Contactez-nous</h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto mb-6">
            Vous avez un projet en tête ? N'hésitez pas à nous écrire. 
            Devis gratuit et réponse sous 24h.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-base">
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <span className="text-green-500">✓</span>
              <span>Devis 100% gratuit</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <span className="text-green-500">✓</span>
              <span>Réponse sous 24h</span>
            </div>
            <div className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300">
              <span className="text-green-500">✓</span>
              <span>Sans engagement</span>
            </div>
          </div>
        </div>
      </Section>

      <Suspense fallback={<div />}> 
        <ContactForm />
      </Suspense>
    </>
  );
}
