/**
 * Script d'import des données existantes vers Sanity
 *
 * Usage: npx ts-node scripts/import-to-sanity.ts
 *
 * Ce script importe les données hardcodées actuelles (projets, services, FAQ)
 * vers votre projet Sanity.
 *
 * IMPORTANT : Les images doivent être uploadées manuellement dans le Studio Sanity
 * car ce script ne gère pas l'upload d'images locales.
 */

import { config } from 'dotenv'
import { createClient } from '@sanity/client'

// Charger les variables d'environnement depuis .env.local
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Vous devez créer un token dans Sanity
  useCdn: false,
})

// Données existantes - Projets
const projects = [
  {
    title: "Les Suites du Cygne",
    description: "Site élégant pour une entreprise de location d'appartements. Options avancées avec google maps intégré, système de reservation via reservit implémenté au site, et traduction en 3 langues.",
    tags: ["Google Maps", "Reservit", "Traductions"],
    order: 1,
    // Note: Les images devront être uploadées manuellement
    imagesPaths: [
      "/images/cygne1.png",
      "/images/cygne2.png",
      "/images/cygne3.png",
      "/images/cygne4.png",
      "/images/cygne5.png",
      "/images/cygne6.png",
      "/images/cygne7.png",
      "/images/cygne8.png",
      "/images/cygne9.png",
    ],
  },
  {
    title: "Site tout en 1 de cryptonnaies",
    description: "Plateforme de cryptomonnaies qui affiche les prix en temps réel, les graphiques TradingView, permet de faire des backtests avec des stratégies avancées et de connecter ses portefeuilles. Gestion des comptes utilisateurs avec base de données avancée.",
    tags: ["API temps réel", "Connexion portefeuilles", "Backtest avancé"],
    order: 2,
    imagesPaths: [
      "/images/crypto2.png",
      "/images/crypto3.png",
      "/images/crypto4.png",
      "/images/crypto5.png",
      "/images/crypto6.png",
      "/images/crypto7.png",
      "/images/crypto8.png",
      "/images/crypto9.png",
      "/images/crypto10.png",
      "/images/crypto11.png",
      "/images/crypto12.png",
    ],
  },
  {
    title: "Dashboard",
    description: "Site de dashboard optimisé pour les entrepreneurs. Implémentation avancée avec revenus, dépenses, investissements (avec prix temps réel), agendas, projet, et fiscalité. Gestion des utilisateurs avec base de données complexe.",
    tags: ["Graphiques de suivi", "Gestion comptes clients", "API"],
    order: 3,
    imagesPaths: [
      "/images/dashboard.png",
      "/images/dashboard2.png",
      "/images/dashboard3.png",
      "/images/dashboard4.png",
      "/images/dashboard5.png",
      "/images/dashboard6.png",
      "/images/dashboard7.png",
      "/images/dashboard8.png",
      "/images/dashboard9.png",
      "/images/dashboard10.png",
      "/images/dashboard11.png",
      "/images/dashboard12.png",
      "/images/dashboard13.png",
    ],
  },
]

// Données existantes - Services
const services = [
  {
    title: "Site Vitrine",
    subtitle: null,
    price: "990€",
    description: "Idéal pour présenter votre activité et être visible localement.",
    features: [
      "Design personnalisé",
      "1 à 5 pages",
      "Responsive (Mobile & Tablette)",
      "Optimisation SEO de base",
    ],
    isRecommended: false,
    color: "blue",
    order: 1,
  },
  {
    title: "Pack Pro",
    subtitle: null,
    price: "1490€",
    description: "Une solution complète pour les entreprises qui veulent se démarquer.",
    features: [
      "Tout du pack Vitrine",
      "Jusqu'à 10 pages",
      "Base de données avancée",
      "Google Maps & Avis",
      "SEO Avancé",
    ],
    isRecommended: true,
    color: "purple",
    order: 2,
  },
  {
    title: "Personnalisé",
    subtitle: "Jusqu'à 1 500€ d'aide*",
    price: "Devis",
    description: "Vendez vos produits en ligne avec une boutique performante.",
    features: [
      "Catalogue produits illimité",
      "Paiement sécurisé (Stripe/Paypal)",
      "Gestion des stocks",
      "Compte client",
      "Support prioritaire",
    ],
    isRecommended: false,
    color: "orange",
    order: 3,
  },
]

// Données existantes - FAQ
const faqs = [
  {
    question: "Combien de temps faut-il pour créer un site ?",
    answer: "Pour un site vitrine standard, comptez environ 2 à 3 semaines après réception de tous les éléments (textes, images). Les projets e-commerce ou sur-mesure peuvent prendre 4 à 8 semaines.",
    color: "blue",
    order: 1,
  },
  {
    question: "Le site m'appartient-il totalement ?",
    answer: "Absolument. Une fois le paiement effectué, vous êtes propriétaire à 100% de votre site web, du nom de domaine et du code source. Pas de location à vie chez nous.",
    color: "blue",
    order: 2,
  },
  {
    question: "Proposez-vous de la maintenance ?",
    answer: "Oui, nous proposons des forfaits de maintenance optionnels pour gérer les mises à jour, la sécurité et les petites modifications mensuelles.",
    color: "blue",
    order: 3,
  },
  {
    question: "Comment fonctionne l'aide de l'État ?",
    answer: "La Région Île-de-France propose le \"Chèque Numérique\" qui finance jusqu'à 50% de votre site web (plafond 1 500€).\\n\\nConditions : Artisans et commerçants franciliens de moins de 20 salariés.\\n\\nNous vous fournissons un devis éligible et vous accompagnons dans la démarche sur mesdemarches.iledefrance.fr.",
    color: "green",
    order: 4,
  },
  {
    question: "Pourquoi pas WordPress ?",
    answer: "WordPress est souvent lent, lourd et nécessite des mises à jour fréquentes. Nous utilisons Next.js, une technologie moderne qui offre des performances exceptionnelles, une sécurité renforcée et un temps de chargement quasi instantané. Votre site sera rapide, moderne et optimisé pour le référencement.",
    color: "blue",
    order: 5,
  },
]

async function importData() {
  console.log('🚀 Début de l\'import des données vers Sanity...\n')

  try {
    // Import des projets (sans images)
    console.log('📁 Import des projets...')
    for (const project of projects) {
      const doc = {
        _type: 'project',
        title: project.title,
        slug: {
          _type: 'slug',
          current: project.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        },
        description: project.description,
        tags: project.tags,
        order: project.order,
        published: true,
      }

      const result = await client.create(doc)
      console.log(`  ✅ Projet créé: ${project.title} (ID: ${result._id})`)
      console.log(`     ⚠️  Images à uploader manuellement: ${project.imagesPaths.length} images`)
    }

    // Import des services
    console.log('\n💼 Import des services...')
    for (const service of services) {
      const doc = {
        _type: 'service',
        title: service.title,
        subtitle: service.subtitle,
        price: service.price,
        description: service.description,
        features: service.features,
        isRecommended: service.isRecommended,
        color: service.color,
        order: service.order,
        published: true,
      }

      const result = await client.create(doc)
      console.log(`  ✅ Service créé: ${service.title} (ID: ${result._id})`)
    }

    // Import des FAQ
    console.log('\n❓ Import des FAQ...')
    for (const faq of faqs) {
      const doc = {
        _type: 'faq',
        question: faq.question,
        answer: faq.answer,
        color: faq.color,
        order: faq.order,
        published: true,
      }

      const result = await client.create(doc)
      console.log(`  ✅ FAQ créée: ${faq.question.substring(0, 50)}... (ID: ${result._id})`)
    }

    console.log('\n✨ Import terminé avec succès!')
    console.log('\n⚠️  ÉTAPES SUIVANTES:')
    console.log('1. Allez sur http://localhost:3000/studio')
    console.log('2. Uploadez les images pour chaque projet')
    console.log('3. Vérifiez que tout est correct')
    console.log('4. Mettez à jour vos pages Next.js pour utiliser les données Sanity')

  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error)
    process.exit(1)
  }
}

// Vérification des variables d'environnement
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.error('❌ Erreur: Variables d\'environnement manquantes')
  console.error('Assurez-vous que NEXT_PUBLIC_SANITY_PROJECT_ID et NEXT_PUBLIC_SANITY_DATASET sont définis dans .env.local')
  process.exit(1)
}

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ Erreur: SANITY_API_TOKEN manquant')
  console.error('Vous devez créer un token API dans Sanity:')
  console.error('1. Allez sur https://sanity.io/manage')
  console.error('2. Sélectionnez votre projet')
  console.error('3. API > Tokens > Add API token')
  console.error('4. Créez un token avec les permissions "Editor"')
  console.error('5. Ajoutez SANITY_API_TOKEN=votre_token dans .env.local')
  process.exit(1)
}

importData()
