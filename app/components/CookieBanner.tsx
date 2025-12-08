"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Settings, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCookieConsent } from "../contexts/CookieConsentContext";
import { Button } from "./ui/Button";

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, setConsent, setShowBanner } = useCookieConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  const handleSavePreferences = () => {
    setConsent(preferences);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <>
          {/* Overlay pour les paramètres */}
          {showSettings && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setShowSettings(false)}
            />
          )}

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-[70] p-4 md:p-6"
          >
            <div className="max-w-7xl mx-auto">
              {/* Bannière principale */}
              {!showSettings ? (
                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-white/10 p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                    {/* Icône et texte */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Cookie className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">
                            🍪 Nous utilisons des cookies
                          </h3>
                          <p className="text-neutral-600 dark:text-neutral-400 text-base">
                            Nous utilisons des cookies essentiels pour le bon fonctionnement du site.
                            Avec votre consentement, nous pouvons également utiliser des cookies analytiques pour améliorer votre expérience.{" "}
                            <Link
                              href="/politique-confidentialite"
                              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 underline"
                            >
                              En savoir plus
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Boutons d'action */}
                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => setShowSettings(true)}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-base font-medium"
                      >
                        <Settings className="w-4 h-4" />
                        Personnaliser
                      </button>
                      <button
                        onClick={rejectAll}
                        className="px-6 py-2.5 rounded-lg border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-base font-medium"
                      >
                        Refuser
                      </button>
                      <Button
                        onClick={acceptAll}
                        className="px-6 py-2.5"
                      >
                        Tout accepter
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Panneau de paramètres */
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-white/10 p-6 md:p-8 max-w-2xl mx-auto"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                      Paramètres des cookies
                    </h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="p-2 hover:bg-neutral-100 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-500" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    {/* Cookies nécessaires */}
                    <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                            Cookies nécessaires
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Ces cookies sont indispensables au fonctionnement du site (préférences de thème, session, etc.). Ils ne peuvent pas être désactivés.
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full text-sm font-medium">
                            Toujours actif
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Cookies analytiques */}
                    <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                            Cookies analytiques
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Ces cookies nous permettent de comprendre comment les visiteurs interagissent avec notre site (Google Analytics).
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={preferences.analytics}
                            onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>

                    {/* Cookies marketing */}
                    <div className="p-4 rounded-lg bg-neutral-50 dark:bg-white/5 border border-neutral-200 dark:border-white/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-semibold text-neutral-900 dark:text-white mb-1">
                            Cookies marketing
                          </h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">
                            Ces cookies sont utilisés pour afficher des publicités pertinentes (actuellement non utilisés).
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input
                            type="checkbox"
                            checked={preferences.marketing}
                            onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Boutons d'action du panneau */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={rejectAll}
                      className="flex-1 px-6 py-2.5 rounded-lg border border-neutral-300 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-white/5 transition-colors text-base font-medium"
                    >
                      Tout refuser
                    </button>
                    <Button
                      onClick={handleSavePreferences}
                      className="flex-1 px-6 py-2.5"
                    >
                      Enregistrer mes préférences
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
