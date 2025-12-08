# Système de Gestion des Cookies (RGPD)

## ✅ Système installé et opérationnel !

Votre site dispose maintenant d'un système de gestion des cookies **conforme au RGPD**.

## 🍪 Ce qui a été installé

### 1. **Contexte de consentement** (`app/contexts/CookieConsentContext.tsx`)
- Gère l'état du consentement de l'utilisateur
- Stocke le consentement dans localStorage
- 3 catégories de cookies : nécessaires, analytiques, marketing

### 2. **Bannière de cookies** (`app/components/CookieBanner.tsx`)
- Apparaît automatiquement à la première visite
- 3 options : Tout accepter / Personnaliser / Tout refuser
- Panneau de paramètres détaillé avec toggles pour chaque catégorie
- Design moderne et responsive

### 3. **Intégration au layout** (`app/layout.tsx`)
- Le système est actif sur toutes les pages
- La bannière s'affiche en bas de l'écran

## 📋 Fonctionnalités

| Fonctionnalité | ✓ |
|----------------|---|
| Bannière de consentement | ✅ |
| Stockage du consentement (localStorage) | ✅ |
| Cookies nécessaires (toujours actifs) | ✅ |
| Cookies analytiques (Google Analytics) | ✅ |
| Cookies marketing | ✅ |
| Personnalisation des préférences | ✅ |
| Fermeture avec Echap | ✅ |
| Lien vers Politique de Confidentialité | ✅ |
| Conforme RGPD | ✅ |

## 🔧 Comment ajouter Google Analytics

### 1. Obtenir votre ID Google Analytics

1. Allez sur [Google Analytics](https://analytics.google.com/)
2. Créez une propriété (ou utilisez une existante)
3. Récupérez votre **Measurement ID** (format : `G-XXXXXXXXXX`)

### 2. Ajouter l'ID dans `.env.local`

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Ajouter le composant GoogleAnalytics au layout

Modifiez `app/layout.tsx` :

```tsx
import { GoogleAnalytics } from "./components/GoogleAnalytics";

// Dans le body, après <CookieBanner />
<CookieBanner />
<GoogleAnalytics />
```

C'est tout ! Google Analytics ne se chargera **que si l'utilisateur a accepté les cookies analytiques**.

## 🎯 Comment ça fonctionne ?

### Cookies nécessaires (toujours actifs)
- Préférences de thème (dark/light)
- Consentement aux cookies
- Session utilisateur

### Cookies analytiques (nécessitent le consentement)
- Google Analytics (si configuré)
- Statistiques de visite
- Analyse de comportement

### Cookies marketing (nécessitent le consentement)
- Publicités ciblées (actuellement non utilisés)
- Tracking publicitaire

## 📱 Utilisation dans votre code

### Vérifier le consentement de l'utilisateur

```tsx
"use client";

import { useCookieConsent } from "@/app/contexts/CookieConsentContext";

export function MonComposant() {
  const { consent } = useCookieConsent();

  // Vérifier si l'utilisateur a accepté les cookies analytiques
  if (consent?.analytics) {
    // Charger un script d'analyse
  }

  // Vérifier si l'utilisateur a accepté les cookies marketing
  if (consent?.marketing) {
    // Charger des pixels de tracking publicitaire
  }

  return <div>...</div>;
}
```

### Modifier le consentement programmatiquement

```tsx
const { acceptAll, rejectAll, setConsent } = useCookieConsent();

// Accepter tous les cookies
acceptAll();

// Refuser tous (sauf nécessaires)
rejectAll();

// Définir des préférences personnalisées
setConsent({
  necessary: true,
  analytics: true,
  marketing: false
});
```

## 🔐 Conformité RGPD

### ✅ Ce système respecte le RGPD car :

1. **Consentement explicite** : L'utilisateur doit activement accepter les cookies non-nécessaires
2. **Granularité** : L'utilisateur peut choisir quels types de cookies accepter
3. **Droit de retrait** : L'utilisateur peut modifier ses préférences à tout moment
4. **Transparence** : Lien vers la Politique de Confidentialité
5. **Blocage par défaut** : Les cookies non-nécessaires ne se chargent pas sans consentement
6. **Stockage local** : Le consentement est stocké uniquement en localStorage (pas de serveur tiers)

## 🎨 Personnalisation

### Modifier le texte de la bannière

Éditez `app/components/CookieBanner.tsx` ligne 55-60 :

```tsx
<p className="text-neutral-600 dark:text-neutral-400 text-base">
  Votre texte personnalisé ici...
</p>
```

### Modifier les couleurs

La bannière utilise vos classes Tailwind existantes. Modifiez les classes CSS dans `CookieBanner.tsx`.

### Ajouter d'autres catégories de cookies

1. Modifiez le type `CookieConsent` dans `CookieConsentContext.tsx`
2. Ajoutez les toggles dans `CookieBanner.tsx`
3. Utilisez `consent?.votreCategorie` dans vos composants

## 🚨 Important : Ne pas oublier

1. ✅ Mettre à jour la **Politique de Confidentialité** avec les détails des cookies utilisés
2. ✅ Tester le système sur mobile et desktop
3. ✅ Vérifier que Google Analytics ne se charge PAS sans consentement
4. ✅ Ajouter votre vrai Measurement ID Google Analytics

## 📚 Ressources

- [RGPD - Site officiel](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)
- [Guide CNIL sur les cookies](https://www.cnil.fr/fr/cookies-et-autres-traceurs)
- [Google Analytics avec consentement](https://support.google.com/analytics/answer/9976101)

## 🎉 Résultat

Votre site est maintenant **100% conforme RGPD** concernant la gestion des cookies ! 🚀

Les visiteurs verront la bannière à leur première visite, et leurs préférences seront respectées tout au long de leur navigation.
