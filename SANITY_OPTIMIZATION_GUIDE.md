# 🚀 Guide d'optimisation Sanity pour Next.js

Ce guide te permet de configurer Sanity CMS avec des performances maximales pour le chargement d'images. Suis ces étapes exactement pour avoir des images qui se chargent instantanément.

---

## 📋 Table des matières

1. [Installation des dépendances](#1-installation-des-dépendances)
2. [Configuration du client Sanity](#2-configuration-du-client-sanity)
3. [Utilitaires pour les images](#3-utilitaires-pour-les-images)
4. [Requêtes GROQ optimisées](#4-requêtes-groq-optimisées)
5. [Configuration Next.js](#5-configuration-nextjs)
6. [Composant avec préchargement](#6-composant-avec-préchargement)
7. [Checklist finale](#7-checklist-finale)

---

## 1. Installation des dépendances

```bash
npm install next-sanity @sanity/image-url
```

**Packages requis :**
- `next-sanity` : Intégration officielle Sanity pour Next.js
- `@sanity/image-url` : Builder d'URL pour optimiser les images

---

## 2. Configuration du client Sanity

**Fichier :** `sanity/lib/client.ts`

```typescript
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // ✅ CRITIQUE : Active le CDN pour des performances 10x meilleures
})
```

**⚠️ Important :**
- `useCdn: true` = Utilise le CDN mondial de Sanity (ultra-rapide)
- `useCdn: false` = Utilise l'API directe (lent, uniquement pour dev)

**Variables d'environnement (`.env.local`) :**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=ton_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## 3. Utilitaires pour les images

**Fichier :** `sanity/lib/image.ts`

```typescript
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

// Fonction pour construire des URLs optimisées
export function urlFor(source: any) {
  return builder.image(source)
}

// Fonction pour extraire le LQIP (placeholder flou)
export function getLqip(image: any): string | undefined {
  return image?.asset?.metadata?.lqip
}
```

**💡 Explication :**
- `urlFor()` : Génère des URLs Sanity avec transformations (width, quality, format)
- `getLqip()` : Extrait le placeholder flou ultra-léger (quelques octets en base64)

---

## 4. Requêtes GROQ optimisées

**Fichier :** `sanity/lib/queries.ts`

### Pour des projets avec galerie d'images :

```typescript
export const projectsQuery = `*[_type == "project" && published == true] | order(order asc) {
  _id,
  title,
  slug,
  description,
  mainImage {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  gallery[] {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  tags,
  projectUrl,
  order
}`
```

### Pour des membres d'équipe avec photos :

```typescript
export const teamMembersQuery = `*[_type == "teamMember" && published == true] | order(order asc) {
  _id,
  name,
  role,
  bio,
  image {
    ...,
    asset-> {
      _id,
      url,
      metadata {
        lqip,
        dimensions
      }
    }
  },
  skills,
  social,
  order
}`
```

**🔑 Points clés :**
- `asset->` : Déréférence l'asset pour avoir accès aux métadonnées
- `metadata { lqip, dimensions }` : Récupère le placeholder flou + dimensions
- `lqip` : Low Quality Image Placeholder (base64, ~20 octets)

---

## 5. Configuration Next.js

**Fichier :** `next.config.ts`

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // ✅ CDN Sanity
      },
    ],
  },
}

export default nextConfig
```

**⚠️ Important :** Utilise `cdn.sanity.io`, PAS `api.sanity.io`

---

## 6. Composant avec préchargement

### 6.1 Transformer les données (Server Component)

**Fichier :** `app/realisations/page.tsx`

```typescript
import { client } from '@/sanity/lib/client'
import { projectsQuery } from '@/sanity/lib/queries'
import { urlFor, getLqip } from '@/sanity/lib/image'
import PortfolioClient from './PortfolioClient'

interface ProcessedImage {
  url: string
  lqip?: string
}

async function getProjects() {
  try {
    const projects = await client.fetch(projectsQuery, {}, {
      cache: 'no-store', // Ou 'force-cache' pour du cache
    })

    return projects.map(project => ({
      _id: project._id,
      title: project.title,
      description: project.description,
      mainImage: project.mainImage
        ? {
            url: urlFor(project.mainImage)
              .fit('max')
              .auto('format')  // ✅ WebP/AVIF automatique
              .quality(75)     // ✅ Compression optimale
              .url(),
            lqip: getLqip(project.mainImage)
          }
        : { url: '', lqip: undefined },
      gallery: project.gallery && project.gallery.length > 0
        ? project.gallery.map(img => ({
            url: urlFor(img)
              .width(1920)     // ✅ Taille max adaptée
              .fit('max')
              .auto('format')
              .quality(75)
              .url(),
            lqip: getLqip(img)
          }))
        : [],
      tags: project.tags || [],
      projectUrl: project.projectUrl,
    }))
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error)
    return []
  }
}

export default async function RealisationsPage() {
  const projects = await getProjects()
  return <PortfolioClient projects={projects} />
}
```

**🎯 Optimisations appliquées :**
- `.auto('format')` → WebP/AVIF si le navigateur supporte (60-80% plus léger)
- `.quality(75)` → Compression optimale sans perte visible (30-50% plus léger)
- `.width(1920)` → Évite de charger des images 4K inutilement
- `getLqip()` → Récupère le placeholder flou pour affichage instantané

### 6.2 Affichage avec LQIP et préchargement (Client Component)

**Fichier :** `app/realisations/PortfolioClient.tsx`

```typescript
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ProcessedImage {
  url: string
  lqip?: string
}

interface Project {
  _id: string
  title: string
  description: string
  mainImage: ProcessedImage
  gallery: ProcessedImage[]
  tags: string[]
  projectUrl?: string
}

interface PortfolioClientProps {
  projects: Project[]
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [currentImageIndices, setCurrentImageIndices] = useState<{ [key: number]: number }>(
    projects.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {})
  )

  // ✅ PRÉCHARGEMENT : Les images adjacentes se chargent en arrière-plan
  useEffect(() => {
    projects.forEach((project, projectIndex) => {
      const currentIndex = currentImageIndices[projectIndex] || 0
      const totalImages = project.gallery.length

      if (totalImages > 1) {
        // Précharger l'image suivante
        const nextIndex = (currentIndex + 1) % totalImages
        const nextImage = new window.Image()
        nextImage.src = project.gallery[nextIndex].url

        // Précharger l'image précédente
        const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1
        const prevImage = new window.Image()
        prevImage.src = project.gallery[prevIndex].url
      }
    })
  }, [currentImageIndices, projects])

  const nextImage = (projectIndex: number) => {
    const project = projects[projectIndex]
    const totalImages = project.gallery.length
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectIndex]: (prev[projectIndex] + 1) % totalImages
    }))
  }

  const prevImage = (projectIndex: number) => {
    const project = projects[projectIndex]
    const totalImages = project.gallery.length
    setCurrentImageIndices(prev => ({
      ...prev,
      [projectIndex]: prev[projectIndex] === 0
        ? totalImages - 1
        : prev[projectIndex] - 1
    }))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => {
        const currentImageIndex = currentImageIndices[index] || 0
        const currentImage = project.gallery[currentImageIndex]

        return (
          <div key={project._id} className="group relative">
            {/* Carrousel avec LQIP */}
            <div
              className="relative h-64 overflow-hidden cursor-pointer"
              style={{
                // ✅ LQIP : Affichage instantané du placeholder flou
                backgroundImage: currentImage.lqip ? `url(${currentImage.lqip})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Fallback si pas de LQIP */}
              {!currentImage.lqip && <div className="absolute inset-0 bg-neutral-800 animate-pulse" />}

              <Image
                src={currentImage.url}
                alt={`${project.title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-cover fade-in-image"
                // ✅ Blur placeholder natif Next.js
                placeholder={currentImage.lqip ? "blur" : "empty"}
                blurDataURL={currentImage.lqip}
              />

              {/* Navigation */}
              {project.gallery.length > 1 && (
                <>
                  <button
                    onClick={() => prevImage(index)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => nextImage(index)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                  >
                    →
                  </button>
                </>
              )}
            </div>

            {/* Contenu du projet */}
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
              <p className="text-neutral-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 rounded bg-neutral-100 text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

**🎯 Optimisations clés :**

1. **LQIP en background CSS** → Affichage instantané (20 octets)
2. **Préchargement des images adjacentes** → Transition instantanée au clic
3. **Blur placeholder Next.js** → Animation de fondu natif
4. **Fallback** → Gris animé si pas de LQIP

---

## 7. Checklist finale

### ✅ Configuration Sanity

- [ ] `useCdn: true` dans `sanity/lib/client.ts`
- [ ] Variables d'environnement `.env.local` configurées
- [ ] `cdn.sanity.io` dans `next.config.ts`

### ✅ Optimisations images

- [ ] Requêtes GROQ incluent `metadata { lqip, dimensions }`
- [ ] Fonction `urlFor()` créée dans `sanity/lib/image.ts`
- [ ] Fonction `getLqip()` créée
- [ ] `.auto('format')` sur toutes les images
- [ ] `.quality(75)` sur toutes les images
- [ ] `.width()` adapté au contexte (ex: 1920 pour galerie)

### ✅ Préchargement

- [ ] `useEffect` avec préchargement des images adjacentes
- [ ] `new Image().src` pour charger en arrière-plan

### ✅ Affichage LQIP

- [ ] `style={{ backgroundImage: lqip }}` sur le conteneur
- [ ] `placeholder="blur"` sur le composant Next.js Image
- [ ] `blurDataURL={lqip}` sur le composant Image
- [ ] Fallback `bg-neutral-800 animate-pulse` si pas de LQIP

---

## 📊 Résultats attendus

| Métrique | Avant | Après |
|----------|-------|-------|
| Poids images | 2-3 MB | 800 KB - 1.2 MB |
| Temps chargement initial | 3-5s | < 1s |
| Temps image suivante | 2-3s | **Instantané** ⚡ |
| Format | JPEG/PNG | WebP/AVIF |
| Qualité perçue | Identique | Identique |

---

## 🔍 Dépannage

### Les LQIP ne s'affichent pas
**Cause :** Les anciennes images Sanity n'ont pas de métadonnées LQIP.
**Solution :** Ré-uploader les images ou utiliser un script de régénération :
```bash
sanity dataset export
# Puis réimporter
```

### Images floues même après chargement
**Cause :** Le `quality()` est trop bas.
**Solution :** Augmente à `quality(80)` ou `quality(85)`

### CDN ne fonctionne pas
**Vérifier :**
1. `useCdn: true` dans client.ts
2. URLs commencent par `https://cdn.sanity.io/`
3. Pas de `cache: 'no-store'` si possible (utilise `cache: 'force-cache'`)

---

## 💡 Conseils supplémentaires

### Responsive images
```typescript
urlFor(image)
  .width(800)   // Desktop
  .quality(75)
  .auto('format')
  .url()

// Pour mobile, créer une version plus petite :
urlFor(image)
  .width(400)
  .quality(70)
  .auto('format')
  .url()
```

### Images critiques (above the fold)
```tsx
<Image
  src={imageUrl}
  alt="Hero"
  priority  // ✅ Charge en priorité
  fill
/>
```

### Lazy loading (below the fold)
```tsx
<Image
  src={imageUrl}
  alt="Gallery"
  loading="lazy"  // ✅ Charge uniquement au scroll
  fill
/>
```

---

## 🎓 Explication technique

### Pourquoi CDN ?
- **Cache géographique** : Images servies depuis le serveur le plus proche
- **HTTP/2** : Multiplexage, meilleure compression
- **Smart caching** : Les images sont mises en cache intelligemment

### Pourquoi quality(75) ?
- **Qualité 100** → Fichiers énormes, différence invisible à l'œil nu
- **Qualité 75** → Sweet spot : bon ratio qualité/poids
- **Qualité 50** → Artefacts visibles

### Pourquoi auto('format') ?
- **WebP** : 30% plus léger que JPEG à qualité égale
- **AVIF** : 50% plus léger que JPEG (support limité)
- **Fallback JPEG** : Si le navigateur ne supporte ni WebP ni AVIF

### Pourquoi LQIP ?
- **20 octets** vs **2 MB** pour l'image complète
- **Inline base64** : Pas de requête HTTP supplémentaire
- **Perception** : L'utilisateur voit quelque chose instantanément

### Pourquoi précharger ?
- Les images adjacentes se chargent **pendant que l'utilisateur regarde**
- Au clic sur la flèche → **image déjà en cache** → transition instantanée

---

## 📝 Exemple de prompt pour une IA

Copie-colle ce prompt pour qu'une IA configure Sanity :

```
Configure Sanity CMS pour Next.js avec performances maximales :

1. Client Sanity avec useCdn: true
2. Utilitaires urlFor() et getLqip()
3. Requêtes GROQ incluant metadata { lqip, dimensions }
4. Transformations d'images : .auto('format'), .quality(75), .width(1920)
5. Composant avec LQIP en background-image
6. Préchargement des images adjacentes avec useEffect
7. Next.js Image avec placeholder="blur" et blurDataURL

Utilise le guide SANITY_OPTIMIZATION_GUIDE.md comme référence complète.
```

---

## ✅ C'est terminé !

Tu as maintenant un système d'images Sanity ultra-performant. Les images se chargent instantanément, avec des placeholders flous et un préchargement intelligent.

**Performance attendue :** < 1s pour le chargement initial, transitions instantanées au clic.

---

**Créé avec ❤️ pour des performances maximales**
