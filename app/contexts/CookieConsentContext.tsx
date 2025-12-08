"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type CookieConsent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consent: CookieConsent | null;
  setConsent: (consent: CookieConsent) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const CONSENT_COOKIE_NAME = 'b2dev_cookie_consent';

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  // Charger le consentement depuis localStorage au montage
  useEffect(() => {
    const savedConsent = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (savedConsent) {
      try {
        setConsentState(JSON.parse(savedConsent));
        setShowBanner(false);
      } catch (e) {
        // Si erreur de parsing, afficher la bannière
        setShowBanner(true);
      }
    } else {
      // Pas de consentement enregistré, afficher la bannière
      setShowBanner(true);
    }
  }, []);

  const setConsent = (newConsent: CookieConsent) => {
    setConsentState(newConsent);
    localStorage.setItem(CONSENT_COOKIE_NAME, JSON.stringify(newConsent));
    setShowBanner(false);
  };

  const acceptAll = () => {
    const allAccepted: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setConsent(allAccepted);
  };

  const rejectAll = () => {
    const onlyNecessary: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setConsent(onlyNecessary);
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        setConsent,
        acceptAll,
        rejectAll,
        showBanner,
        setShowBanner,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}
