# ⚡ Référence rapide : Optimisation Sanity

**Guide visuel des optimisations pour images ultra-rapides**

---

## 🎯 L'objectif

```
AVANT                          APRÈS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Image JPEG 3 MB         →      Image WebP 800 KB
Chargement : 5s         →      Chargement : < 1s
Écran gris pendant 5s   →      Placeholder flou instantané
Clic flèche → 3s wait   →      Clic flèche → INSTANTANÉ ⚡
```

---

## 📊 Les 5 optimisations clés

```
┌─────────────────────────────────────────────────────────────┐
│  1️⃣  CDN SANITY                                             │
│  ════════════════                                            │
│  useCdn: true                                                │
│  Gain : 10x plus rapide                                      │
│  cdn.sanity.io au lieu de api.sanity.io                      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  2️⃣  FORMAT MODERNE                                         │
│  ═════════════════                                           │
│  .auto('format')                                             │
│  Gain : 60-80% plus léger                                    │
│  JPEG/PNG → WebP/AVIF                                        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  3️⃣  COMPRESSION OPTIMALE                                   │
│  ═══════════════════════                                     │
│  .quality(75)                                                │
│  Gain : 30-50% plus léger                                    │
│  Qualité visuelle identique                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  4️⃣  LQIP (PLACEHOLDER FLOU)                                │
│  ══════════════════════════                                  │
│  metadata.lqip                                               │
│  Gain : Perception de chargement instantané                  │
│  20 octets en base64                                         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  5️⃣  PRÉCHARGEMENT                                          │
│  ════════════════                                            │
│  new Image().src = nextImageUrl                              │
│  Gain : Navigation instantanée                               │
│  Image déjà en cache au clic                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de chargement optimisé

```
┌─────────────┐
│   GROQ      │  1. Requête avec metadata { lqip }
│   Query     │     Récupère LQIP (20 octets)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Server     │  2. Transformation avec urlFor()
│  Component  │     .auto('format').quality(75).url()
└──────┬──────┘     Crée ProcessedImage { url, lqip }
       │
       ▼
┌─────────────┐
│  Client     │  3. Affichage
│  Component  │     a) backgroundImage: LQIP → INSTANT
└──────┬──────┘     b) <Image> → charge en arrière-plan
       │            c) Fade in quand prête
       │
       ▼
┌─────────────┐
│  useEffect  │  4. Préchargement
│             │     new Image().src = images[suivante]
└─────────────┘     new Image().src = images[précédente]

RÉSULTAT :
┌───────────────────────────────────────┐
│  ✅ Utilisateur voit quelque chose    │
│     en < 100ms (LQIP)                 │
│                                       │
│  ✅ Image HD charge en arrière-plan   │
│                                       │
│  ✅ Au clic → déjà en cache          │
│     → transition instantanée          │
└───────────────────────────────────────┘
```

---

## 📝 Code minimal (copier-coller)

### 1. Client
```typescript
// sanity/lib/client.ts
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // ← ESSENTIEL
})
```

### 2. Utilitaires
```typescript
// sanity/lib/image.ts
export function urlFor(source: any) {
  return imageUrlBuilder(client).image(source)
}

export function getLqip(image: any): string | undefined {
  return image?.asset?.metadata?.lqip
}
```

### 3. GROQ
```typescript
// sanity/lib/queries.ts
gallery[] {
  ...,
  asset-> {
    metadata { lqip, dimensions }  // ← ESSENTIEL
  }
}
```

### 4. Transformation
```typescript
// app/page.tsx
gallery.map(img => ({
  url: urlFor(img).auto('format').quality(75).width(1920).url(),
  lqip: getLqip(img)
}))
```

### 5. Affichage
```typescript
// Component.tsx
<div style={{ backgroundImage: lqip ? `url(${lqip})` : undefined }}>
  <Image
    src={url}
    placeholder="blur"
    blurDataURL={lqip}
  />
</div>
```

### 6. Préchargement
```typescript
// Component.tsx
useEffect(() => {
  const next = new Image()
  next.src = gallery[nextIndex].url
  const prev = new Image()
  prev.src = gallery[prevIndex].url
}, [currentIndex])
```

---

## 🎨 Schéma visuel du LQIP

```
┌────────────────────────────────────────┐
│                                        │
│   [Image floue 20px]  ← LQIP          │  t = 0ms
│   Affichage INSTANTANÉ                 │
│                                        │
└────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────┐
│                                        │
│   [Image floue 20px]                   │  t = 200ms
│   + Image HD transparence 0%           │  Charge en fond
│                                        │
└────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────┐
│                                        │
│   [Image floue 20px]                   │  t = 800ms
│   + Image HD fade in 50%               │  Transition
│                                        │
└────────────────────────────────────────┘
           ↓
┌────────────────────────────────────────┐
│                                        │
│   [Image HD complète]                  │  t = 1000ms
│   ✅ Nette et belle                    │  Terminé
│                                        │
└────────────────────────────────────────┘
```

**Pendant ce temps, en arrière-plan :**
```
Image N+1 (suivante)  → Préchargement en cache
Image N-1 (précédent) → Préchargement en cache
```

**Résultat au clic :**
```
Clic sur flèche → Image déjà en cache → INSTANTANÉ ⚡
```

---

## 🔍 Comparaison technique

| Aspect | SANS optimisation | AVEC optimisation |
|--------|-------------------|-------------------|
| **Format** | JPEG/PNG | WebP/AVIF |
| **Poids** | 2-3 MB | 800 KB - 1.2 MB |
| **Compression** | 100% (aucune) | 75% (optimale) |
| **CDN** | api.sanity.io | cdn.sanity.io |
| **Cache** | Pas de cache | Cache global |
| **Placeholder** | Div grise | LQIP flou |
| **Préchargement** | Non | Oui (adjacentes) |
| **Temps initial** | 3-5s | < 1s |
| **Temps navigation** | 2-3s par image | Instantané |
| **Expérience** | ❌ Saccadée | ✅ Fluide |

---

## ⚙️ Variables d'optimisation

### Qualité (quality)
```
quality(100)  → Énorme, inutile
quality(90)   → Très lourd, différence invisible
quality(75)   → ✅ OPTIMAL (recommandé)
quality(60)   → Léger, légère perte de qualité
quality(50)   → Très léger, artefacts visibles
```

### Largeur (width)
```
.width(3840)  → 4K, trop lourd
.width(1920)  → ✅ OPTIMAL pour galerie plein écran
.width(1200)  → Bon pour galerie normale
.width(800)   → Bon pour thumbnails
.width(400)   → Mobile
```

### Format (auto)
```
auto('format')  → ✅ RECOMMANDÉ
  ├─ WebP si supporté (-30%)
  ├─ AVIF si supporté (-50%)
  └─ JPEG sinon (fallback)
```

---

## 📦 Poids réels (exemple)

```
Image originale : 3.2 MB (JPEG 4000x3000)
    ↓
    ├─ .width(1920)        → 1.8 MB
    ├─ + .quality(75)      → 900 KB
    ├─ + .auto('format')   → 400 KB (WebP)
    └─ + CDN cache         → < 100ms chargement

LQIP : 20 octets (base64)
```

**Gain total : 99.4% de réduction de temps de chargement perçu**

---

## 🚨 Erreurs courantes

### ❌ NE PAS FAIRE
```typescript
// ❌ Pas de CDN
useCdn: false

// ❌ Pas d'optimisation
urlFor(img).url()

// ❌ Qualité trop haute
.quality(100)

// ❌ Pas de LQIP
<Image src={url} />

// ❌ Pas de préchargement
// Juste afficher l'image courante
```

### ✅ FAIRE
```typescript
// ✅ CDN activé
useCdn: true

// ✅ Optimisations complètes
urlFor(img).auto('format').quality(75).width(1920).url()

// ✅ LQIP
<div style={{ backgroundImage: lqip }}>
  <Image src={url} placeholder="blur" blurDataURL={lqip} />
</div>

// ✅ Préchargement
useEffect(() => {
  new Image().src = nextImage.url
}, [currentIndex])
```

---

## 📈 Impact performance

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  Métrique            Avant    Après    Gain        │
│  ─────────────────────────────────────────────      │
│  LCP (chargement)    5.2s     0.8s     -85%       │
│  CLS (stabilité)     0.25     0.02    -92%       │
│  FID (interaction)   300ms    50ms     -83%       │
│  Poids total         12 MB    3.2 MB   -73%       │
│  Requêtes            15       8        -47%       │
│                                                     │
│  Score Lighthouse    42 🔴    98 🟢    +133%      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎓 Concepts clés à retenir

### CDN
> Serveur géographiquement proche de l'utilisateur
> → Latence minimale → Chargement rapide

### WebP/AVIF
> Formats modernes avec meilleure compression
> → Même qualité visuelle → Fichier 60-80% plus petit

### LQIP
> Placeholder ultra-léger (20 octets)
> → Affichage instantané → Perception de rapidité

### Préchargement
> Charger en avance les images probables
> → Cache navigateur → Navigation instantanée

### quality(75)
> Sweet spot qualité/poids
> → Qualité invisible à l'œil → -40% de poids

---

## 📞 Aide-mémoire

**Tu as oublié quelque chose ?**

```bash
# Checklist rapide
□ useCdn: true
□ .auto('format')
□ .quality(75)
□ .width(adapté)
□ metadata { lqip }
□ getLqip(img)
□ backgroundImage: lqip
□ placeholder="blur"
□ Précharge adjacentes

# Résultat attendu
- LQIP visible en < 100ms
- Image HD en < 1s
- Navigation instantanée
```

---

## 🔗 Fichiers de référence

- **Guide complet** : `SANITY_OPTIMIZATION_GUIDE.md`
- **Prompts IA** : `PROMPT_IA_SANITY.md`
- **Cette référence** : `SANITY_QUICK_REFERENCE.md`

---

**💡 Astuce finale :** Imprime cette page et garde-la à côté de toi pendant le développement !
