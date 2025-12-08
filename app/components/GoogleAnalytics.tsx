"use client";

import { useEffect } from "react";
import { useCookieConsent } from "../contexts/CookieConsentContext";
import Script from "next/script";

// Remplacez par votre vrai ID Google Analytics (format: G-XXXXXXXXXX)
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-XXXXXXXXXX";

export function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  useEffect(() => {
    if (consent?.analytics && typeof window !== "undefined" && (window as any).gtag) {
      // Activer Google Analytics
      (window as any).gtag("consent", "update", {
        analytics_storage: "granted",
      });
    }
  }, [consent]);

  // Ne charger Google Analytics que si le consentement est donné
  if (!consent?.analytics) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('consent', 'default', {
              'analytics_storage': 'granted'
            });
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}
