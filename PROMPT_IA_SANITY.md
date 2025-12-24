# 🤖 Prompt pour IA : Configuration Sanity optimisée

**Copie-colle ce prompt à une IA pour qu'elle configure Sanity avec performances maximales**

---

## Prompt court (pour configuration rapide)

```
Configure Sanity CMS pour Next.js avec optimisations images maximales :

1. CLIENT SANITY (sanity/lib/client.ts) :
   - useCdn: true (CRITIQUE pour performances)
   - apiVersion: '2024-01-01'

2. UTILITAIRES IMAGES (sanity/lib/image.ts) :
   - urlFor(source) : builder.image(source)
   - getLqip(image) : image?.asset?.metadata?.lqip

3. REQUÊTES GROQ (sanity/lib/queries.ts) :
   - Inclure : asset-> { metadata { lqip, dimensions } }
   - Sur tous les champs image/gallery

4. TRANSFORMATIONS (dans getProjects ou équivalent) :
   - urlFor(img).auto('format').quality(75).width(1920).url()
   - Ajouter lqip avec getLqip(img)

5. COMPOSANT CLIENT :
   - backgroundImage: lqip en CSS inline
   - placeholder="blur" + blurDataURL={lqip}
   - useEffect pour précharger images adjacentes avec new Image().src

6. NEXT CONFIG :
   - remotePatterns: cdn.sanity.io

Objectif : < 1s chargement, transitions instantanées, LQIP placeholders flous
```

---

## Prompt détaillé (avec exemples de code)

```
Tu es un expert en optimisation d'images Sanity pour Next.js. Configure une intégration Sanity ultra-performante en suivant ces étapes :

## 1. Client Sanity optimisé

Fichier : sanity/lib/client.ts

import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true, // ✅ CRITIQUE : CDN = 10x plus rapide
})

## 2. Utilitaires d'images

Fichier : sanity/lib/image.ts

import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export function getLqip(image: any): string | undefined {
  return image?.asset?.metadata?.lqip
}

## 3. Requêtes GROQ avec métadonnées

Fichier : sanity/lib/queries.ts

export const projectsQuery = `*[_type == "project" && published == true] | order(order asc) {
  _id,
  title,
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
  projectUrl
}`

## 4. Transformation des données avec optimisations

Fichier : app/[page]/page.tsx (Server Component)

interface ProcessedImage {
  url: string
  lqip?: string
}

async function getProjects() {
  const projects = await client.fetch(projectsQuery)

  return projects.map(project => ({
    _id: project._id,
    title: project.title,
    description: project.description,
    gallery: project.gallery.map(img => ({
      url: urlFor(img)
        .width(1920)
        .fit('max')
        .auto('format')  // WebP/AVIF automatique
        .quality(75)     // Compression optimale
        .url(),
      lqip: getLqip(img)
    })),
    tags: project.tags || [],
  }))
}

## 5. Composant avec LQIP et préchargement

Fichier : app/[page]/ClientComponent.tsx

"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function PortfolioClient({ projects }) {
  const [currentIndices, setCurrentIndices] = useState({})

  // Préchargement des images adjacentes
  useEffect(() => {
    projects.forEach((project, idx) => {
      const current = currentIndices[idx] || 0
      const total = project.gallery.length

      if (total > 1) {
        // Image suivante
        const next = (current + 1) % total
        const nextImg = new window.Image()
        nextImg.src = project.gallery[next].url

        // Image précédente
        const prev = current === 0 ? total - 1 : current - 1
        const prevImg = new window.Image()
        prevImg.src = project.gallery[prev].url
      }
    })
  }, [currentIndices, projects])

  return (
    <div>
      {projects.map((project, idx) => {
        const current = project.gallery[currentIndices[idx] || 0]

        return (
          <div
            key={project._id}
            style={{
              backgroundImage: current.lqip ? `url(${current.lqip})` : undefined,
              backgroundSize: 'cover',
            }}
          >
            <Image
              src={current.url}
              alt={project.title}
              fill
              placeholder={current.lqip ? "blur" : "empty"}
              blurDataURL={current.lqip}
            />
          </div>
        )
      })}
    </div>
  )
}

## 6. Next.js Config

Fichier : next.config.ts

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig

## VÉRIFICATIONS FINALES :

✅ useCdn: true
✅ .auto('format')
✅ .quality(75)
✅ .width() adapté
✅ getLqip() partout
✅ metadata { lqip } dans GROQ
✅ backgroundImage avec LQIP
✅ placeholder="blur"
✅ Préchargement adjacentes
✅ cdn.sanity.io autorisé

RÉSULTAT ATTENDU :
- Poids : -60% (WebP/AVIF)
- Chargement : < 1s
- Navigation : Instantanée
- Perception : Fluide (LQIP)
```

---

## Prompt ultra-court (version minimaliste)

```
Optimise Sanity + Next.js :
1. useCdn: true
2. urlFor(img).auto('format').quality(75).width(1920).url()
3. GROQ : asset-> { metadata { lqip } }
4. getLqip(img) → backgroundImage CSS
5. Précharge adjacentes : new Image().src
6. <Image placeholder="blur" blurDataURL={lqip} />
Résultat : < 1s, transitions instantanées
```

---

## 📋 Checklist pour l'IA

Fournis cette checklist à l'IA pour qu'elle vérifie son travail :

```
Vérifie que tu as bien :
□ useCdn: true dans client.ts
□ urlFor() et getLqip() dans image.ts
□ metadata { lqip, dimensions } dans toutes les requêtes GROQ
□ .auto('format').quality(75) sur toutes les images
□ .width() adapté au contexte
□ ProcessedImage { url, lqip } comme interface
□ style={{ backgroundImage: lqip }} sur conteneur
□ placeholder="blur" + blurDataURL={lqip} sur Image
□ useEffect avec préchargement (new Image().src)
□ cdn.sanity.io dans remotePatterns

Performance visée :
- Chargement initial : < 1s
- Image suivante : Instantané (déjà en cache)
- Format : WebP/AVIF (60-80% plus léger)
```

---

## 🎯 Utilisation

### Option 1 : Prompt court
Pour une configuration rapide sans explications, utilise le **prompt court**.

### Option 2 : Prompt détaillé
Pour que l'IA comprenne le contexte et adapte le code à ton projet, utilise le **prompt détaillé**.

### Option 3 : Prompt ultra-court
Pour rappeler rapidement les optimisations à une IA qui connaît déjà Sanity.

---

## 📚 Ressources

Guide complet : `SANITY_OPTIMIZATION_GUIDE.md`

---

**Copie le prompt qui te convient et colle-le à ChatGPT, Claude, ou toute autre IA !**
